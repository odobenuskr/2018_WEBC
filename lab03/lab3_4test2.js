/*jshint esversion : 6*/
// 변수를 선언합니다.
const memberObj = [
  {
    name: '홍길동',
    weight: 86,
    rrid: '960330-1306548',

  },
  {
    name: '김철수',
    weight: 63,
    rrid: '050810-3306548'
  },
  {
    name: '오영희',
    weight: 48,
    rrid: '030702-4138926'
  },
  {
    name: '윤명숙',
    weight: 43,
    rrid: '030302-2306548'
  },
  {
    name: '이하나',
    weight: 52,
    rrid: '980330-2306548'
  }
];

var compare = function( a, b ){
  var type = typeof a, i, j;
  if( type == "object" ){
    if( a === null ) return a === b;
    else if( Array.isArray(a) ){
      if( !Array.isArray(b) || a.length != b.length ) return false;
      for( i = 0, j = a.length ; i < j ; i++ ){
        if(!compare(a[i], b[i]))return false;
      }
      return true;
    }else{ //일반 오브젝트인 경우

      //우선 b의 키 갯수를 세둔다.
      j = 0;
      for( i in b ){
        if( b.hasOwnProperty(i) ) j++;
      }

      //a의 각 키와 비교하면서 카운트를 제거해간다.
      for( i in a ){
        if( a.hasOwnProperty(i) ){
          if( !compare( a[i], b[i] ) ) return false;
          j--;
        }
      }

      //남은 카운트가 0이라면 같은 객체고 남아있다면 다른 객체임
      return !j;
    }
  }
  return a === b;
};


console.log('--------------------------------------------------------------------');
console.log('(문제1) memberObj데이터를 JSON포맷으로 "member.json"파일에 저장 및 복원');

// JSON.stringify() 메소드로 자바스크립트 객체를 JSON 문자열로 변경합니다.
const memberJson = JSON.stringify(memberObj);
const memberJson2 = JSON.stringify(memberObj, null, 2);
console.log('\n' + typeof(memberJson));
console.log('\n(memberJson)\n' + memberJson);
console.log('\n(memberJson2)\n' + memberJson2);
console.log('--------------------');
// JSON.parse() 메소드로 JSON 문자열을 자바스크립트 객체로 변경합니다.
const memberObj2 = JSON.parse(memberJson)
console.log('\n' + typeof(memberObj2));
console.log('\n(memberObj2)');
console.log(memberObj2);


//(문제1-1) 이곳에서 memberJson2을 "member.json"파일에 저장할 것
const fs = require('fs');
fs.writeFileSync('member.json', memberJson2);

console.log('\n--------------------');
console.log('(file:member.json) 읽어와 memberObj3에 복원하기');


//(문제1-2) 이곳에서 "member.json"파일에서 읽어와 객체배열변수 memberObj3에 복원할 것
const file = fs.readFileSync('member.json');

console.log('\n(memberFile)');
console.log(file.toString());

console.log('\n(memberFile.toString())');
console.log(file.toString());

const memberObj3 = JSON.parse(file.toString());

console.log('\n(memberObj)');
console.log(memberObj);
console.log('\n(memberObj3)');
console.log(memberObj3);

console.log("\nmemberObj와 memberObj3는 " + (compare(memberObj, memberObj3) ? "같습니다." : "틀립니다."));


console.log('\n\n--------------------------------------------------------------------');
console.log('(문제2) <underscore>모듈을 사용하여 정렬하기');

console.log();
console.log('--------------------');
console.log('sort');
const _ = require('underscore');

console.log('- 객체 이름(name)으로 정렬');
const outputA = _.sortBy(memberObj3, (item) => item.name);
console.log(outputA);

//(문제2-1) 객체 이름(name)으로 정렬. 아래코드를 올바로 수정할 것.
console.log('\n- 객체 주민번호(rrid)로 정렬');
const outputB = _.sortBy(memberObj3, (item) => item.rrid);
console.log(outputB);

//(문제2-2) 새로운 객체를 memberObj3에 추가. _.object()를 사용하여 구현할 것.

const addObject = _.object(['name','weight','rrid'],['성공함',67,'950810-3306548']);
memberObj3.push(addObject);


console.log('\n(memberObj3)');
console.log(memberObj3);


console.log('\n\n--------------------------------------------------------------------');
console.log('(문제3) map(???).filter(???).reduce(???) 연속호출(chaining) 사용하기');

var total = 0;
memberObj3.forEach((item, index) => { total += item.weight; });
var average = total / memberObj3.length;
console.log('총(평균) 체중 = ' + total + '(' + average + ')'); // forEach 예제

var total2 = memberObj3.reduce(function (previous, current) {
    return previous + current.weight;}, 0); // reduce 예제
var average = total2 / memberObj3.length;
console.log('총(평균) 체중 = ' + total2 + '(' + average + ')');

var cnt = memberObj3.filter(function (item) {
    return item.weight >= 60; }).length; // filter 예제
console.log('60kg 이상 사람 = ' + cnt + '명');


//(문제3-1) outputA안의 각 객체에 대하여 주민번호 성별구분규칙을 이용하여 '성별' 생성
const mappedMemberObj = memberObj3.map(function (item) {

if (item.rrid[7] == 2 || item.rrid[7] == 4 ) {
  item.성별 = '여자';
}else{
  item.성별 = '남자';
}
// 이 위치에 구현
return item; });

console.log('\n(mappedMemberObj)');
console.log(mappedMemberObj);

// (문제3-2) outputA.map(???).filter(???).reduce(???) 안의 ???에 들어가는 문장 완성하라.
var cnt2 = memberObj3.map(
  function(item){
    item['성별'] = ((parseInt(item.rrid.charAt(7))%2) == 1)? "남자" : "여자";
    return item;
  }).filter(
    function(item){
      return item.성별 == "여자";
    }).reduce(
      function(previous, current){
        return previous +1;
      }, 0);

console.log('\n여성 = ' + cnt2 + '명');

console.log('\n\n--------------------------------------------------------------------');
console.log('(문제4) Member() 생성자함수에 prototype.성별() 메소드 정의 및 사용하기');

function Member(name, weight, rrid) {
  this.name = name;
  this.weight = weight;
  this.rrid = rrid;
}

//(문제4-1) Member.prototype.성별() 메소드 정의
console.log('\nMember.prototype.성별() 메소드 정의');
Member.prototype.성별 = function(item) {
  if (item.rrid[7] == 2 || item.rrid[7] == 4 ) {
    item.성별 = '여자';
  }else{
    item.성별 = '남자';
  }
};

//(문제4-2) Member()생성자함수와 성별()을 사용하여 mappedMemberObj로부터 memberObj4객체생성
console.log('\nMember()생성자함수와 성별()을 사용하여 mappedMemberObj로부터 memberObj4객체생성');
var memberObj4 = [];
mappedMemberObj.forEach((item, index) => { memberObj4.push(new Member(item.name, item.weight, item.rrid)); });
console.log('\n(memberObj4)');
console.log(memberObj4);
memberObj4.forEach((item, index) => { Member.prototype.성별(item); });
console.log('\n(memberObj4)');
console.log(memberObj4);

console.log("\nmemberObj4와 mappedMemberObj는 " + (compare(memberObj4, mappedMemberObj) ? "같습니다." : "틀립니다."));
