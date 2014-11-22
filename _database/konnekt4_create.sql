-- Created by Vertabelo (http://vertabelo.com)
-- Script type: create
-- Scope: [tables, references]
-- Generated at Sat Nov 22 20:05:46 UTC 2014




-- tables
-- Table: chat
CREATE TABLE chat (
    id int    NOT NULL  AUTO_INCREMENT,
    message varchar(256)    NOT NULL ,
    time int    NOT NULL ,
    user_id int    NOT NULL ,
    CONSTRAINT chat_pk PRIMARY KEY (id)
);

-- Table: end_type
CREATE TABLE end_type (
    id int    NOT NULL  AUTO_INCREMENT,
    type varchar(64)    NOT NULL ,
    CONSTRAINT end_type_pk PRIMARY KEY (id)
);

-- Table: game
CREATE TABLE game (
    id int    NOT NULL  AUTO_INCREMENT,
    whose_turn int    NOT NULL ,
    board varchar(512)    NOT NULL ,
    last_move varchar(128)    NOT NULL ,
    last_update int    NOT NULL ,
    active int    NOT NULL ,
    end_type_id int    NOT NULL ,
    CONSTRAINT game_pk PRIMARY KEY (id)
);

-- Table: game_user
CREATE TABLE game_user (
    id int    NOT NULL  AUTO_INCREMENT,
    game_id int    NOT NULL ,
    user_id int    NOT NULL ,
    stat_type_id int    NOT NULL ,
    CONSTRAINT game_user_pk PRIMARY KEY (id)
);

-- Table: stat
CREATE TABLE stat (
    id int    NOT NULL  AUTO_INCREMENT,
    user_id int    NOT NULL ,
    wins int    NOT NULL ,
    losses int    NOT NULL ,
    ties int    NOT NULL ,
    CONSTRAINT stat_pk PRIMARY KEY (id)
);

-- Table: stat_type
CREATE TABLE stat_type (
    id int    NOT NULL  AUTO_INCREMENT,
    type varchar(16)    NOT NULL ,
    CONSTRAINT stat_type_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE user (
    id int    NOT NULL  AUTO_INCREMENT,
    username varchar(64)    NOT NULL ,
    email varchar(64)    NOT NULL ,
    password varchar(64)    NOT NULL ,
    logged_in int    NOT NULL ,
    CONSTRAINT user_pk PRIMARY KEY (id)
);





-- foreign keys
-- Reference:  chat_users (table: chat)


ALTER TABLE chat ADD CONSTRAINT chat_users FOREIGN KEY chat_users (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  games_end_type (table: game)


ALTER TABLE game ADD CONSTRAINT games_end_type FOREIGN KEY games_end_type (end_type_id)
    REFERENCES end_type (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  games_users_games (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT games_users_games FOREIGN KEY games_users_games (game_id)
    REFERENCES game (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  games_users_stat_type (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT games_users_stat_type FOREIGN KEY games_users_stat_type (stat_type_id)
    REFERENCES stat_type (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  games_users_users (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT games_users_users FOREIGN KEY games_users_users (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  stats_users (table: stat)


ALTER TABLE stat ADD CONSTRAINT stats_users FOREIGN KEY stats_users (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;



-- End of file.

