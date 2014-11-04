SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `chat_Id` int(11) NOT NULL auto_increment,
  `user_Id` int(11) NOT NULL,
  `message` varchar(500) character set utf8 collate utf8_bin NOT NULL,
  `time` int(10) NOT NULL,
  `game_Id` int(11) NOT NULL,
  PRIMARY KEY  (`chat_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
CREATE TABLE IF NOT EXISTS `game` (
  `game_Id` int(11) NOT NULL auto_increment,
  `whoseTurn` int(1) NOT NULL,
  `player0_Id` int(11) NOT NULL,
  `player0_pieceId` int(4) NOT NULL,
  `player0_boardR` int(4) NOT NULL,
  `player0_boardC` int(4) NOT NULL,
  `player1_Id` int(11) NOT NULL,
  `player1_pieceId` int(4) NOT NULL,
  `player1_boardR` int(4) NOT NULL,
  `player1_boardC` int(4) NOT NULL,
  `last_updated` int(10) NOT NULL,
  PRIMARY KEY  (`game_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=2 ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `user_Id` int(255) NOT NULL auto_increment,
  `username` varchar(50) character set utf8 collate utf8_bin NOT NULL,
  `password` varchar(50) character set utf8 collate utf8_bin NOT NULL,
  `logged_In` tinyint(1) NOT NULL,
  PRIMARY KEY  (`user_Id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=7 ;
