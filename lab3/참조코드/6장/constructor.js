// 생성자 함수
function Product(name, price) {
    this.name = name;
    this.price = price;
}
// 객체를 생성합니다.
let product = new Product("바나나", 1200);
// 출력합니다.
console.log(product);