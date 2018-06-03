/*jshint esversion: 6 */
// (lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)
console.log("\n==============================================================================\n(lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)\n==============================================================================\n");

var x = 0;
var m = "x(=1,2,3,...,10)의 제곱값을 1초 단위로 출력합니다.";
var m2 = "타이머를 정지합니다.";
var m3 = "x(=1,2,3,...,10)의 세제곱값을 1초 단위로 출력합니다.";

function math(msg, msg2, callback, callback2){
  let t = setInterval(function(){
    callback(msg);
  }, 1000);

  setTimeout(function(){
    callback2(t);
  }, 11000);
}

function start(msg){
  if(x==0){console.log("");console.log("-----");console.log(msg);}
  x += 1;
  console.log(x * x);
}

let start2 = function(msg){
  if(x==0){console.log("");console.log("-----");console.log(msg);}
  x+=1;
  console.log(x * x * x);
};

function clear(t){
  clearInterval(t);
  console.log(m2);
}

math(m, m2, start, clear);

setTimeout(function(){
  x=0;
  math(m3, m2, start2, clear);
},11000);
