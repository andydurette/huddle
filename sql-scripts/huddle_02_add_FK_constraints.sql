use uwuc9h6qbkrchuc9;

alter table team 
add foreign key (sports_id) references sport(id);

alter table team_user
add foreign key (team_id) references team(id),
add foreign key (user_id) references user(id),
add foreign key (user_type_id) references user_type(id);

alter table player_position 
add foreign key (sports_id) references sport(id);

alter table team_member
add foreign key (team_id) references team(id),
add foreign key (user_id) references user(id),
add foreign key (player_pos_id) references player_position(player_pos_id);

alter table event
add foreign key (team_id) references team(id),
add foreign key (event_type_id) references event_types(id),
add foreign key (venue_id) references venue(id);

alter table event_user
add foreign key (user_id) references user(id),
add foreign key (event_id) references event(event_id),
add foreign key (confirmation_status_id) references confirmation_status(id);
