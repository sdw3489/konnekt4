-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2015-11-21 20:46:45.42




-- tables
-- Table chat
CREATE TABLE IF NOT EXISTS chat (
    id int  NOT NULL  AUTO_INCREMENT,
    user_id int  NOT NULL,
    message varchar(256)  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT chat_pk PRIMARY KEY (id)
);

-- Table game
CREATE TABLE IF NOT EXISTS game (
    id int  NOT NULL  AUTO_INCREMENT,
    whose_turn int  NOT NULL,
    board varchar(2048)  NULL,
    last_move varchar(128)  NULL,
    active int  NOT NULL  DEFAULT 1,
    end_type varchar(16)  NOT NULL,
    winner_id int  NULL,
    loser_id int  NULL,
    initiator_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT game_pk PRIMARY KEY (id)
);

-- Table game_user
CREATE TABLE IF NOT EXISTS game_user (
    id int  NOT NULL  AUTO_INCREMENT,
    game_id int  NOT NULL,
    user_id int  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT game_user_pk PRIMARY KEY (id)
);

-- Table stat
CREATE TABLE IF NOT EXISTS stat (
    id int  NOT NULL  AUTO_INCREMENT,
    user_id int  NOT NULL,
    wins int  NOT NULL  DEFAULT 0,
    losses int  NOT NULL  DEFAULT 0,
    ties int  NOT NULL  DEFAULT 0,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT stat_pk PRIMARY KEY (id)
);

-- Table user
CREATE TABLE IF NOT EXISTS user (
    id int  NOT NULL  AUTO_INCREMENT,
    username varchar(64)  NOT NULL,
    email varchar(64)  NULL,
    password varchar(64)  NOT NULL,
    first_name varchar(64)  NOT NULL,
    last_name varchar(64)  NOT NULL,
    logged_in int  NOT NULL,
    is_private int  NOT NULL  DEFAULT 0,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT user_pk PRIMARY KEY (id)
);

-- Table user_connection
CREATE TABLE IF NOT EXISTS user_connection (
    id int  NOT NULL  AUTO_INCREMENT,
    user_id int  NOT NULL,
    connection_id int  NOT NULL,
    initiator_id int  NOT NULL,
    status varchar(16)  NOT NULL,
    created_at timestamp  NOT NULL,
    updated_at timestamp  NOT NULL,
    CONSTRAINT user_connection_pk PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS ci_sessions (
    id varchar(40) NOT NULL,
    ip_address varchar(45) NOT NULL,
    timestamp int(10) unsigned DEFAULT 0 NOT NULL,
    data blob NOT NULL,
    KEY ci_sessions_timestamp (timestamp)
);




-- foreign keys
-- Reference:  chat_user (table: chat)


ALTER TABLE chat ADD CONSTRAINT chat_user FOREIGN KEY chat_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_game (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_game FOREIGN KEY game_user_game (game_id)
    REFERENCES game (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_initiator (table: game)


ALTER TABLE game ADD CONSTRAINT game_user_initiator FOREIGN KEY game_user_initiator (initiator_id)
    REFERENCES user (id);
-- Reference:  game_user_loser (table: game)


ALTER TABLE game ADD CONSTRAINT game_user_loser FOREIGN KEY game_user_loser (loser_id)
    REFERENCES user (id);
-- Reference:  game_user_user (table: game_user)


ALTER TABLE game_user ADD CONSTRAINT game_user_user FOREIGN KEY game_user_user (user_id)
    REFERENCES user (id)
    ON DELETE RESTRICT
    ON UPDATE CASCADE;
-- Reference:  game_user_winner (table: game)


ALTER TABLE game ADD CONSTRAINT game_user_winner FOREIGN KEY game_user_winner (winner_id)
    REFERENCES user (id);
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


ALTER TABLE ci_sessions ADD PRIMARY KEY (id);



-- End of file.

