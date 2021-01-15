alter user 'root'@'localhost' IDENTIFIED BY '';









drop database OnlineAcademy;
create database OnlineAcademy;
use OnlineAcademy;

create table account
(
	email varchar(40),
	password varchar(255),
activate int,
    mode int,
	constraint PK_Ac primary key (email)
);

create table teacher
(
	teacher_id int NOT NULL AUTO_INCREMENT,
	fname varchar(40),
	lname varchar(40),
    email varchar(40),
    info varchar(1000),
    link_ava_teacher varchar(500),
    disable int,
	constraint PK_Te primary key (teacher_id)
);

create table student
(
	student_id int NOT NULL AUTO_INCREMENT,
	fname varchar(40),
	lname varchar(40),
    	email varchar(40),
    	link_ava_student varchar(500),
        disable int,
	constraint PK_St primary key (student_id)
);

create table stu_watchlist
(
	student_id int,
	course_id int,
    	constraint PK_St_Wa primary key (student_id, course_id)
);

create table stu_registerlist
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

create table course
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
    disablez int,
	constraint PK_Co primary key (course_id)
);

create table course_detail
(
	course_id int,
    state boolean,
    short_info varchar(500),
    full_info varchar(10000),
    last_modify datetime,
    constraint PK_Co_De primary key (course_id)
);

create table course_chapter
(
	course_id int,
    chap_num int,
    chap_name varchar(200),
    link_vid varchar(500),
	chap_des text,
    preview int,
    constraint PK_Co_Ch primary key (course_id, chap_num)
);

create table course_type
(
	type_id int NOT NULL AUTO_INCREMENT,
    type_name varchar(40),
    constraint PK_Co_Ty primary key (type_id)
);

create table course_spec
(
	spec_id int NOT NULL AUTO_INCREMENT,
    	type_id int,
    	spec_name varchar(40),
	icon varchar(100),
    constraint PK_Co_Sp primary key (spec_id, type_id)
);

-- THÊM KHÓA NGOẠI --
alter table teacher 
	add constraint FK_Te_Ac foreign key (email) references account(email);
alter table student 
	add constraint FK_St_Ac foreign key (email) references account(email);
alter table stu_watchlist 
	add constraint FK_StWa_St foreign key (student_id) references student(student_id),
    add constraint FK_StWa_Co foreign key (course_id) references course(course_id);
alter table stu_registerlist 
	add constraint FK_StRe_St foreign key (student_id) references student(student_id),
    add constraint FK_StRe_CoCh foreign key (course_id, chap_num) references course_chapter(course_id, chap_num);
alter table course 
	add constraint FK_Co_Te foreign key (teacher_id) references teacher(teacher_id),
    add constraint FK_Co_CoSp foreign key (spec, type) references course_spec(spec_id, type_id);
alter table course_detail
	add constraint FK_CoDe_Co foreign key (course_id) references course(course_id);
alter table course_chapter
	add constraint FK_CoCh_Co foreign key (course_id) references course(course_id);
alter table course_spec
	add constraint FK_CoSp_Ty foreign key (type_id) references course_type(type_id);
    
-- THÊM RÀNG BUỘC --
alter table account
	add constraint Ck_Ac_Mode CHECK (mode>=0 and mode<=3);
alter table stu_registerlist
	add constraint Ck_StRe_chapnum CHECK (chap_num >=1),
    add constraint Ck_StRe_rating CHECK (rating>=1 and rating<=5);
alter table course
	add constraint Ck_Co_price CHECK (price>=0),
    add constraint Ck_Co_discount CHECK (discount>=0 and discount<=100),
    add constraint Ck_Co_type CHECK (type>0),
    add constraint Ck_Co_spec CHECK (spec>0),
    add constraint Ck_Co_viewNumber CHECK (view_Number>=0);
alter table course_chapter
	add constraint Ck_CoCh_chapNum CHECK (chap_num>=1);
    
-- THÊM DỮ LIỆU MÃU --

-- account 
insert into account values ('admin@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 0);

insert into account values ('teacher001@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher002@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher003@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher004@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher005@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher006@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher007@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher008@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher009@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);
insert into account values ('teacher010@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 1);

insert into account values ('student001@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student002@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student003@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student004@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student005@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student006@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student007@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student008@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student009@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student010@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student011@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student012@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student013@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student014@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student015@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student016@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student017@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student018@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student019@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);
insert into account values ('student020@gmail.com', '$2a$10$8KwHPiXQbHpgBwZeYdjy1.FgjuhDw8LC7ELsqw9nFVXUcnCwE7L9G', 1, 2);

-- Teacher
insert into teacher values (null,'David Teacher', 'One', 'teacher001@gmail.com', 'David Teacher One is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Two', 'teacher002@gmail.com', 'David Teacher Two is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'Scarlett', 'Johansson', 'teacher003@gmail.com', 'The first and best-known Black Widow is a Russian agent trained as a spy, martial artist, and sniper, and outfitted with an arsenal of high-tech weaponry, including a pair of wrist-mounted energy weapons dubbed her "Widow\'s Bite".', 'https://pbs.twimg.com/profile_images/326138731/scarlettJinred_400x400.png', 0);
insert into teacher values (null,'David Teacher', 'Four', 'teacher004@gmail.com', 'David Teacher Four is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Five', 'teacher005@gmail.com', 'David Teacher Five is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Six', 'teacher006@gmail.com', 'David Teacher Six is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Seven', 'teacher007@gmail.com', 'David Teacher Seven is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Eight', 'teacher008@gmail.com', 'David Teacher Eight is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Nine', 'teacher009@gmail.com', 'David Teacher Nine is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);
insert into teacher values (null,'David Teacher', 'Ten', 'teacher010@gmail.com', 'David Teacher Ten is a member of a subspecies of humans known as mutants, who are born with superhuman abilities. He is an exceptionally powerful telepath, who can read and control the minds of others.', 'https://www.pavilionweb.com/wp-content/uploads/2017/03/man-300x300.png', 0);

-- student
insert into student values (null, 'Student', 'One', 'student001@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Two', 'student002@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Three', 'student003@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Four', 'student004@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Five', 'student005@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Six', 'student006@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Seven', 'student007@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Eight', 'student008@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Nine', 'student009@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Ten', 'student010@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Eleven', 'student011@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Twelve', 'student012@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Thirteen', 'student013@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Fourteen', 'student014@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Fifteen', 'student015@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'SixteenTyph', 'student016@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Seventeen', 'student017@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Eighteen', 'student018@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Nineteen', 'student019@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);
insert into student values (null, 'Student', 'Twenty', 'student020@gmail.com', 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png', 0);

-- course_type
insert into course_type values (null, 'IT & Software');
insert into course_type values (null, 'Design');

-- course spec
insert into course_spec values (null, 1, 'Software Engineering','<i class="fas fa-laptop-code"></i>');
insert into course_spec values (null, 1, 'Operating Systems','<i class="fab fa-windows"></i>');
insert into course_spec values (null, 2, 'Graphic Design','<i class="fas fa-ruler"></i>');
insert into course_spec values (null, 2, 'Interior Design','<i class="fas fa-couch"></i>');

-- course
insert into course values(null, 'Introduction to CSS', 20, 0, 1, 1, '2020-12-01 00:00:00', 25, 'https://www.dammio.com/wp-content/uploads/2019/08/CSS3.png', 1, 0);
insert into course values(null, 'Javascript Zero to Hero', 20, 15, 1, 1, '2020-12-02 00:00:00', 40, 'https://www.educative.io/api/page/5330288608542720/image/download/6288755792019456', 2, 0);
insert into course values(null, 'OS for beginners', 15, 0, 1, 2, '2020-12-03 00:00:00', 73, 'https://www.howtogeek.com/thumbcache/2/200/8b2cb8c7c5fc73604d66fd5f0c38be7a/wp-content/uploads/2018/08/img_5b68e80f77e33.png', 3, 0);
insert into course values(null, 'Learn Linux in 5 days', 17, 15, 1, 2, '2020-12-04 00:00:00', 30, 'https://vivaldi.com/wp-content/uploads/Linux-more-secure-than-Windows.png', 3, 0);
insert into course values(null, 'Ultimate Adobe Photoshop Training', 15, 10, 2, 3, '2020-12-05 00:00:00', 56, 'https://tuihocit.com/wp-content/uploads/2020/07/photoshop-cs6.jpg', 5, 0);
insert into course values(null, 'Graphic Design Masterclass - Learn GREAT Design', 25, 20, 2, 3, '2020-12-06 00:00:00', 40, 'https://d1j8r0kxyu9tj8.cloudfront.net/images/1557567429825mQH8PotXDSI7.jpg', 6, 0);
insert into course values(null, 'How to Use Lighting Design to Transform your Home', 10, 0, 2, 4, '2020-12-07 00:00:00', 13, 'https://www.thespruce.com/thmb/LJ7id3A9UH4mXoZdGjjTmM1iWj8=/1541x1156/smart/filters:no_upscale()/Stocksy_txp3a252ff6ITc200_Medium_2462396-25763eafda2e452dbd1fb83089357aa2.jpg', 7, 0);
insert into course values(null, 'How to design a room', 15, 0, 2, 4, '2020-12-08 00:00:00', 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sHwEM7K246oge4Lz1Y7eGjeMk1j8KHRztw&usqp=CAU', 8, 0);
insert into course values(null, 'Beginners Programming Python', 20, 20, 1, 1, '2021-12-01 00:00:00', 13, 'https://www.thespruce.com/thmb/LJ7id3A9UH4mXoZdGjjTmM1iWj8=/1541x1156/smart/filters:no_upscale()/Stocksy_txp3a252ff6ITc200_Medium_2462396-25763eafda2e452dbd1fb83089357aa2.jpg', 1, 0);
insert into course values(null, '20 Web Projects With Vanilla JavaScript', 15, 0, 1, 1, '2021-07-01 00:00:00', 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9sHwEM7K246oge4Lz1Y7eGjeMk1j8KHRztw&usqp=CAU', 1, 0);

-- course_detail
insert into course_detail values(1, true, 'This is short info of Introduction to CSS', 'This is long info of Introduction to CSS', '2020-12-03 00:00:00');
insert into course_detail values(2, false, 'This is short info of Javascript Zero to Hero', 'This is long info of Javascript Zero to Hero', '2020-12-02 00:00:00');
insert into course_detail values(3, false, 'This is short info of OS for beginners', 'This is long info of OS for beginners', '2020-12-03 00:00:00');
insert into course_detail values(4, false, 'This is short info of Learn Linux in 5 days', 'This is long info of Learn Linux in 5 days', '2020-12-04 00:00:00');
insert into course_detail values(5, false, 'This is short info of Ultimate Adobe Photoshop Training', 'This is long info of Ultimate Adobe Photoshop Training', '2020-12-05 00:00:00');
insert into course_detail values(6, false, 'This is short info of Graphic Design Masterclass - Learn GREAT Design', 'This is long info of Graphic Design Masterclass - Learn GREAT Design', '2020-12-06 00:00:00');
insert into course_detail values(7, false, 'This is short info of How to Use Lighting Design to Transform your Home', 'This is long info of How to Use Lighting Design to Transform your Home', '2020-12-07 00:00:00');
insert into course_detail values(8, false, 'This is short info of How to design a room', 'This is long info of How to design a room', '2020-12-08 00:00:00');
insert into course_detail values(9, false, 'This is short info of Beginners Programming Python', 'This is long info of Beginners Programming Python', '2021-12-01 00:00:00');
insert into course_detail values(10, false, 'This is short info of 20 Web Projects With Vanilla JavaScript', 'This is long info of 20 Web Projects With Vanilla JavaScript', '2021-11-01 00:00:00');

-- course_chapter
insert into course_chapter values(1, 1, 'CSS Tutorial for Beginners - 01 - Introduction to CSS', '/course/1/1.mp4', 'hello temp',0);
insert into course_chapter values(1, 2, 'CSS Tutorial for Beginners - 02 - Changing font type, color, and size', '/course/1/2.mp4', 'hello temp',0);
insert into course_chapter values(1, 3, 'CSS Tutorial for Beginners - 03 - Multiple selectors and writing rule for more than one element', '/course/1/3.mp4', 'hello temp',0);
insert into course_chapter values(1, 4, 'CSS Tutorial for Beginners - 04 - Add a line to header and border property', '/course/1/4.mp4', 'hello temp',0);
insert into course_chapter values(1, 5, 'CSS Tutorial for Beginners - 05 - Inheritance and overriding', '/course/1/5.mp4', 'hello temp',0);
insert into course_chapter values(2, 1, 'JavaScript Tutorials | Statements and comments', '/course/2/1.mp4', 'hello temp',0);
insert into course_chapter values(2, 2, 'JavaScript Tutorials | VS code Theme & Live Server Plugin Setup', '/course/2/2.mp4', 'hello temp',0);
insert into course_chapter values(3, 1, 'Introduction to Operating System', '/course/3/1.mp4', 'hello temp',0);
insert into course_chapter values(3, 2, 'Computer System Operation', '/course/4/2.mp4', 'hello temp',0);
insert into course_chapter values(4, 1, 'Introduction to Linux and Basic Linux Commands for Beginners', '/course/4/1.mp4', 'hello temp',0);
insert into course_chapter values(5, 1, 'The Complete beginners guide to Adobe Photoshop | course overview & breakdown', '/course/5/1.mp4', 'hello temp',0);
insert into course_chapter values(6, 1, 'Graphic Design | Fluid | Adobe Illustrator/Photoshop', '/course/6/1.mp4', 'hello temp',0);
insert into course_chapter values(7, 1, 'Lighting Design 101 Principles, House Design Ideas and Home Decor Tips', '/course/7/1.mp4', 'hello temp',0);
insert into course_chapter values(8, 1, 'Basic concept of a fashion room', '/course/8/1.mp4', 'hello temp',0);

-- stu_watchlist
insert into stu_watchlist values(1, 1);
insert into stu_watchlist values(1, 2);
insert into stu_watchlist values(1, 5);
insert into stu_watchlist values(1, 6);
insert into stu_watchlist values(2, 2);
insert into stu_watchlist values(2, 4);
insert into stu_watchlist values(2, 8);
insert into stu_watchlist values(3, 1);
insert into stu_watchlist values(3, 5);
insert into stu_watchlist values(3, 6);
insert into stu_watchlist values(3, 7);
insert into stu_watchlist values(3, 8);
insert into stu_watchlist values(4, 1);
insert into stu_watchlist values(4, 2);
insert into stu_watchlist values(5, 5);
insert into stu_watchlist values(5, 6);
insert into stu_watchlist values(6, 3);
insert into stu_watchlist values(6, 7);
insert into stu_watchlist values(7, 3);
insert into stu_watchlist values(7, 8);
insert into stu_watchlist values(8, 3);
insert into stu_watchlist values(9, 3);
insert into stu_watchlist values(10, 3);
insert into stu_watchlist values(11, 3);

-- stu_registerlist
insert into stu_registerlist values(1, 1, '2020-12-03 00:00:00', 4, 4,'2020-12-03 00:00:00', 'Nice course, it helps me alot.');
insert into stu_registerlist values(1, 3, '2020-12-03 00:00:00', 2, 3,'2020-12-03 00:00:00', 'Not very helpful, i can search it on Youtube');
insert into stu_registerlist values(2, 4, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Teacher is very attracive');
insert into stu_registerlist values(3, 2, '2020-12-03 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Wonderful, go straight to the point, love it');
insert into stu_registerlist values(3, 4, '2020-12-07 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great course');
insert into stu_registerlist values(4, 2, '2020-12-03 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good');
insert into stu_registerlist values(5, 5, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Wonderful, go straight to the point, love it');
insert into stu_registerlist values(6, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great course');
insert into stu_registerlist values(7, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into stu_registerlist values(8, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great course');
insert into stu_registerlist values(9, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into stu_registerlist values(10, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Great course');
insert into stu_registerlist values(11, 7, '2020-12-09 00:00:00', 1, 3,'2020-12-03 00:00:00', 'The sound is terrible but the course is OK');
insert into stu_registerlist values(12, 7, '2020-12-09 00:00:00', 1, 4,'2020-12-03 00:00:00', 'Good lectures');
insert into stu_registerlist values(13, 6, '2020-12-08 00:00:00', 1, 5,'2020-12-03 00:00:00', 'Excelent one');
insert into stu_registerlist values(14, 7, '2020-12-09 00:00:00', 1, 3, '2020-12-03 00:00:00', 'The course is OK');

ALTER TABLE course ADD FULLTEXT (name);
ALTER TABLE course_chapter ADD FULLTEXT (chap_name);
ALTER TABLE course_detail ADD FULLTEXT (short_info, full_info);
ALTER TABLE course_spec ADD FULLTEXT (spec_name);
ALTER TABLE course_type ADD FULLTEXT (type_name);
ALTER TABLE teacher ADD FULLTEXT (fname, lname);
