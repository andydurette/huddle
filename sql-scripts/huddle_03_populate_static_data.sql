use uwuc9h6qbkrchuc9;

insert into sport(name, yelp_search_term) values 
('Basketball', 'Basketball court'),
('Baseball', 'Baseball field'),
('Hockey', 'Skating rink'),
('Soccer', 'Soccer field');

insert into player_position(sports_id, player_pos_name, player_pos_description) values
(3, 'Goalie', ''),
(3, 'Defense', ''),
(3, 'Forward', ''),
(4, 'Goalie', ''),
(4, 'Defense', ''),
(4, 'Mid-Field', ''),
(4, 'Forward', ''),
(2, 'Pitcher', ''),
(2, 'Catcher', ''),
(2, 'Infielder', ''),
(2, 'Outfielder', ''),
(1, 'Guard', ''),
(1, 'Center', ''),
(1, 'Forward', '');

insert into event_types(name) values
('Game'),
('Practice');

insert into confirmation_status(name) values
('I am going'),
('I am not going'),
('I am going maybe');

insert into user_type(type_name, type_description) values 
('Admin', 'Super-user who is able to create and edit teams'),
('User', 'Just a regular user');



