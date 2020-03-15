use huddle_db;

insert into user(first_name, last_name, email, password) values ('TestUser','Test','test@gmail.com','12345');


select tu.user_type_id
from team_user tu 
where tu.user_id = smth and tu.team_id = smth;


select *
from user
where email = 'test@gmail.com';

update user
set password = '$2a$10$UptkROTUNYVV2NL/0jvYN.Lp2RDT9g0iDUiOLduLcCetccZOtAsuG'
where id = 1; 


insert into user(first_name, last_name, email, password) values ('TestUser','Test','test@gmail.com','$2a$10$UptkROTUNYVV2NL/0jvYN.Lp2RDT9g0iDUiOLduLcCetccZOtAsuG');


insert into team (team_name, team_description, sports_id) values 
(team_name, team_description, sports_id);

insert into team_member (team_id, user_id, player_pos_id) values
();

delete from team_member where team_id = '' and user_id = '';

update team_member set player_pos_id = '' 
where team_id = '' and user_id = '';

insert into event(team_id, event_type_id, event_date, venue_id, event_name, competitor_id, competitior_name)
values ( ,  , '',  , '',  , '');

insert into event_user values ( , , 4, null);

select t.name, t.description, s.name, 
concat(u.first_name, ' ', u.last_name) as 'member', pp.player_pos_name
from team t
join team_member tm on tm.team_id = t.id
join user u on tm.user_id = u.id
join player_position pp on tm.player_pos_id = pp.player_pos_id
join sport s on t.sports_id = s.id
where t.id = '';

insert into venue(api_id, name, lat, lon, address, phone) values 
();

select e.event_id, et.name, v.*, u.id, concat(u.first_name, ' ', u.last_name) as 'member', 
cs.name, eu.comment
from event e
join venue v on v.id = e.venue_id
join event_types et on et.id = e.event_type_id
join event_user eu on eu.event_id = e.event_id 
join confirmation_status cs on cs.id = eu.confirmation_status_id
join user u on u.id = eu.user_id
where e.event_id = '';

select * 
from venue;

