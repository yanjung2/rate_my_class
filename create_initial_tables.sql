create table Class(
	name varchar(50),
	professor varchar(30),
    department varchar(20),
    section int,
    GPA float,
    capacity int,
    primary key(name, professor)
);
/* one question is that if we need to seperate GPA and class
information, since GPA and class informatiion should be seperately
updated*/

create table Users(
	userID varchar(20) primary key,
    password varchar(20) check(length(password) >= 8),
    year int
);
/* both userID or password up to 20 words, could be altered 
when designing logging system*/

create table Rating(
	coursename varchar(50) references Class(name)
    on delete cascade on update cascade,
	professor varchar(30) references Class(professor)
    on delete cascade on update cascade,
	userID varchar(20) references Users(userID)
    on delete cascade on update cascade,
    difficulty float,
    interestingness float,
    usefulness float,
    comment varchar(300),
    primary key(coursename, professor, userID)
);
/* comments up to 300 chars */

create table Register(
	userID varchar(20) references Users(userID)
	on delete cascade on update cascade,
	coursename varchar(50) references Class(name)
	on delete cascade on update cascade,
	professor varchar(30) references Class(professor)
    on delete cascade on update cascade,
	primary key(coursename, professor, userID)
    );