-- //  <lab10>디렉토리 안에서 command창 생성
-- //  (prompt)> mysql -u root -p
-- //  Enter password: (your password)
-- //  mysql> source schedule.sql;

show databases;
CREATE DATABASE  IF NOT EXISTS `myinfo`;
use myinfo;
DROP TABLE IF EXISTS `schedule`;

create table schedule (
id int not null auto_increment primary key,
value varchar(100) not null,
meettime varchar(100) not null,
location varchar(100) not null,
phone varchar(100) not null,
date varchar(15) not null
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

describe schedule;
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (1,'코스모 구로디지털단지', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/02/24');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (2,'건강보험공단 원주', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/02/28');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (3,'넥스트코어 송파', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/03/11');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (4,'예스앤드 역삼동', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/03/20');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (5,'농어촌진흥재단 구로', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/04/15');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (6,'기술정보진흥원 대전', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/4');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (7,'위즈코어 가산디지털단지', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/6');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (8,'LH공사 오리', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/9');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (9,'정보화진흥원 무교', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/12');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (10,'비컴솔루션 강남 도곡로', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/16');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (11,'국립중앙도서관 서초', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/20');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (12,'(주)서브 서초 가든파이브웍스', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/24');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (13,'큐브위즈 서교동', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/05/29');
INSERT INTO `schedule` (`id`,`value`,`meettime`, `location`, `phone`,`date`) VALUES (14,'과학기술위원회 서초', '오후 3시', '성북구 정릉1동', '000-0000-0000', '2018/06/5');
select * from schedule;
