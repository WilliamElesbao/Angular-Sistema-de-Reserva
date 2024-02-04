create database reservation_system;
use reservation_system;

create table sectors (
	sector_id int primary key auto_increment,
    sector_name varchar(30) not null
);

create table stations (
	station_id int primary key auto_increment,
    station_name varchar(30) not null,
    sector_id int,
    foreign key (sector_id) references sectors(sector_id)
);

create table reservations (
	reservation_id int primary key auto_increment,
    user_name varchar(255) not null,
    start_time datetime not null,
    end_time datetime not null,
    sector_id int,
    station_id int,
    frequency enum('none','daily','weekly', 'monthly') not null,
    days_of_week varchar(20),
    comments text,
    foreign key(sector_id) references sectors(sector_id),
    foreign key(station_id) references stations(station_id)
);
