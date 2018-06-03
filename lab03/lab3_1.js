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
console.log('파일 쓰기를 완료했습니다.');

console.log('\n--------------------');
console.log('(file:member.json) 읽어와 memberObj3에 복원하기');


//(문제1-2) 이곳에서 "member.json"파일에서 읽어와 객체배열변수 memberObj3에 복원할 것
const file = fs.readFileSync('member.json');
const memberObj3 = JSON.parse(file.toString());

console.log('\n(memberObj)');
console.log(memberObj);
console.log('\n(memberObj3)');
console.log(memberObj3);

console.log("\nmemberObj와 memberObj3는 " + (compare(memberObj, memberObj3) ? "같습니다." : "틀립니다."));
