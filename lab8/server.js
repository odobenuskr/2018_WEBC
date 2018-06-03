// 모듈을 추출합니다.
const express = require('express');
// 서버를 생성합니다.
const app = express();
app.use(express.static('public'));
// request 이벤트 리스너를 설정합니다.

var htmlrequest = require("request");

var options = { method: 'GET',
  url: 'https://movie.naver.com/movie/running/current.nhn',
  qs: { order: 'reserve' },
  headers:
   { 'postman-token': '4f57b270-cc3f-e481-d12c-2348ead58404',
     'cache-control': 'no-cache' }
};

var htmlr;
var ht;
app.get('/movie', (request, response) => {
  htmlrequest(options, function (error, htmlresponse, htmlbody) {
    if (error) throw new Error(error);
    response.send(htmlbody);
  });
});

app.get('/hong.html', (request, response) => {
    response.redirect('http://naver.com');
});

app.get('/hong2.html', (request, response) => {
    response.send('<h1> Hello Hong</h1>');
});

app.get('*', (request, response) => {
    response.send(404);
});

// 서버를 실행합니다.
app.listen(52273, () => {
    console.log('Server running at http://127.0.0.1:52273');
});
