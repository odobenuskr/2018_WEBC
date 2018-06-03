// 모듈을 추출합니다.
var http = require('http');
var express = require('express');
var _ = require('underscore');
var mysql = require('mysql');

// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    user: 'root',
    password: '2651mysql',
    database: 'myinfo'
});

// 변수를 선언합니다.
var schedules;

// 웹 서버를 생성합니다.
var app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

// 라우트합니다.
app.get('/schedule', function (request, response) {
    // 데이터베이스 요청을 수행합니다.
    client.query('SELECT * FROM schedule', function (error, data) {
        response.send(data);
    });
});

app.all('/schedule/get', function (request, response) {
    // 변수를 선언합니다.
    var output = null;

    client.query('SELECT * FROM schedule', function (error, data) {
      console.log(data);
      data = JSON.parse(JSON.stringify(data));
        schedules = data;
        console.log(schedules);
        console.log(schedules.length);

    // 요청 매개 변수 sidx를 처리합니다.
    var sidx = request.param('sidx');
    console.log(sidx)
    if (sidx == '') { sidx = 'id'; } else { sidx = sidx.replace('grid_', ''); }

    // 요청 매개 변수 sord를 처리합니다.
    var sord = request.param('sord');
    output = _.sortBy(schedules, function (item) {
        return item[sidx];
    });
    if (sord == 'desc') { output = output.reverse(); }

    // 요청 매개 변수 _search를 처리합니다.
    // 안에 있다면 0이상의 값. 없다면 -1. 없을때 찾아내는 문법도 동일하게 작성
    // 이 값이 0이라면 0번 위치에 있다.
    // 마지막 값인 경우는, 문자열의 길이와 동일할 경우이다!!
    // 어떤 오퍼레이션으로 할 것인지를 지정해 주어야 한다!!! 이를 통해서 switch문으로 작동해야 한다
    // switch에 5개 오퍼레이션으로 검색 기능을 만들어야 하는 것이다.

    var _search = request.param('_search');
    if (_search == 'true') {
        var searchField = request.param('searchField');
        var searchString = request.param('searchString');
        var searchOper = request.param('searchOper');

        output = _.filter(output, function (item) {
            if (searchField == 'id') {
              return item.id == Number(searchString);
            }else {
                switch (searchOper) {
                  case 'cn': return item[searchField].indexOf(searchString) != -1;
                    break;
                  case 'bw': return item[searchField].indexOf(searchString) == 0;
                    break;
                  case 'eq': return item[searchField] == searchString;
                    break;
                  case 'ne': return item[searchField].indexOf(searchString) == -1;
                    break;
                  case 'ew': return item[searchField].indexOf(searchString) == item[searchField].length - searchString.length;
                    break;
                  default :
                    break;
                }
            }
        });
    }

    // 요청 매개 변수 page와 rows를 처리합니다.
    var page = Number(request.param('page'));
    var rows = Number(request.param('rows'));
    var totalRecords = schedules.length;
    var totalPages = Math.ceil(totalRecords / rows);
    var start = rows * page - rows;

    // 응답합니다.
    output = output.slice(start, start + rows)
    response.send({
        page: page,
        total: totalPages,
        records: totalRecords,
        rows: _.map(output, function (item) {
            return {
                id: item.id,
                cell: _.toArray(item)
            };
        })
    });
  });
});

app.post('/schedule/edit', function (request, response) {
    // 요청 매개 변수 oper를 처리합니다.
console.log('oper' + request.body.oper);
      switch (request.body.oper) {
        case 'add':
            // 데이터베이스 요청을 수행합니다.
            client.query('INSERT INTO schedule (value, meettime, location, phone, date) VALUES(?,?,?,?,?)', [
                request.body.value, request.body.meettime, request.body.location, request.body.phone, request.body.date
            ], function (error, data) {
//                response.send(data);
            });
            break;
        case 'del':
            var id = Number(request.body.id);
            console.log('del: ' + id);
            client.query('DELETE FROM schedule WHERE id=?', [
                id
            ], function (error, data) {
              console.log(error);
//                response.send(data);
            });
            break;
        case 'edit':
            var id = Number(request.body.id);
            var query = 'UPDATE schedule SET '
            // 쿼리를 생성합니다.
            if (request.body.value) query += "value='" + request.body.value + "', ";
            if (request.body.date) query += "date='" + request.body.date + "', ";
            if (request.body.location) query += "location='" + request.body.location + "', ";
            if (request.body.meettime) query += "meettime='" + request.body.meettime + "', ";
            if (request.body.phone) query += "phone='" + request.body.phone + "' ";
            query += "WHERE id = '" + id + "'";
            console.log(query);
            // 데이터베이스 요청을 수행합니다.
            client.query(query, function (error, data) {
              console.log(error);
//                response.send(data);
            });

            break;
    }

    // 응답합니다.
    response.send();
});

// 웹 서버를 실행합니다.
http.createServer(app).listen(52275, function () {
    console.log('Server Running at http://127.0.0.1:52275');
});
