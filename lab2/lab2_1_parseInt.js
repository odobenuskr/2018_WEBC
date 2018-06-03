/*jshint esversion: 6 */
// (lab2-1) 시간(Date객체, getMonth), 문자열처리 메소드(indexOf, substring), if-else문, 함수
console.log("\n==============================================================================\n(lab2-1) 시간(Date객체), 문자열메소드(indexOf, substring), if-else문, 함수\n==============================================================================\n");
let date = new Date();
var now = date.getMonth() + 1;

var myBirth = "1998년 12월 24일";
var myBirth2 = "1998년 1월 1일";
var myBirth3 = "1998년 7월 10일";
var myBirth4 = "1998년 3월 25일";

greeting(myBirth);
greeting(myBirth2);
greeting(myBirth3);
greeting(myBirth4);

function greeting(myBirth){
    var strArray = myBirth.split(' ');
    var month = parseInt(strArray[1]);

    console.log("---");
    console.log("내 생일은 " + myBirth + " 입니다." );
    console.log("내 생일은 " + month + "월 입니다.");

    var cal_month = now - month;

    if (cal_month == 0) {
      console.log("이번달이 생일이군요. 추카추카!!");
    }
    if(cal_month > 0){
      console.log("올해 생일이 " + cal_month + "개월 지났네요.");
    }
    if (cal_month < 0) {
      console.log((-cal_month) + "개월이 남았군요. 추카추카!!");
  }}
