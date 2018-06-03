
function checkID(id_num) {
  var k;
  if (id_num[0] == '9') {
    k = 2018 - 1900 - 10*id_num[0] - id_num[1];
  }else{
    k = 2018 - 2000 - id_num[1];
  }
  if (id_num[2] == 1 || id_num[3] > 3) {
    k--;
  }

  if (id_num[7] == '1' || id_num[7] == '3') {
    alert("만" + k + "세 남성입니다.");
  }else if (id_num[7] == '2' || id_num[7] == '4') {
    alert("만" + k + "세 여성입니다.");
  }else{
    alert("Error : 잘못 입력했습니다.");
  }
}
