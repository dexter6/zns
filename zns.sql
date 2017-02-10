-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Feb 10, 2017 at 07:35 AM
-- Server version: 5.7.9
-- PHP Version: 5.6.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `zns`
--

-- --------------------------------------------------------

--
-- Table structure for table `albumi`
--

DROP TABLE IF EXISTS `albumi`;
CREATE TABLE IF NOT EXISTS `albumi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  `opis` varchar(100) COLLATE utf8_croatian_ci DEFAULT NULL,
  `thumb` varchar(50) COLLATE utf8_croatian_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `albumi`
--

INSERT INTO `albumi` (`id`, `ime`, `opis`, `thumb`) VALUES
(1, 'prvi', 'opis', '../assets/img/thumb-03.jpg'),
(2, 'drugi', 'kratki opis', '../assets/img/thumb-01.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `clanovi`
--

DROP TABLE IF EXISTS `clanovi`;
CREATE TABLE IF NOT EXISTS `clanovi` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ime` varchar(25) COLLATE utf8_croatian_ci NOT NULL,
  `prezime` varchar(25) COLLATE utf8_croatian_ci NOT NULL,
  `rodjendan` varchar(25) COLLATE utf8_croatian_ci NOT NULL,
  `kategorija` varchar(25) COLLATE utf8_croatian_ci NOT NULL,
  `mjesto` varchar(25) COLLATE utf8_croatian_ci NOT NULL,
  `slika` text COLLATE utf8_croatian_ci,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `clanovi`
--

INSERT INTO `clanovi` (`id`, `ime`, `prezime`, `rodjendan`, `kategorija`, `mjesto`, `slika`) VALUES
(2, 'John', 'Doe', 'nebitno', 'Sudac', 'Kutina', '../assets/img/bruno.jpg'),
(4, 'Netko', 'Regionalni', 'fsdofds', 'Regionalni', 'fsdnk', '../assets/img/bruno.jpg'),
(5, 'Mali', 'pripravnik', 'fdsfsdfsd', 'Pripravnik', 'GFS', NULL),
(6, 'Test', 'zest', 'fdsknfs', 'Sudac', 'fskin', NULL),
(7, 'Ako', 'Stavim', 'datum', 'Sudac', 'Mjesto', '../assets/img/bruno.jpg'),
(8, 'Više', 'Od', 'datum', 'Sudac', 'Mjesto', NULL),
(9, 'Četiri u', 'Jednu', 'datum', 'Sudac', 'mjesto', NULL),
(10, 'Trebalo', 'Bi', 'datum', 'Sudac', 'mjesto', NULL),
(11, 'Biti', 'Lijepo', 'datum', 'Sudac', 'mjesto', NULL),
(15, 'savezni', 'instruktor', 'datum', 'Instruktor', 'mjrdto', '../assets/img/bruno.jpg'),
(16, 'netko', 'savezni', 'sad', 'Savezni', 'sad', '../assets/img/bruno.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `slike`
--

DROP TABLE IF EXISTS `slike`;
CREATE TABLE IF NOT EXISTS `slike` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lokacija` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  `album` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `album` (`album`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `slike`
--

INSERT INTO `slike` (`id`, `lokacija`, `album`) VALUES
(1, '../assets/img/01.jpg', 1),
(2, '../assets/img/02.jpg', 2),
(3, '../assets/img/03.jpg', 1),
(4, '../assets/img/03.jpg', 1),
(5, '../assets/img/04.jpg', 1),
(6, '../assets/img/05.jpg', 2),
(7, '../assets/img/06.jpg', 2);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_croatian_ci NOT NULL,
  `pass` varchar(65) COLLATE utf8_croatian_ci NOT NULL,
  `level` varchar(10) COLLATE utf8_croatian_ci NOT NULL,
  `mail` varchar(50) COLLATE utf8_croatian_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `pass`, `level`, `mail`) VALUES
(1, 'Denis', '123', 'admin', 'neki');

-- --------------------------------------------------------

--
-- Table structure for table `vijesti`
--

DROP TABLE IF EXISTS `vijesti`;
CREATE TABLE IF NOT EXISTS `vijesti` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `autor` text COLLATE utf8_croatian_ci NOT NULL,
  `naslov` text COLLATE utf8_croatian_ci NOT NULL,
  `tekst` text COLLATE utf8_croatian_ci NOT NULL,
  `slika` text COLLATE utf8_croatian_ci,
  `timestamp` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_croatian_ci;

--
-- Dumping data for table `vijesti`
--

INSERT INTO `vijesti` (`id`, `autor`, `naslov`, `tekst`, `slika`, `timestamp`) VALUES
(1, 'admin', 'Naslov', '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."\n\n', '../../../assets/img/01.jpg', '2017-02-08 19:54:37');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
