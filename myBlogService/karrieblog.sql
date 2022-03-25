-- MySQL dump 10.13  Distrib 8.0.27, for Win64 (x86_64)
--
-- Host: localhost    Database: karrieblog
-- ------------------------------------------------------
-- Server version	5.7.36-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `avatar`
--

DROP TABLE IF EXISTS `avatar`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avatar` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(255) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `avatar_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avatar`
--

LOCK TABLES `avatar` WRITE;
/*!40000 ALTER TABLE `avatar` DISABLE KEYS */;
INSERT INTO `avatar` VALUES (1,'0887321313a27662912967cd7de13961','image/jpeg',55362,4,'2020-12-02 12:54:44','2020-12-02 12:54:44'),(2,'2b377c896f7c950618cb886ecfbed8f4','image/jpeg',55362,4,'2020-12-02 13:19:45','2020-12-02 13:19:45'),(3,'462ec58a2d7a292ef646ee70afc269e3','image/jpeg',55362,4,'2020-12-02 13:20:00','2020-12-02 13:20:00'),(4,'3d87a23015ae87e6074dbf43de050434','image/jpeg',55362,4,'2020-12-02 13:24:28','2022-03-23 00:55:34');
/*!40000 ALTER TABLE `avatar` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(1000) NOT NULL,
  `moment_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `comment_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `moment_id` (`moment_id`),
  KEY `user_id` (`user_id`),
  KEY `comment_id` (`comment_id`),
  CONSTRAINT `comment_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comment_ibfk_3` FOREIGN KEY (`comment_id`) REFERENCES `comment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (4,'我就认为JavaScript才是最好的而语言',1,1,NULL,'2020-11-30 02:41:21','2020-11-30 02:41:21'),(5,'我就认为JavaScript才是最好的而语言',3,1,NULL,'2020-11-30 09:33:01','2020-11-30 09:33:01'),(6,'前端学习最重要的是HTML+CSS+JavaScript',1,4,NULL,'2020-11-30 12:07:15','2020-11-30 12:07:15'),(7,'Vue、React也是非常重要~',1,4,6,'2020-11-30 12:08:58','2020-11-30 12:08:58'),(9,'3333',1,4,4,'2022-03-23 09:00:53','2022-03-23 09:00:53'),(11,'22222',1,4,6,'2022-03-23 09:08:17','2022-03-23 09:08:17');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `label`
--

DROP TABLE IF EXISTS `label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `label` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(10) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `label`
--

LOCK TABLES `label` WRITE;
/*!40000 ALTER TABLE `label` DISABLE KEYS */;
INSERT INTO `label` VALUES (1,'前端','2020-11-30 13:06:04','2020-11-30 13:06:04'),(2,'文学','2020-11-30 13:13:50','2020-11-30 13:13:50'),(3,'爱情','2020-11-30 13:13:53','2020-11-30 13:13:53'),(4,'青春','2020-11-30 13:14:04','2020-11-30 13:14:04'),(5,'C语言','2020-11-30 13:35:10','2020-11-30 13:35:10'),(6,'编程','2020-11-30 13:43:19','2020-11-30 13:43:19'),(7,'开发语言','2020-11-30 13:43:19','2020-11-30 13:43:19'),(8,'励志','2020-11-30 13:54:33','2020-11-30 13:54:33'),(9,'奋斗','2020-11-30 13:54:33','2020-11-30 13:54:33'),(10,'校园','2022-03-23 07:45:59','2022-03-23 07:45:59');
/*!40000 ALTER TABLE `label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment`
--

DROP TABLE IF EXISTS `moment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `content` varchar(10000) NOT NULL,
  `user_id` int(11) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `moment_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment`
--

LOCK TABLES `moment` WRITE;
/*!40000 ALTER TABLE `moment` DISABLE KEYS */;
INSERT INTO `moment` VALUES (1,'<p><font color=\"#7b5ba1\">我说错了，C语言才是最好的语言~</font></p><p><font color=\"#7b5ba1\"><br/></font><img src=\"http://localhost:8000/moment/images/a6375f39ed69d4f8badf3402d83cc782\" contenteditable=\"false\" style=\"font-size: 14px; max-width: 100%;\"/><br/><b>212</b></p><p><b>12</b></p><p><b>1</b></p><p>212</p>',4,'2020-11-23 14:05:23','2022-03-24 08:18:31','标题22'),(3,'曾几何时，他也好，她也好，都是这家伙的被害者。所以我才憎恶着。这个强求着所谓“大家”的世界。必须建立在牺牲某人之上才能成立的低劣的和平。以温柔和正义粉饰，明明是恶毒之物却登大雅之堂，随着时间的流逝越发凶恶，除欺瞒外别无其二的空虚的概念。过去和世界都是无法改变的。发生过的事情和所谓的“大家”都是无法改变的。但是，并不是说自己只能隶属于他们',1,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(4,'不要告诉我你不需要保护，不要告诉我你不寂寞，知微，我只希望你，在走过黑夜的那个时辰，不要倔强的选择一个人。',3,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(5,'If you shed tears when you miss the sun, you also miss the stars.如果你因失去了太阳而流泪，那么你也将失去群星了。',1,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(6,'在世间万物中我都发现了你，渺小时，你是阳光下一粒种子，伟大时，你隐身在高山海洋里。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(8,'限定目的，能使人生变得简洁。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(9,'翅膀长在你的肩上，太在乎别人对于飞行姿势的批评，所以你飞不起来',4,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(10,'一个人至少拥有一个梦想，有一个理由去坚强。心若没有栖息的地方，到哪里都是在流浪。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(11,'不乱于心，不困于情。不畏将来，不念过往。如此，安好。',3,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(12,'如果你给我的，和你给别人的是一样的，那我就不要了。',3,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(13,'故事的开头总是这样，适逢其会，猝不及防。故事的结局总是这样，花开两朵，天各一方。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(14,'你不愿意种花，你说，我不愿看见它一点点凋落。是的，为了避免结束，你避免了一切开始。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(15,'你如果认识从前的我，也许你会原谅现在的我。',4,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(16,'每一个不曾起舞的日子，都是对生命的辜负。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(17,'向来缘浅，奈何情深。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(18,'心之所向 素履以往 生如逆旅 一苇以航',3,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(19,'生如夏花之绚烂，死如秋叶之静美。',3,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(20,'答案很长，我准备用一生的时间来回答，你准备要听了吗？',4,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(21,'因为爱过，所以慈悲；因为懂得，所以宽容。',4,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(22,'我们听过无数的道理，却仍旧过不好这一生。',1,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(23,'我来不及认真地年轻，待明白过来时，只能选择认真地老去。',2,'2020-11-23 14:21:19','2022-03-23 01:15:19','标题1'),(24,'哈哈哈',4,'2022-03-23 07:30:40','2022-03-23 07:30:40','222'),(25,'<p><b>1212</b><span style=\"font-size: 14px; background-color: rgb(194, 79, 74);\"></span><span style=\"font-size: 14px;\">?</span></p>',4,'2022-03-23 07:39:52','2022-03-23 07:39:52','1111111'),(26,'<p>212122</p>',4,'2022-03-23 07:50:10','2022-03-23 07:50:10','哈哈哈哈哈哈'),(27,'<p>2121</p>',4,'2022-03-23 07:51:18','2022-03-23 07:51:18','111111'),(30,'<p>12121</p>',4,'2022-03-23 07:52:47','2022-03-23 07:52:47','2121'),(31,'<p>2121</p>',4,'2022-03-23 07:53:41','2022-03-23 07:53:41','2121'),(32,'<p>21</p>',4,'2022-03-23 07:55:25','2022-03-23 07:55:25','121'),(34,'<p><font color=\"#f9963b\">我是测试1</font></p><p><font color=\"#f9963b\"><b>打撒啊啊啊</b></font></p><p><font color=\"#f9963b\"><br/></font></p><p><font color=\"#f9963b\" face=\"Courier New\">啦啦啦啦啦啦</font></p>',4,'2022-03-23 07:59:59','2022-03-23 07:59:59','呜呜呜呜呜呜'),(35,'<p><img src=\"http://localhost:8000/moment/images/311567b448d7d28de7d1d0d8046e0abd\" style=\"max-width:100%;\" contenteditable=\"false\" width=\"676\" height=\"645.58\"/><br/><i><font color=\"#1c487f\">我是蛇姐！！！</font></i></p>',4,'2022-03-23 08:22:43','2022-03-23 08:22:43','2222'),(36,'<p>今天分享大家一个python的自动喷人工具。</p><p><br/></p><p>相信大家打lol，cf之类的都会遇到一些话很多而且很臭的队友，在这时我们可以启用我们的程序帮助我们喷他们，无需再自己打字。当然你也可以把里面喷人的话改成夸奖别人的，然后实现别的功能，这个程序主要是为了自动回复。<br/></p><pre><code class=\"Python\">import pyautogui\nimport pyperclip\nimport time\nimport random\n\nimport pyautogui\nimport pyperclip\nimport time\nimport random\n\ntext = [\"祖安大舞台 有妈你就来\",\"天工造物不测，怎么造出你这么个东西\",\n\"扔块肉在屏幕上，狗都比你会连招\",\n\"你脑子进水了吧，还是100°的那种沸水\",\n\"我终于知道你是一个什么怪物了，原来你是臭水沟里老鼠蜕变的呀，难怪浑身臭气熏天呢！\"\n \"别在卖萌嘟嘴剪到手了，都是被人叫做叔叔阿姨的人了\",\"其实我挺佩服你的，能长成这样，你长的比芙蓉姐还恶心，比凤姐还销魂。\"]  #注意我这里只定义了一点喷人的话，你想的话可以自己在这个列表里面加入，到时候程序会自动在这个text列表中选择然后发送。\nprint(\"提示：输入完回车继续--\")\nnum = int(input(\"请输入次数：\\n\")) #定义要骂多少句\ntimes = eval(input(\"请输入间隔时间，默认秒，可输入小数：\\n\")) #定义每一句发送的时间间隔\nprint(\"请在3秒内切回输入框\") #注意在使用时，运行到这句之后马上切回到要骂人的地方，然后点击一下输入框，程序就会自动开始执行。记得要点击一下输入框\nfor i in range(3, 0, -1):\n    print(\"\\r倒计时{}秒！\\n\".format(i), end=\"\")\n    time.sleep(1)\nprint(\'程序开始...\')\nfor i in range(num):\n    msg = random.choice(text)\n    pyperclip.copy(msg)\n    pyautogui.hotkey(\'ctrl\', \'v\')\n    pyautogui.typewrite([\'enter\'], times)\n</code></pre><p><br/><br/></p>',4,'2022-03-24 04:00:27','2022-03-24 04:00:27','python的自动喷人工具or自动无限回复工具'),(37,'<pre><code class=\"JavaScript\">ddddddd</code></pre><p>das a&nbsp;</p><p><br/></p><pre><code class=\"JavaScript\">撒大大说</code></pre>',4,'2022-03-25 01:17:29','2022-03-25 01:17:29','1111111');
/*!40000 ALTER TABLE `moment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `moment_label`
--

DROP TABLE IF EXISTS `moment_label`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `moment_label` (
  `moment_id` int(11) NOT NULL,
  `label_id` int(11) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`moment_id`,`label_id`),
  KEY `label_id` (`label_id`),
  CONSTRAINT `moment_label_ibfk_1` FOREIGN KEY (`moment_id`) REFERENCES `moment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `moment_label_ibfk_2` FOREIGN KEY (`label_id`) REFERENCES `label` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `moment_label`
--

LOCK TABLES `moment_label` WRITE;
/*!40000 ALTER TABLE `moment_label` DISABLE KEYS */;
INSERT INTO `moment_label` VALUES (1,3,'2020-11-30 13:51:59','2020-11-30 13:51:59'),(1,5,'2020-11-30 13:51:27','2020-11-30 13:51:27'),(1,6,'2020-11-30 13:51:27','2020-11-30 13:51:27'),(1,7,'2020-11-30 13:51:27','2020-11-30 13:51:27'),(9,8,'2020-11-30 13:54:33','2020-11-30 13:54:33'),(9,9,'2020-11-30 13:54:33','2020-11-30 13:54:33'),(25,4,'2022-03-23 07:45:59','2022-03-23 07:45:59'),(25,10,'2022-03-23 07:45:59','2022-03-23 07:45:59'),(31,1,'2022-03-23 07:53:41','2022-03-23 07:53:41'),(31,2,'2022-03-23 07:53:41','2022-03-23 07:53:41'),(31,3,'2022-03-23 07:53:41','2022-03-23 07:53:41'),(32,4,'2022-03-23 07:55:25','2022-03-23 07:55:25'),(32,5,'2022-03-23 07:55:25','2022-03-23 07:55:25'),(34,2,'2022-03-23 07:59:59','2022-03-23 07:59:59'),(34,3,'2022-03-23 07:59:59','2022-03-23 07:59:59'),(35,1,'2022-03-23 08:22:43','2022-03-23 08:22:43'),(35,3,'2022-03-23 08:22:43','2022-03-23 08:22:43'),(36,1,'2022-03-24 04:00:27','2022-03-24 04:00:27'),(37,1,'2022-03-25 01:17:29','2022-03-25 01:17:29');
/*!40000 ALTER TABLE `moment_label` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `picture`
--

DROP TABLE IF EXISTS `picture`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `picture` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `filename` varchar(100) NOT NULL,
  `mimetype` varchar(30) DEFAULT NULL,
  `size` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `filename` (`filename`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `file_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `picture`
--

LOCK TABLES `picture` WRITE;
/*!40000 ALTER TABLE `picture` DISABLE KEYS */;
INSERT INTO `picture` VALUES (3,'b710fd1b2f1d054a568e16d4fdf03245','image/png',1004769,4,'2020-12-02 14:21:56','2020-12-02 14:21:56'),(4,'107632322c8ed31f1901d0bfe6aca4f9','image/png',726597,4,'2020-12-02 14:21:56','2020-12-02 14:21:56'),(5,'84c0392c5821a0abcf2143ef48a3ecde','image/jpeg',811743,4,'2022-03-23 00:37:52','2022-03-23 00:37:52'),(6,'0ba70b3273227e26a5378b072f0cb19a','image/jpeg',811743,4,'2022-03-23 00:38:42','2022-03-23 00:38:42'),(7,'d13af3eb5ecc3b9a766a60bf477c5985','image/jpeg',811743,4,'2022-03-23 00:39:33','2022-03-23 00:39:33'),(8,'a28b69b7fb3df3ae37fc2998afc8f577','image/jpeg',811743,4,'2022-03-23 00:41:50','2022-03-23 00:41:50'),(9,'84324fa81d80d74010fce44c5f78e24b','image/jpeg',811743,4,'2022-03-23 00:46:44','2022-03-23 00:46:44'),(10,'415c8f2ead8203ced36ba0b108aa56fd','image/jpeg',823500,4,'2022-03-23 00:46:44','2022-03-23 00:46:44'),(11,'7a79e2a022a27d99d3774d380055c478','image/jpeg',811743,4,'2022-03-23 00:47:08','2022-03-23 00:47:08'),(12,'776fd231e637759121f547fc0d9c5f35','image/jpeg',823500,4,'2022-03-23 00:47:08','2022-03-23 00:47:08'),(13,'ee97ec1a1104ccba1c5190a994b8e67f','image/jpeg',811743,4,'2022-03-23 00:48:24','2022-03-23 00:48:24'),(14,'05ad5cd6f9e50d91728d16f08de95535','image/jpeg',823500,4,'2022-03-23 00:48:28','2022-03-23 00:48:28'),(15,'19e10e45ccf72b1835b3e3a67941ca91','image/jpeg',823500,4,'2022-03-23 00:48:49','2022-03-23 00:48:49'),(16,'ce9e6194cbad3b78c2aa2ef2388b1211','image/jpeg',811743,4,'2022-03-23 00:50:00','2022-03-23 00:50:00'),(17,'dbc36a08fb3b8a6534e9857413f0e67c','image/jpeg',823500,4,'2022-03-23 00:50:00','2022-03-23 00:50:00'),(18,'8ed94df915db29bb0fd3228ef4fa8577','image/jpeg',811743,4,'2022-03-23 00:50:41','2022-03-23 00:50:41'),(19,'b003809b961e8b4895e84369c8ecfa21','image/jpeg',823500,4,'2022-03-23 00:50:41','2022-03-23 00:50:41'),(20,'23767cb2a29c675123c627e775fdfccd','image/jpeg',811743,4,'2022-03-23 00:53:45','2022-03-23 00:53:45'),(21,'e729fd7c7525543df0db9e068f7033f5','image/jpeg',823500,4,'2022-03-23 00:53:45','2022-03-23 00:53:45'),(22,'12db9cff7e1d6fdfa83a3f3bd016f894','image/jpeg',345889,4,'2022-03-23 08:19:27','2022-03-23 08:19:27'),(23,'1851fbaa92ce6d06c9a87172bdc565a3','image/jpeg',345889,4,'2022-03-23 08:20:22','2022-03-23 08:20:22'),(24,'f6ef5bc286a52750228092212b7e7e82','image/jpeg',345889,4,'2022-03-23 08:21:34','2022-03-23 08:21:34'),(25,'311567b448d7d28de7d1d0d8046e0abd','image/jpeg',811743,4,'2022-03-23 08:22:18','2022-03-23 08:22:18'),(26,'a6375f39ed69d4f8badf3402d83cc782','image/jpeg',345889,4,'2022-03-24 02:51:56','2022-03-24 02:51:56');
/*!40000 ALTER TABLE `picture` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `password` varchar(50) NOT NULL,
  `createAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updateAt` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `avatar_url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'coderwhy','4297f44b13955235245b2497399d7a93','2020-11-18 14:13:07','2020-12-01 11:09:38',NULL),(2,'kobe','12121321','2020-11-18 14:46:56','2020-11-18 14:46:56',NULL),(3,'lilei','abc123','2020-11-20 12:03:52','2020-11-20 12:03:52',NULL),(4,'lucy','e10adc3949ba59abbe56e057f20f883e','2020-11-20 12:19:42','2020-12-02 13:24:29','http://localhost:8000/users/4/avatar');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-03-25 10:01:19
