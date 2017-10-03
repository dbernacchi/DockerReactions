# ************************************************************
# Sequel Pro SQL dump
# Version 4541
#
# http://www.sequelpro.com/
# https://github.com/sequelpro/sequelpro
#
# Host: 127.0.0.1 (MySQL 5.7.18)
# Database: pg_docker
# Generation Time: 2017-10-03 02:57:59 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table event
# ------------------------------------------------------------

CREATE TABLE `event` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `url` varchar(250) DEFAULT NULL,
  `name` varchar(25) DEFAULT NULL,
  `live` int(1) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `event` WRITE;
/*!40000 ALTER TABLE `event` DISABLE KEYS */;

INSERT INTO `event` (`id`, `url`, `name`, `live`)
VALUES
	(1,'https://www.facebook.com/4ffrf/videos/10155842254339728/','Ask an Atheist, August 23',1),
	(2,'https://www.facebook.com/4ffrf/videos/10155942482089728/','Ask an Atheist, September',1);

/*!40000 ALTER TABLE `event` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table log
# ------------------------------------------------------------

CREATE TABLE `log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `event_id` int(11) NOT NULL,
  `NONE` int(11) DEFAULT NULL,
  `LIKE` int(11) DEFAULT NULL,
  `LOVE` int(11) DEFAULT NULL,
  `WOW` int(11) DEFAULT NULL,
  `HAHA` int(11) DEFAULT NULL,
  `SAD` int(11) DEFAULT NULL,
  `ANGRY` int(11) DEFAULT NULL,
  `THANKFUL` int(11) DEFAULT NULL,
  `PRIDE` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  KEY `ts` (`ts`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `log` WRITE;
/*!40000 ALTER TABLE `log` DISABLE KEYS */;

INSERT INTO `log` (`id`, `ts`, `event_id`, `NONE`, `LIKE`, `LOVE`, `WOW`, `HAHA`, `SAD`, `ANGRY`, `THANKFUL`, `PRIDE`)
VALUES
	(1,'2017-10-02 17:21:03',1,0,143,24,0,0,0,0,0,0),
	(2,'2017-10-02 17:21:16',2,0,65,5,0,2,0,0,0,0),
	(3,'2017-10-02 21:16:38',1,0,150,25,0,0,0,0,0,0),
	(4,'2017-10-02 17:36:36',2,0,65,5,0,2,0,0,0,0),
	(5,'2017-10-02 18:04:30',2,0,65,5,0,2,0,0,0,0),
	(6,'2017-10-02 21:16:40',1,0,155,26,0,0,0,0,0,0),
	(7,'2017-10-02 18:06:06',2,0,65,5,0,2,0,0,0,0),
	(8,'2017-10-02 21:16:43',1,0,158,27,0,0,0,0,0,0),
	(9,'2017-10-02 21:16:45',1,0,160,28,0,0,0,0,0,0),
	(10,'2017-10-02 18:06:20',2,0,65,5,0,2,0,0,0,0);

/*!40000 ALTER TABLE `log` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
