// 생성자 함수를 생성합니다.
function Constructor() { }
Constructor.property = 273;
Constructor.method = function () { return "this is Constructor.method()"};
// 생성자 함수의 속성과 메소드를 출력합니다.
console.log(Constructor.property);
console.log(Constructor.method);
console.log(Constructor.method());
