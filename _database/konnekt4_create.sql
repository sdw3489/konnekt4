-- Created by Vertabelo (http://vertabelo.com)
-- Script type: drop
-- Scope: [tables, references]
-- Generated at Sat Nov 29 21:56:16 UTC 2014



-- foreign keys
ALTER TABLE chat DROP FOREIGN KEY chat_user;
ALTER TABLE game DROP FOREIGN KEY game_end_type;
ALTER TABLE game_user DROP FOREIGN KEY game_user_challenge_type;
ALTER TABLE game_user DROP FOREIGN KEY game_user_game;
ALTER TABLE game_user DROP FOREIGN KEY game_user_stat_type;
ALTER TABLE game_user DROP FOREIGN KEY game_user_user;
ALTER TABLE stat DROP FOREIGN KEY stat_user;
ALTER TABLE user_connection DROP FOREIGN KEY user_connection_connection;
ALTER TABLE user_connection DROP FOREIGN KEY user_connection_initiator;
ALTER TABLE user_connection DROP FOREIGN KEY user_connection_user;

-- tables
-- Table challenge_type
DROP TABLE IF EXISTS challenge_type;
-- Table chat
DROP TABLE IF EXISTS chat;
-- Table end_type
DROP TABLE IF EXISTS end_type;
-- Table game
DROP TABLE IF EXISTS game;
-- Table game_user
DROP TABLE IF EXISTS game_user;
-- Table stat
DROP TABLE IF EXISTS stat;
-- Table stat_type
DROP TABLE IF EXISTS stat_type;
-- Table user
DROP TABLE IF EXISTS user;
-- Table user_connection
DROP TABLE IF EXISTS user_connection;



-- End of file.

-- Created by Vertabelo (http://vertabelo.com)
-- Script type: create
-- Scope: [tables, references]
-- Generated at Sat Nov 29 21:56:52 UTC 2014




-- tables
-- Table: challenge_type
CREATE TABLE IF NOT EXISTS challenge_type (
    id int    NOT NULL  AUTO_INCREMENT,
    type varchar(16)    NOT NULL ,
    CONSTRAINT challenge_type_pk PRIMARY KEY (id)
);

-- Table: chat
CREATE TABLE IF NOT EXISTS chat (
    id int    NOT NULL  AUTO_INCREMENT,
    message varchar(256)    NOT NULL ,
    time int    NOT NULL ,
    user_id int    NOT NULL ,
    CONSTRAINT chat_pk PRIMARY KEY (id)
);

-- Table: end_type
CREATE TABLE IF NOT EXISTS end_type (
    id int    NOT NULL  AUTO_INCREMENT,
    type varchar(64)    NOT NULL ,
    CONSTRAINT end_type_pk PRIMARY KEY (id)
);

-- Table: game
CREATE TABLE IF NOT EXISTS game (
    id int    NOT NULL  AUTO_INCREMENT,
    whose_turn int    NOT NULL ,
    board varchar(2048)    NULL ,
    last_move varchar(128)    NULL ,
    last_updated int    NOT NULL ,
    active int    NOT NULL ,
    end_type_id int    NULL ,
    CONSTRAINT game_pk PRIMARY KEY (id)
);

-- Table: game_user
CREATE TABLE IF NOT EXISTS game_user (
    id int    NOT NULL  AUTO_INCREMENT,
    game_id int    NOT NULL ,
    user_id int    NOT NULL ,
    challenge_type_id int    NOT NULL ,
    stat_type_id int    NULL ,
    CONSTRAINT game_user_pk PRIMARY KEY (id)
);

-- Table: stat
CREATE TABLE IF NOT EXISTS stat (
    id int    NOT NULL  AUTO_INCREMENT,
    user_id int    NOT NULL ,
    wins int    NOT NULL DEFAULT 0 ,
    losses int    NOT NULL DEFAULT 0 ,
    ties int    NOT NULL DEFAULT 0 ,
    CONSTRAINT stat_pk PRIMARY KEY (id)
);

-- Table: stat_type
CREATE TABLE IF NOT EXISTS stat_type (
    id int    NOT NULL  AUTO_INCREMENT,
    type varchar(16)    NOT NULL ,
    CONSTRAINT stat_type_pk PRIMARY KEY (id)
);

-- Table: user
CREATE TABLE IF NOT EXISTS user (
    id int    NOT NULL  AUTO_INCREMENT,
    username varchar(64)    NOT NULL ,
    email varchar(64)    NULL ,
    password varchar(64)    NOT NULL ,
    first_name varchar(64)    NOT NULL ,
    last_name varchar(64)    NOT NULL ,
    logged_in int    NOT NULL ,
    is_private int    NOT NULL DEFAULT 0 ,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table: user_connection
CREATE TABLE  IF NOT EXISTS user_connection (
    id int    NOT NULL  AUTO_INCREMENT,
    user_id int    NOT NULL ,
    connection_id int    NOT NULL ,
    initiator_id int    NOT NULL ,
    status varchar(16)    NOT NULL ,
    CONSTRAINT user_connection_pk PRIMARY KEY (id)
);





-- foreign keys
-- Reference:  chat_user (table: chat)


ALTER TABLE chat ADD CONSTRAINT chat_user FOREIGN KEY chat_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_end_type (table: game)


ALTER TABLE game ADD CONSTRAINT game_end_type FOREIGN KEY game_end_type (end_type_id)
    REFERENCES end_type (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_challenge_type (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_challenge_type FOREIGN KEY game_user_challenge_type (challenge_type_id)
    REFERENCES challenge_type (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_game (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_game FOREIGN KEY game_user_game (game_id)
    REFERENCES game (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_stat_type (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_stat_type FOREIGN KEY game_user_stat_type (stat_type_id)
    REFERENCES stat_type (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_user (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_user FOREIGN KEY game_user_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  stat_user (table: stat)


ALTER TABLE stat ADD CONSTRAINT stat_user FOREIGN KEY stat_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  user_connection_connection (table: user_connection)


ALTER TABLE user_connection ADD CONSTRAINT user_connection_connection FOREIGN KEY user_connection_connection (connection_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  user_connection_initiator (table: user_connection)


ALTER TABLE user_connection ADD CONSTRAINT user_connection_initiator FOREIGN KEY user_connection_initiator (initiator_id)
    REFERENCES user (id);
-- Reference:  user_connection_user (table: user_connection)


ALTER TABLE user_connection ADD CONSTRAINT user_connection_user FOREIGN KEY user_connection_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;



-- End of file.


-- Default Inserts

INSERT INTO `challenge_type` (`id`, `type`) VALUES
(1, 'challenger'),
(2, 'challenged');

INSERT INTO `stat_type` (`id`, `type`) VALUES
(1, 'win'),
(2, 'loss'),
(3, 'tie');

INSERT INTO `end_type` (`id`, `type`) VALUES
(1, 'tie'),
(2, 'across'),
(3, 'stacked'),
(4, 'diagonal_right'),
(5, 'diagonal_left');