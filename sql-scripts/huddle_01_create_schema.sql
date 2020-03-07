/*drop database if exists huddle_db;

create database huddle_db;*/

use uwuc9h6qbkrchuc9;

create table user (
	id int auto_increment not null,
	first_name varchar(50),
    last_name varchar(50),
    email varchar(50),
    password varchar(255),
    created_date timestamp default NOW(),
    primary key (id)
);

create table team (
  id int auto_increment not null,
  team_name varchar(100),
  team_description varchar(1000),
  sports_id int,
  created_date timestamp default NOW(),
  primary key (id)
);

create table team_user (
  team_id int,
  user_id int,
  user_type_id int
);

create table user_type (
  id int auto_increment not null,
  type_name varchar(25),
  type_description varchar(1000),
  primary key (id)
);

create table sport (
  id int auto_increment not null,
  name varchar(25),
  yelp_search_term varchar(50),
  primary key (id)
);

create table player_position (
  player_pos_id int auto_increment not null, 
  sports_id int,
  player_pos_name varchar(25),
  player_pos_description varchar(1000),
  primary key (player_pos_id)
);

create table team_member (
  team_id int, 
  user_id int,
  player_pos_id int
);

create table event (
  event_id int auto_increment not null,
  team_id int,
  event_type_id int, 
  event_date timestamp,
  venue_id int,
  event_name varchar(100),
  competitor_id int,
  competitior_name varchar(256),
  score_our int default 0,
  score_their int default 0,
  primary key (event_id)
);

create table event_types (
  id int auto_increment not null,
  name varchar(50),
  primary key (id)
);

create table venue (
  id int auto_increment not null,
  api_id int,
  name varchar(255),
  lat float8,
  lon float8,
  address varchar(1000),
  phone varchar(25),
  primary key (id)
);

create table event_user (
  user_id int,
  event_id int,
  confirmation_status_id int,
  comment varchar(1000)
);

create table confirmation_status (
  id int auto_increment not null,
  name varchar(50),
  primary key (id)
);


