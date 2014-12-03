-- phpMyAdmin SQL Dump
-- version 3.5.8.2
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 02, 2014 at 03:58 PM
-- Server version: 5.5.40-36.1-log
-- PHP Version: 5.4.23

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `sethwhi1_konnekt4`
--

--
-- Dumping data for table `game`
--

INSERT INTO `game` (`id`, `whose_turn`, `board`, `last_move`, `last_updated`, `active`, `end_type_id`) VALUES
(1, 1, '[{"pId":0,"c":3,"r":5},{"pId":1,"c":4,"r":5},{"pId":0,"c":2,"r":5},{"pId":1,"c":1,"r":5},{"pId":0,"c":3,"r":4},{"pId":1,"c":3,"r":3},{"pId":0,"c":2,"r":4},{"pId":1,"c":5,"r":5},{"pId":0,"c":4,"r":4},{"pId":1,"c":5,"r":4},{"pId":0,"c":1,"r":4}]', '{"col":1,"row":4}', 1417144588, 0, 2),
(2, 1, '[{"pId":0,"c":3,"r":5},{"pId":1,"c":4,"r":5},{"pId":0,"c":3,"r":4},{"pId":1,"c":4,"r":4},{"pId":0,"c":3,"r":3},{"pId":1,"c":3,"r":2},{"pId":0,"c":4,"r":3},{"pId":1,"c":2,"r":5},{"pId":0,"c":2,"r":4},{"pId":1,"c":1,"r":5},{"pId":0,"c":3,"r":1},{"pId":1,"c":1,"r":4},{"pId":0,"c":1,"r":3},{"pId":1,"c":2,"r":3},{"pId":0,"c":0,"r":5},{"pId":1,"c":0,"r":4},{"pId":0,"c":2,"r":2},{"pId":1,"c":6,"r":5},{"pId":0,"c":0,"r":3},{"pId":1,"c":0,"r":2},{"pId":0,"c":3,"r":0},{"pId":1,"c":6,"r":4},{"pId":0,"c":1,"r":2},{"pId":1,"c":1,"r":1},{"pId":0,"c":2,"r":1}]', '{"col":2,"row":1}', 1417144864, 0, 4);

--
-- Dumping data for table `game_user`
--

INSERT INTO `game_user` (`id`, `game_id`, `user_id`, `challenge_type_id`, `stat_type_id`) VALUES
(1, 1, 2, 1, 1),
(2, 1, 1, 2, 2),
(3, 2, 1, 1, 1),
(4, 2, 2, 2, 2);

--
-- Dumping data for table `stat`
--

INSERT INTO `stat` (`id`, `user_id`, `wins`, `losses`, `ties`) VALUES
(1, 1, 1, 1, 0),
(2, 2, 1, 1, 0);

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `username`, `email`, `password`, `first_name`, `last_name`, `logged_in`) VALUES
(1, 'seth', NULL, '25a3b6cc85a8cde49f8b0f9aa21c050bc04072d4', 'Seth', 'Whitaker', 0),
(2, 'Tyler', NULL, '2d1f7e8af1d11f4287b40fccb42f81b623a6740e', 'Tyler', 'Whitaker', 0);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
