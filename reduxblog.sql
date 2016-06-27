-- Adminer 4.2.5 MySQL dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

DROP TABLE IF EXISTS `connections`;
CREATE TABLE `connections` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `connections` (`id`, `title`, `categories`, `content`, `createdAt`, `updatedAt`) VALUES
(1,	'3Q',	'la quan trung',	'vnv',	'2016-06-16 04:40:37',	'2016-06-16 04:40:37'),
(2,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 04:43:38',	'2016-06-16 04:43:38'),
(3,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 04:47:59',	'2016-06-16 04:47:59'),
(4,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 06:35:38',	'2016-06-16 06:35:38'),
(5,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 06:35:52',	'2016-06-16 06:35:52'),
(6,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 06:38:21',	'2016-06-16 06:38:21'),
(7,	'3Q1',	'la quan trung2',	'vnv1',	'2016-06-16 06:39:38',	'2016-06-16 06:39:38');

DROP TABLE IF EXISTS `posts`;
CREATE TABLE `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `categories` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `posts` (`id`, `title`, `categories`, `content`, `createdAt`, `updatedAt`, `userId`) VALUES
(2,	'tam quoc chi',	'la quan trung',	'quan vu',	'2016-06-21 15:27:17',	'2016-06-21 15:27:17',	2),
(3,	'tay du ki',	'ngo thua an',	'thinh kinh',	'2016-06-23 07:34:41',	'2016-06-23 07:34:41',	2),
(4,	'toi tai gioi',	'adam kho',	'ban cung the',	'2016-06-23 08:25:27',	'2016-06-23 08:25:27',	2),
(6,	'dinh',	'dinh',	'dinh',	'2016-06-23 17:54:59',	'2016-06-23 17:54:59',	1),
(7,	'an sang',	'dinh',	'an banh mi',	'2016-06-24 00:05:39',	'2016-06-24 00:05:39',	2);

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

INSERT INTO `users` (`id`, `username`, `password`, `token`, `createdAt`, `updatedAt`) VALUES
(1,	'dinh',	'123',	'12',	'0000-00-00 00:00:00',	'0000-00-00 00:00:00'),
(2,	'quocdinhcs',	'1234',	'123',	'2016-06-21 10:50:12',	'2016-06-21 10:50:12');

-- 2016-06-27 01:30:51
