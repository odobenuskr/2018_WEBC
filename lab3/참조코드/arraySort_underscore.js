const _ = require('underscore');

// 배열을 선언합니다.
let arrayA = ['고구마', '감자', '바나나'];
let arrayB = [{
    name: '고구마',
    price: 1000
}, {
    name: '감자',
    price: 500
}, {
    name: '바나나',
    price: 400
}];

console.log();
console.log('- 객체 내부의 숫자로 정렬')
const outputA = _.sortBy(arrayB, (item) => item.price);
console.log(outputA);

console.log();
console.log('- 객체 내부의 문자열로 정렬')
const outputB = _.sortBy(arrayB, (item) => item.name);
console.log(outputB);
