alter user 'root'@'localhost' IDENTIFIED BY '1234';

alter user 'minh' IDENTIFIED BY '1234';



drop database OnlineAcademy;
create database OnlineAcademy;
use OnlineAcademy;

create table Account
(
	email varchar(40),
	password varchar(255),
    mode int,
	constraint PK_Ac primary key (email)
);

create table Teacher
(
	teacher_id int NOT NULL AUTO_INCREMENT,
	fname varchar(40),
	lname varchar(40),
    email varchar(40),
    info varchar(1000),
	number_course int,
    link_ava_teacher varchar(500),
	constraint PK_Te primary key (teacher_id)
);

create table Student
(
	student_id int NOT NULL AUTO_INCREMENT,
	fname varchar(40),
	lname varchar(40),
    	email varchar(40),
    	link_ava_student varchar(500),
	constraint PK_St primary key (student_id)
);

create table Stu_watchlist
(
	student_id int,
	course_id int,
    	constraint PK_St_Wa primary key (student_id, course_id)
);

create table Stu_registerlist
(
	student_id int,
	course_id int,
    register_date datetime,
    chap_num int,
    rating int,
comment_date datetime,
    comment varchar(1000),
    constraint PK_St_Re primary key (student_id, course_id)
);

create table Course
(
	course_id int NOT NULL AUTO_INCREMENT,
	name varchar(100),
	price double,
	discount int,
    type int,
    spec int,
    publish_day datetime,
    view_number int,
    link_ava_course varchar(500),
	teacher_id int,
	constraint PK_Co primary key (course_id)
);

create table Course_detail
(
	course_id int,
    state boolean,
    short_info varchar(500),
    full_info varchar(10000),
    last_modify datetime,
    constraint PK_Co_De primary key (course_id)
);

create table Course_chapter
(
	course_id int,
    chap_num int,
    chap_name varchar(200),
    link_vid varchar(500),
    constraint PK_Co_Ch primary key (course_id, chap_num)
);

create table Course_type
(
	type_id int NOT NULL AUTO_INCREMENT,
    type_name varchar(40),
    constraint PK_Co_Ty primary key (type_id)
);

create table Course_spec
(
	spec_id int NOT NULL AUTO_INCREMENT,
    	type_id int,
    	spec_name varchar(40),
	icon varchar(100),
    constraint PK_Co_Sp primary key (spec_id, type_id)
);

-- THÊM KHÓA NGOẠI --
alter table Teacher 
	add constraint FK_Te_Ac foreign key (email) references Account(email);
alter table Student 
	add constraint FK_St_Ac foreign key (email) references Account(email);
alter table Stu_watchlist 
	add constraint FK_StWa_St foreign key (student_id) references Student(student_id),
    add constraint FK_StWa_Co foreign key (course_id) references Course(course_id);
alter table Stu_registerlist 
	add constraint FK_StRe_St foreign key (student_id) references Student(student_id),
    add constraint FK_StRe_CoCh foreign key (course_id, chap_num) references Course_chapter(course_id, chap_num);
alter table Course 
	add constraint FK_Co_Te foreign key (teacher_id) references Teacher(teacher_id),
    add constraint FK_Co_CoSp foreign key (spec, type) references Course_spec(spec_id, type_id);
alter table Course_detail
	add constraint FK_CoDe_Co foreign key (course_id) references Course(course_id);
alter table Course_chapter
	add constraint FK_CoCh_Co foreign key (course_id) references Course(course_id);
alter table Course_spec
	add constraint FK_CoSp_Ty foreign key (type_id) references Course_type(type_id);
    
-- THÊM RÀNG BUỘC --
alter table Account
	add constraint Ck_Ac_Mode CHECK (mode>=0 and mode<=3);
alter table Teacher
	add constraint Ck_Te_numberCourse CHECK (number_course>=0);
alter table Stu_registerlist
	add constraint Ck_StRe_chapnum CHECK (chap_num >=1),
    add constraint Ck_StRe_rating CHECK (rating>=1 and rating<=5);
alter table Course
	add constraint Ck_Co_price CHECK (price>=0),
    add constraint Ck_Co_discount CHECK (discount>=0 and discount<=100),
    add constraint Ck_Co_type CHECK (type>0),
    add constraint Ck_Co_spec CHECK (spec>0),
    add constraint Ck_Co_viewNumber CHECK (view_Number>=0);
alter table Course_chapter
	add constraint Ck_CoCh_chapNum CHECK (chap_num>=1);
    
-- THÊM DỮ LIỆU MÃU --

-- Account 
insert into Account values ('admin@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 0);

insert into Account values ('teacher001@gmail.com', 'teacher001', 1);
insert into Account values ('teacher002@gmail.com', 'teacher002', 1);
insert into Account values ('teacher003@gmail.com', 'teacher003', 1);
insert into Account values ('teacher004@gmail.com', 'teacher004', 1);
insert into Account values ('teacher005@gmail.com', 'teacher005', 1);
insert into Account values ('teacher006@gmail.com', 'teacher006', 1);
insert into Account values ('teacher007@gmail.com', 'teacher007', 1);
insert into Account values ('teacher008@gmail.com', 'teacher008', 1);
insert into Account values ('teacher009@gmail.com', 'teacher009', 1);
insert into Account values ('teacher010@gmail.com', 'teacher010', 1);

insert into Account values ('student001@gmail.com', 'student001', 2);
insert into Account values ('student002@gmail.com', 'student002', 2);
insert into Account values ('student003@gmail.com', 'student003', 2);
insert into Account values ('student004@gmail.com', 'student004', 2);
insert into Account values ('student005@gmail.com', 'student005', 2);
insert into Account values ('student006@gmail.com', 'student006', 2);
insert into Account values ('student007@gmail.com', 'student007', 2);
insert into Account values ('student008@gmail.com', 'student008', 2);
insert into Account values ('student009@gmail.com', 'student009', 2);
insert into Account values ('student010@gmail.com', 'student010', 2);
insert into Account values ('student011@gmail.com', 'student011', 2);
insert into Account values ('student012@gmail.com', 'student012', 2);
insert into Account values ('student013@gmail.com', 'student013', 2);
insert into Account values ('student014@gmail.com', 'student014', 2);
insert into Account values ('student015@gmail.com', 'student015', 2);
insert into Account values ('student016@gmail.com', 'student016', 2);
insert into Account values ('student017@gmail.com', 'student017', 2);
insert into Account values ('student018@gmail.com', 'student018', 2);
insert into Account values ('student019@gmail.com', 'student019', 2);
insert into Account values ('student020@gmail.com', 'student020', 2);

-- Teacher
insert into Teacher values (null,'David Teacher', 'One', 'teacher001@gmail.com', 'David Teacher One is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Two', 'teacher002@gmail.com', 'David Teacher Two is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1,'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'Scarlett', 'Johansson', 'teacher003@gmail.com', 'The first and best-known Black Widow is a Russian agent trained as a spy, martial artist, and sniper, and outfitted with an arsenal of high-tech weaponry, including a pair of wrist-mounted energy weapons dubbed her "Widow\'s Bite".', 2, 'https://pbs.twimg.com/profile_images/326138731/scarlettJinred_400x400.png');
insert into Teacher values (null,'David Teacher', 'Four', 'teacher004@gmail.com', 'David Teacher Four is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 0, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Five', 'teacher005@gmail.com', 'David Teacher Five is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Six', 'teacher006@gmail.com', 'David Teacher Six is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Seven', 'teacher007@gmail.com', 'David Teacher Seven is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Eight', 'teacher008@gmail.com', 'David Teacher Eight is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 1, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Nine', 'teacher009@gmail.com', 'David Teacher Nine is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 0, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');
insert into Teacher values (null,'David Teacher', 'Ten', 'teacher010@gmail.com', 'David Teacher Ten is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 0, 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png');

-- Student
insert into Student values (null, 'Student', 'One', 'student001@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Two', 'student002@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Three', 'student003@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Four', 'student004@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Five', 'student005@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Six', 'student006@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Seven', 'student007@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Eight', 'student008@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Nine', 'student009@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Ten', 'student010@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Eleven', 'student011@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Twelve', 'student012@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Thirteen', 'student013@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Fourteen', 'student014@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Fifteen', 'student015@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'SixteenTyph', 'student016@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Seventeen', 'student017@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Eighteen', 'student018@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Nineteen', 'student019@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');
insert into Student values (null, 'Student', 'Twenty', 'student020@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png');

-- Course_type
insert into Course_type values (null, 'IT & Software');
insert into Course_type values (null, 'Design');

-- Course spec
insert into Course_spec values (null, 1, 'Software Engineering','<i class="fas fa-laptop-code"></i>');
insert into Course_spec values (null, 1, 'Operating Systems','<i class="fab fa-windows"></i>');
insert into Course_spec values (null, 2, 'Graphic Design','<i class="fas fa-ruler"></i>');
insert into Course_spec values (null, 2, 'Interior Design','<i class="fas fa-couch"></i>');

-- Course
insert into Course values(null, 'Introduction to CSS', 20, 0, 1, 1, '2020-12-01 00:00:00', 25, 'https://www.dammio.com/wp-content/uploads/2019/08/CSS3.png', 1);
insert into Course values(null, 'Javascript Zero to Hero', 20, 15, 1, 1, '2020-12-02 00:00:00', 40, 'https://www.educative.io/api/page/5330288608542720/image/download/6288755792019456', 2);
insert into Course values(null, 'OS for beginners', 15, 0, 1, 2, '2020-12-03 00:00:00', 73, 'https://www.howtogeek.com/thumbcache/2/200/8b2cb8c7c5fc73604d66fd5f0c38be7a/wp-content/uploads/2018/08/img_5b68e80f77e33.png', 3);
insert into Course values(null, 'Learn Linux in 5 days', 17, 15, 1, 2, '2020-12-04 00:00:00', 30, 'https://vivaldi.com/wp-content/uploads/Linux-more-secure-than-Windows.png', 3);
insert into Course values(null, 'Ultimate Adobe Photoshop Training', 15, 10, 2, 3, '2020-12-05 00:00:00', 56, 'https://tuihocit.com/wp-content/uploads/2020/07/photoshop-cs6.jpg', 5);
insert into Course values(null, 'Graphic Design Masterclass - Learn GREAT Design', 25, 20, 2, 3, '2020-12-06 00:00:00', 40, 'https://d1j8r0kxyu9tj8.cloudfront.net/images/1557567429825mQH8PotXDSI7.jpg', 6);
insert into Course values(null, 'How to Use Lighting Design to Transform your Home', 10, 0, 2, 4, '2020-12-07 00:00:00', 13, 'https://www.thespruce.com/thmb/LJ7id3A9UH4mXoZdGjjTmM1iWj8=/1541x1156/smart/filters:no_upscale()/Stocksy_txp3a252ff6ITc200_Medium_2462396-25763eafda2e452dbd1fb83089357aa2.jpg', 7);
insert into Course values(null, 'How to design a room', 15, 0, 2, 4, '2020-12-08 00:00:00', 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sHwEM7K246oge4Lz1Y7eGjeMk1j8KHRztw&usqp=CAU', 8);

-- Course_detail
insert into Course_detail values(1, true, 'This is short info of Introduction to CSS', 'This is long info of Introduction to CSS', '2020-12-03 00:00:00');
insert into Course_detail values(2, false, 'This is short info of Javascript Zero to Hero', 'This is long info of Javascript Zero to Hero', '2020-12-02 00:00:00');
insert into Course_detail values(3, false, 'This is short info of OS for beginners', 'This is long info of OS for beginners', '2020-12-03 00:00:00');
insert into Course_detail values(4, false, 'This is short info of Learn Linux in 5 days', 'This is long info of Learn Linux in 5 days', '2020-12-04 00:00:00');
insert into Course_detail values(5, false, 'This is short info of Ultimate Adobe Photoshop Training', 'This is long info of Ultimate Adobe Photoshop Training', '2020-12-05 00:00:00');
insert into Course_detail values(6, false, 'This is short info of Graphic Design Masterclass - Learn GREAT Design', 'This is long info of Graphic Design Masterclass - Learn GREAT Design', '2020-12-06 00:00:00');
insert into Course_detail values(7, false, 'This is short info of How to Use Lighting Design to Transform your Home', 'This is long info of How to Use Lighting Design to Transform your Home', '2020-12-07 00:00:00');
insert into Course_detail values(8, false, 'This is short info of How to design a room', 'This is long info of How to design a room', '2020-12-08 00:00:00');

-- Course_chapter
insert into Course_chapter values(1, 1, 'CSS Tutorial for Beginners - 01 - Introduction to CSS', 'https://www.youtube.com/watch?v=qKoajPPWpmo&list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C&index=1&ab_channel=EJMedia');
insert into Course_chapter values(1, 2, 'CSS Tutorial for Beginners - 02 - Changing font type, color, and size', 'https://www.youtube.com/watch?v=UO0ZPL8yMpU&list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C&index=2&ab_channel=EJMedia');
insert into Course_chapter values(1, 3, 'CSS Tutorial for Beginners - 03 - Multiple selectors and writing rule for more than one element', 'https://www.youtube.com/watch?v=JT0gyzbpD2U&list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C&index=3&ab_channel=EJMedia');
insert into Course_chapter values(1, 4, 'CSS Tutorial for Beginners - 04 - Add a line to header and border property', 'https://www.youtube.com/watch?v=hCoMjvtsyPA&list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C&index=4&ab_channel=EJMedia');
insert into Course_chapter values(1, 5, 'CSS Tutorial for Beginners - 05 - Inheritance and overriding', 'https://www.youtube.com/watch?v=Bj2ZCfDPP2A&list=PLr6-GrHUlVf8JIgLcu3sHigvQjTw_aC9C&index=5&ab_channel=EJMedia');
insert into Course_chapter values(2, 1, 'JavaScript Tutorials | Statements and comments', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(2, 2, 'JavaScript Tutorials | VS code Theme & Live Server Plugin Setup', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(3, 1, 'Introduction to Operating System', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(3, 2, 'Computer System Operation', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(4, 1, 'Introduction to Linux and Basic Linux Commands for Beginners', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(5, 1, 'The Complete beginners guide to Adobe Photoshop | Course overview & breakdown', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(6, 1, 'Graphic Design | Fluid | Adobe Illustrator/Photoshop', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(7, 1, 'Lighting Design 101 Principles, House Design Ideas and Home Decor Tips', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');
insert into Course_chapter values(8, 1, 'Basic concept of a fashion room', 'https://www.youtube.com/watch?v=I4bAebs3Bew&ab_channel=ChampionsLeague2020');

-- Stu_watchlist
insert into Stu_watchlist values(1, 1);
insert into Stu_watchlist values(1, 2);
insert into Stu_watchlist values(1, 5);
insert into Stu_watchlist values(1, 6);
insert into Stu_watchlist values(2, 2);
insert into Stu_watchlist values(2, 4);
insert into Stu_watchlist values(2, 8);
insert into Stu_watchlist values(3, 1);
insert into Stu_watchlist values(3, 5);
insert into Stu_watchlist values(3, 6);
insert into Stu_watchlist values(3, 7);
insert into Stu_watchlist values(3, 8);
insert into Stu_watchlist values(4, 1);
insert into Stu_watchlist values(4, 2);
insert into Stu_watchlist values(5, 5);
insert into Stu_watchlist values(5, 6);
insert into Stu_watchlist values(6, 3);
insert into Stu_watchlist values(6, 7);
insert into Stu_watchlist values(7, 3);
insert into Stu_watchlist values(7, 8);
insert into Stu_watchlist values(8, 3);
insert into Stu_watchlist values(9, 3);
insert into Stu_watchlist values(10, 3);
insert into Stu_watchlist values(11, 3);

-- Stu_registerlist
insert into Stu_registerlist values(1, 1, '2020-12-03 00:00:00', 4, 4,'2020-12-03 00:00:00', 'Nice course, it helps me alot.');
insert into Stu_registerlist values(1, 3, '2020-12-03 00:00:00', 2, 3,'2020-12-03 00:00:00', 'Not very helpful, i can search it on Youtube');
insert into Stu_registerlist values(2, 4, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Teacher is very attracive');
insert into Stu_registerlist values(3, 2, '2020-12-03 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Wonderful, go straight to the point, love it');
insert into Stu_registerlist values(3, 4, '2020-12-07 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great Course');
insert into Stu_registerlist values(4, 2, '2020-12-03 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good');
insert into Stu_registerlist values(5, 5, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Wonderful, go straight to the point, love it');
insert into Stu_registerlist values(6, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great Course');
insert into Stu_registerlist values(7, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into Stu_registerlist values(8, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great Course');
insert into Stu_registerlist values(9, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into Stu_registerlist values(10, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great Course');
insert into Stu_registerlist values(11, 7, '2020-12-09 00:00:00', 1, 3,'2020-12-03 00:00:00', 'The sound is terrible but the course is OK');
insert into Stu_registerlist values(12, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into Stu_registerlist values(13, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Excelent one');
insert into Stu_registerlist values(14, 7, '2020-12-09 00:00:00', 1, 3, '2020-12-03 00:00:00', 'The course is OK');
