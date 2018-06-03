// 객체를 선언합니다.
let object = {
    name: '바나나',
    price: 1200,
    print: function () {
        console.log(`${this.name}의 가격은 ${this.price}원입니다.`)
    }
};
// 메소드를 호출합니다.
object.print();