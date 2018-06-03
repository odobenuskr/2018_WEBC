// 변수를 선언합니다.
let now = new Date();
let before = new Date('December 9, 1991');
// 시간 간격을 구합니다.
let interval = now.getTime() - before.getTime();
interval = Math.floor(interval / (1000 * 60 * 60 * 24));
// 출력합니다.
console.log(`태어나고 ${interval}일 지났습니다.`)