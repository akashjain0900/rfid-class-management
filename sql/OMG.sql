-- CREATING AND USING DATABASE ATTENDANCE
create database Attendance;
use Attendance;
 
-- TABLES
-- 1 => RegNo and CardUID
-- 2 => Student Details
-- 3 => Parents Details
-- 4 => Address
-- 5 => Courses
-- 6 => Subjects
-- 7 => TimeTable
-- 8 => Store_Attendance

-- 1 => RegNo and CardUID
create table Id
(
	RegNo varchar(10),
    CardUID varchar(12), 
    primary key (RegNo),
    unique (CardUID)
);

-- 2 => Student Details
create table Std_Details
(
	RegNo varchar(10),
    Name varchar(20) not null,
    DoB date,
    MobNo varchar(12),
    Course_No int,
    primary key (RegNo),
    foreign key (RegNo) references Id(RegNo)
);

-- 3 => Parents Detail
create table Parents_Details
(
	RegNo varchar(10),
    DadName varchar(20),
    DadMobNo varchar(12),
    MomName varchar(20),
    MomMobNo varchar(12),
    primary key (RegNo),
    foreign key (RegNo) references Std_Details(RegNo)
);

-- 4 => Address
create table Address
(
	RegNo varchar(10) primary key,
	DoorNo varchar(6),
    Address varchar(10),
    Area varchar(20),
    City varchar(20),
    State varchar(20),
    Pin int,
	Country varchar(20) default "INDIA",
    foreign key (RegNo) references Std_Details(RegNo)
);

-- 5 => Courses
create table Courses
(
    Course_No int primary key,
    Course_Name varchar(9)
);

-- 6 => Subjects
create table Subjects
(
    Subject_No int primary key,
    Subject_Name varchar(20),
    Course_No int,
    foreign key (Course_No) references Courses(Course_No)
);

-- 7 => TimeTable
create table TimeTable
(
    Course_No int,
    DayofWeek int,
    Subject_Time time,
    Subject_No int,
    foreign key (Course_No) references Courses(Course_No),
    foreign key (Subject_No) references Subjects(Subject_No)
);

-- 8 => Store Attendance
create table Store_Attendance
(
    Attendance_ID int not null auto_increment,
    CardUID varchar(12) not null,
    Date date,
    Time time,
    primary key (Attendance_ID),
    foreign key (CardUID) references Id(CardUID)
);


-- 1 => RegNo and CardUID Values
insert into Id values("19NCJB713","111456789123");
insert into Id values("19NCJB715","133456789000");
insert into Id values("19NCJB714","123456789000");
insert into Id values("19NCJB716","144567890001");
insert into Id values("19NCJB717","155567890001");

-- 2 => Student Details Values
insert into Std_Details values("19NCJB713", "Akash A Jain", "2000-09-11", 1111567890, 01); 
insert into Std_Details values("19NCJB714", "Shreyas", "2001-09-11", 1122567890, 01); 
insert into Std_Details values("19NCJB715", "JT", "2002-09-11", 1133567890, 01);
insert into Std_Details values("19NCJB716", "Almond", "2002-10-11", 1134567890, 01);

-- 3 => Parents Details Values
insert into Parents_Details values("19NCJB713","DAD1", 1234567890, "MOM1", 1234567890);
insert into Parents_Details values("19NCJB714","DAD2", 1234567890, "MOM2", 1234567890);
insert into Parents_Details values("19NCJB715","DAD3", 1234567890, "MOM3", 1234567890);

-- 5 => Courses Values
insert into Courses values(01 , "BCA");

-- 6 => Subjects Values
insert into Subjects values(01, "Data Structures", 01);
insert into Subjects values(02, "Digital Electronics", 01);
insert into Subjects values(03, "Network Protocols", 01);
insert into Subjects values(04, "Embedded Systems", 01);
insert into Subjects values(05, "Web Development", 01);

-- 7 => Time Table Values
insert into TimeTable values (01, 01, "08:00:00", 03);
insert into TimeTable values (01, 01, "09:00:00", 05);
insert into TimeTable values (01, 01, "10:00:00", 01);
insert into TimeTable values (01, 01, "11:00:00", 02);

-- 8 => Store Attendance
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-20", "08:00:00");
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-20", "09:00:00");
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-20", "10:00:00");
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-20", "11:00:00");
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-27", "11:00:00");
insert into Store_Attendance(CardUID, Date, Time) values("111456789123", "2022-02-28", "11:00:00");




-- DUMP MYSQL CODES
-- Trial 1 NOT WORKING
insert into test(RegNo,Subject) select I.RegNo,S.Subject_Name from Id I, Subjects S where CardUID = 111456789; 

-- Joining to Display Values
select Courses.course_name, TimeTable.* from Courses right join TimeTable on Courses.course_no = TimeTable.course_no where TimeTable.course_no=1;
select Std_Details.RegNo,Std_Details.Name,Parents_Details.MomName,Parents_Details.DadName from Std_Details left join Parents_Details on Std_Details.RegNo = Parents_Details.RegNo;

-- Database Configuration Code
alter user 'root' identified with mysql_native_password by 'Akash.0900';
    
-- DUMP  
insert into Std_Details (RegNo,Name) select RegNo from Id where RegNo="19NCJB717";
update Std_Details set Name="Peanut" where RegNo="19NCJB716";


select Id.RegNo, Std_Details.Name, Subjects.Subject_Name from Id cross join Std_Details on Id.RegNo = Std_Details.RegNo cross join Subjects on Subjects.Course_No = Courses.Course_No where id.CardUID=111456789 and Courses.Course_No=01;

select Id.RegNo REGISTER_NUMBER, Std_Details.Name NAME, Subjects.Subject_Name SUBJECT, count(Store_Attendance.CardUID) ATTENDANCE 
from Id 
cross join Std_Details 
on Id.RegNo = Std_Details.RegNo 
cross join Courses 
on Courses.Course_No = Std_Details.Course_No 
cross join Subjects 
on Subjects.Course_No=Courses.Course_No 
cross join Store_Attendance
on Store_Attendance.CardUID = Id.CardUID
where Id.CardUID=111456789 and Courses.Course_No=01 and Subject_No=01;


select Id.RegNo REG, Std_Details.Name, Subjects.Subject_Name, count(Store_Attendance.CardUID) Attendance
from Id
cross join Std_Details
on Std_Details.RegNo = Id.RegNo
cross join Store_Attendance
on Store_Attendance.CardUID = Id.CardUID
cross join TimeTable
on TimeTable.Subject_Time = Store_Attendance.Time
cross join Subjects
on Subjects.Subject_No = TimeTable.Subject_No
where Id.RegNo="19NCJB713" and dayofweek(Store_Attendance.Date)=01 and TimeTable.Subject_No=02;
