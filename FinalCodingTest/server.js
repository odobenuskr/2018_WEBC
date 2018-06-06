var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var express = require('express');
var app = express();
var cors = require('cors');
var proj4 = require('proj4');
var fs = require('fs');
var rline = require('readline');
var entrc = [];
var end = false;

function ReadEntrc(fn) {
  var stream = fs.createReadStream(fn, "utf8");
  var rd = rline.createInterface({input: stream});
  var ln;

  rd.on('line', function(data) {
    var token = data.split('|');
      ln = {
              name: token[0],
              type: token[1],
              address: token[2],
              gaddr: token[3],
              x: parseFloat(token[4]),
              y: parseFloat(token[5]),
              allname: token[0].concat(token[1].concat(token[2].concat(token[3])))

           };
      entrc.push(ln);
  });

  rd.on('close', function() {
    end = true;
  });

}

ReadEntrc('entrc_seoul_filter_sorted_utf8.txt');

app.use(cors());
app.use(express.static('public'));
// request 이벤트 리스너를 설정합니다.

app.get('/hello', (request, response) => {
    response.send('<h1> Hello World!!!</h1>');
});

app.get('/proj4_client.html', (request, response) => {
    response.addHeader('Access-Control-Allow-Origin', 'http://maps.googleapis.com');
    response.redirect('http://naver.com');
});

app.get('/hong.html', (request, response) => {
    response.redirect('http://naver.com');
});

app.use(bodyParser.json());

app.post('/convertGsrToUtmK', function (req, res) {
    console.log('\n/convertGsrToUtmK');
    //console.log('body: ' + req.body);

    var coordinates = req.body; // 받아온 XY좌표
    // point array 1
    var point1 = [parseFloat(coordinates.x1), parseFloat(coordinates.y1)]

    // point array 2
    var point2 = [parseFloat(coordinates.x2), parseFloat(coordinates.y2)]

    var firstProjection = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"; // from
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"; // to

    // #1. 변환한 위도 경도 값 저장
    var lonAndLat1 = proj4(firstProjection, secondProjection, point1);// from 경위도
    var lonAndLat2 = proj4(firstProjection, secondProjection, point2); // to 경위도

    // #2. 하나의 JSON ARRAY로 데이터 저장
    var retPoints ={
        X1: lonAndLat1[0],
        Y1: lonAndLat1[1],
        X2: lonAndLat2[0],
        Y2: lonAndLat2[1]
    };

    // #3. json stringify → response send
    res.send(JSON.stringify(retPoints));
});

app.post('/entrcToUtmK', function (req, res) {
    console.log('\n/EntrcToUtmK');
    //console.log('body: ' + req.body);

    var name = req.body.name;
    var names = req.body.name.split(' ');

    if(!end) { res.send('DB not ready error'); return; }

    var x, y;
    var i;
    var myname, myaddress, mytype;

    var point, points = [], retPoints = [];

    for(i=0; i<entrc.length; i++){
      var checkPoint = 0;
      //      if(entrc[i].name == name) {
        for (var j = 0; j < names.length; j++) {
          if (entrc[i].allname.indexOf(names[j])>=0) {
            checkPoint++;
          }
        }
        if (checkPoint == names.length) {
          x = entrc[i].x;
          y = entrc[i].y;
          myname = entrc[i].name;
          myaddress = entrc[i].address;
          mytype = entrc[i].type;

          point = { x: x, y: y, name: myname, address: myaddress, type: mytype };
          points.push(point);
        }
    }


//    if(i==entrc.length) { res.send('name not found error'); return; }
    if(points.length == 0) { res.send('name not found error'); return; }

//    var point = [x, y];

    var firstProjection = "+proj=tmerc +lat_0=38 +lon_0=127.5 +k=0.9996 +x_0=1000000 +y_0=2000000 +ellps=GRS80 +units=m +no_defs"; // from
    var secondProjection = "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs"; // to

    for(var i=0; i<points.length; i++) {
      // #1. 변환한 위도 경도 값 저장
      var p = [points[i].x, points[i].y];
      var lonAndLat = proj4(firstProjection, secondProjection, p);// from 경위도

      // #2. 하나의 JSON ARRAY로 데이터 저장
//      var retPoints =[{
//          X: lonAndLat[0],
//          Y: lonAndLat[1]
//        }];
      retPoints.push({ X: lonAndLat[0], Y: lonAndLat[1], NAME: points[i].name, TYPE: points[i].type, ADDRESS: points[i].address});
    }

    // #3. json stringify → response send
    res.send(JSON.stringify(retPoints));
});

console.log('URL address:  http://localhost:3020');
app.listen(process.env.PORT || 3020);
