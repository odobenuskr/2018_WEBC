// // (lab2-1) 시간(Date객체, getMonth), 문자열처리 메소드(indexOf, substring), if-else문, 함수
// console.log("\n==============================================================================\n(lab2-1) 시간(Date객체), 문자열메소드(indexOf, substring), if-else문, 함수\n==============================================================================\n");
// let date = new Date();
// var now = date.getMonth() + 1;
//
// var myBirth = "1998년 12월 24일";
// var myBirth2 = "1998년 1월 1일";
// var myBirth3 = "1998년 7월 10일";
// var myBirth4 = "1998년 3월 25일";
//
// greeting(myBirth);
// greeting(myBirth2);
// greeting(myBirth3);
// greeting(myBirth4);
//
// function greeting(myBirth) {
//
//   var strArray = myBirth.split(' ');
//   var month = strArray[1].substring(0,strArray[1].length-1);
//   console.log("---");
//   console.log("내 생일은 " + myBirth + " 입니다." );
//   console.log("내 생일은 " + month + "월 입니다.");
//
//   var cal_month = now - month;
//
//   if (cal_month == 0) {
//     console.log("이번달이 생일이군요. 추카추카!!");
//   }
//   if(cal_month > 0){
//     console.log("올해 생일이 " + cal_month + "개월 지났네요.");
//   }
//   if (cal_month < 0) {
//     console.log((-cal_month) + "개월이 남았군요. 추카추카!!");
// }
// }

// (lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)
console.log("\n==============================================================================\n(lab2-2) 타이머(setInterval, setTimeout), 함수(익명함수, callback함수)\n==============================================================================\n");

var x = 0;
var m = "x(=1,2,3,...,10)의 제곱값을 1초 단위로 출력합니다.";
var m2 = "타이머를 정지합니다.";
var m3 = "x(=1,2,3,...,10)의 세제곱값을 1초 단위로 출력합니다.";

function math(msg, msg2, callback, callback2) {

while (true) {

}

}

function start(msg) { // 메세지를 받음 / x 가 0 이면, 시작부 출력 / 1 더하고 제곱출력
    if(x==0) {console.log(""); console.log("-----"); console.log(msg);}
    x += 1;
    console.log(x * x); // 1 출력되고 끝인 상태. 다음을 출력하려면 반복 필요.
}

let start3 = function(){
  if(x==0) {console.log(""); console.log("-----"); console.log(msg);}
  x += 1;
  console.log(x * x * x); // 1 출력되고 끝인 상태. 다음을 출력하려면 반복 필요.
};

function start2(msg){
  if(x==0) {console.log(""); console.log("-----"); console.log(msg);}
  x += 1;
  console.log(x * x * x);
}

function clear(t) {
    clearInterval(t);
    console.log(m2);
}

// x(=1,2,3,...,10)의 제곱값을 1초 단위로 출력
math(m, m2, start, clear);

// x(=1,2,3,...,10)의 세제곱값을 1초 단위로 출력
setTimeout(
  function(){

    math(m, m2, start3, clear);

      // (lab2-2) 구현위치
      //   math()를 호출하되 3번인수에 start() 내용을 수정하여
      //   3승을 계산하는 익명함수 형태로 작성, 호출할 것.

  }, 3000);
