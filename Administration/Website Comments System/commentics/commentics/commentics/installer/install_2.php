<?php
/*
Copyright © 2009-2014 Commentics Development Team [commentics.org]
License: GNU General Public License v3.0
		 http://www.commentics.org/license/

This file is part of Commentics.

Commentics is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Commentics is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with Commentics. If not, see <http://www.gnu.org/licenses/>.

Text to help preserve UTF-8 file encoding: 汉语漢語.
*/
?>
<!DOCTYPE html>
<html>
<head>
<title>Installer</title>
<meta name="robots" content="noindex"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
<link rel="stylesheet" type="text/css" href="css/stylesheet.css"/>
</head>
<body>

<img src="../images/commentics/logo.png" class="logo" title="Commentics" alt="Commentics"/>

<br />

<div class="installer_steps">
	<div class="step past">Welcome</div>
	<div class="step past">Database</div>
	<div class="step past">System</div>
	<div class="step past">Menu</div>
	<div class="step past">Action</div>
	<div class="step active">Done</div>
</div>

<div style="clear: left"></div>

<?php
@error_reporting(0); //turn off all error reporting
@ini_set('display_errors', 0); //don't display errors
@ini_set('log_errors', 0); //don't log errors
?>

<?php
define('CMTX_IN_INSTALLER', true);
?>

<?php
//set the path
$cmtx_path = '../';
?>

<?php
require 'version/version.php';
require 'functions/install.php';
require $cmtx_path . 'includes/functions/page.php';
?>

<?php
if (isset($_POST['submit'])) {
	$username = $_POST['admin_username'];
	$password = md5($_POST['admin_password_1']);
	$email_address = $_POST['email_address'];
	$site_name = $_POST['site_name'];
	$time_zone = $_POST['time_zone'];
	$site_domain = $_POST['site_domain'];
	$site_url = $_POST['site_url'];
	$commentics_folder = $_POST['commentics_folder'];
	$commentics_url = $_POST['commentics_url'];
	$admin_folder = $_POST['admin_folder'];
} else {
	echo '<div class="error">';
	echo 'Please restart the Installer.';
	echo '</div>';
	echo '<div style="clear:left;"></div>';
	die();
}
?>

<?php
require '../includes/db/connect.php'; //connect to database
if (!$cmtx_db_ok) { die(); }
?>

<?php
$ip_address = cmtx_get_ip_address();
$security_key = cmtx_get_random_key(20);
$session_key = cmtx_get_random_key(20);
$cookie_key = cmtx_get_random_key(20);
?>

<?php
cmtx_set_time_zone($time_zone); //set the time zone
?>

<?php
$username = cmtx_sanitize($username, true, true);
$email_address = cmtx_sanitize($email_address, true, true);
$site_name = cmtx_sanitize($site_name, true, true);
$time_zone = cmtx_sanitize($time_zone, true, true);
$site_domain = cmtx_sanitize($site_domain, true, true);
$site_url = cmtx_sanitize($site_url, true, true);
$commentics_folder = cmtx_sanitize($commentics_folder, true, true);
$commentics_url = cmtx_sanitize($commentics_url, true, true);
$admin_folder = cmtx_sanitize($admin_folder, true, true);
?>

<?php
$signature = $site_name . '\r\n' . $site_url;
?>

<?php
/********************************************** CREATE TABLE 'access' ********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "access` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `admin_id` int(10) unsigned NOT NULL default '1',
  `username` varchar(250) NOT NULL default '',
  `ip_address` varchar(250) NOT NULL default '',
  `page` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'admins' ********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "admins` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `username` varchar(250) NOT NULL default '',
  `password` varchar(250) NOT NULL default '',
  `email` varchar(250) NOT NULL default '',
  `ip_address` varchar(250) NOT NULL default '',
  `cookie_key` varchar(250) NOT NULL default '',
  `detect_admin` tinyint(1) unsigned NOT NULL default '1',
  `detect_method` varchar(250) NOT NULL default 'both',
  `receive_email_new_ban` tinyint(1) unsigned NOT NULL default '1',
  `receive_email_new_comment_approve` tinyint(1) unsigned NOT NULL default '1',
  `receive_email_new_comment_okay` tinyint(1) unsigned NOT NULL default '1',
  `receive_email_new_flag` tinyint(1) unsigned NOT NULL default '1',
  `login_attempts` tinyint(1) unsigned NOT NULL default '0',
  `resets` tinyint(1) unsigned NOT NULL default '0',
  `last_login` datetime NOT NULL default '0000-00-00 00:00:00',
  `restrict_pages` tinyint(1) unsigned NOT NULL default '0',
  `allowed_pages` text NOT NULL,
  `is_super` tinyint(1) unsigned NOT NULL default '0',
  `is_enabled` tinyint(1) unsigned NOT NULL default '1',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "admins` (`username`, `password`, `email`, `ip_address`, `cookie_key`, `detect_admin`, `detect_method`, `receive_email_new_ban`, `receive_email_new_comment_approve`, `receive_email_new_comment_okay`, `receive_email_new_flag`, `login_attempts`, `resets`, `last_login`, `restrict_pages`, `allowed_pages`, `is_super`, `is_enabled`, `dated`) VALUES ('$username', '$password', '$email_address', '$ip_address', '$cookie_key', '1', 'both', '1', '1', '1', '1', '0', '0', NOW(), '0', '', '1', '1', NOW());");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'attempts' ******************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "attempts` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `ip_address` varchar(250) NOT NULL default '',
  `amount` int(10) unsigned NOT NULL default '0',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'bans' **********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "bans` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `ip_address` varchar(250) NOT NULL default '',
  `reason` varchar(250) NOT NULL default '',
  `unban` tinyint(1) unsigned NOT NULL default '0',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'comments' ******************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "comments` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL default '',
  `email` varchar(250) NOT NULL default '',
  `website` varchar(250) NOT NULL default '',
  `town` varchar(250) NOT NULL default '',
  `country` varchar(250) NOT NULL default '',
  `rating` tinyint(1) unsigned NOT NULL default '0',
  `reply_to` int(10) unsigned NOT NULL default '0',
  `comment` text NOT NULL,
  `reply` text NOT NULL,
  `ip_address` varchar(250) NOT NULL default '',
  `page_id` int(10) unsigned NOT NULL default '0',
  `is_approved` tinyint(1) unsigned NOT NULL default '1',
  `approval_reasoning` text NOT NULL,
  `is_admin` tinyint(1) unsigned NOT NULL default '0',
  `is_sent` tinyint(1) unsigned NOT NULL default '0',
  `sent_to` int(10) unsigned NOT NULL default '0',
  `likes` int(10) unsigned NOT NULL default '0',
  `dislikes` int(10) unsigned NOT NULL default '0',
  `reports` int(10) unsigned NOT NULL default '0',
  `is_sticky` tinyint(1) unsigned NOT NULL default '0',
  `is_locked` tinyint(1) unsigned NOT NULL default '0',
  `is_verified` tinyint(1) unsigned NOT NULL default '0',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'logins' ********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "logins` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "logins` VALUES ('1', NOW());");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "logins` VALUES ('2', NOW());");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'pages' *********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "pages` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `identifier` varchar(250) NOT NULL default '',
  `reference` varchar(250) NOT NULL default '',
  `url` varchar(1000) NOT NULL default '',
  `is_form_enabled` tinyint(1) unsigned NOT NULL default '1',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'questions' *****************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "questions` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `question` varchar(250) NOT NULL default '',
  `answer` varchar(250) NOT NULL default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the third letter of the word castle.', 's');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the word shark backwards.', 'krahs');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the opposite word of weak?', 'strong');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Is it true or false that green is a number?', 'false');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('How many letters are in the word two?', '3|three');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Which is darker: black or white?', 'black');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the last letter of the word satellite.', 'e');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the opposite word of small?', 'big');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Out of 56, 14 or 27, which is the smallest?', '14|fourteen');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the word hand backwards.', 'dnah');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Type the numbers for four hundred seventy-two.', '472');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the fifth word of this sentence.', 'of');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the third word of this sentence.', 'third');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the sum of 1 + 2 + 3?', '6|six');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Enter the word table backwards.', 'elbat');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the day after Friday?', 'saturday');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Is ice cream hot or cold?', 'cold');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the next number: 10, 12, 14, ..?', '16|sixteen');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('What is the fifth month of the year?', 'may');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "questions` (`question`, `answer`) VALUES ('Type the word for the number 9.', 'nine');");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'ratings' ********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "ratings` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `page_id` int(10) unsigned NOT NULL default '0',
  `rating` tinyint(1) unsigned NOT NULL default '0',
  `ip_address` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'reporters' *****************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "reporters` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `comment_id` int(10) unsigned NOT NULL default '0',
  `ip_address` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'settings' ******************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "settings` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `category` varchar(250) NOT NULL default '',
  `title` varchar(250) NOT NULL default '',
  `value` varchar(250) NOT NULL default '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('admin_panel', 'checklist_complete', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('approval', 'approve_comments', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('approval', 'approve_notifications', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('approval', 'trust_users', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('commentics', 'powered_by', 'text');"); //text, image, off
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('commentics', 'powered_by_new_window', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_average_rating', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'comments_order', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_website', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_town', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_country', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_comment_count', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_says', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_rating', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_date', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_like', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_dislike', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_flag', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_permalink', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_reply', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_rss', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_page_number', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'enabled_pagination', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_pagination_top', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_pagination_bottom', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'comments_per_page', '5');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'range_of_pages', '2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'flag_max_per_user', '3');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'flag_min_per_comment', '2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'flag_disapprove', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'rich_snippets', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'rich_snippets_markup', 'Microformats');"); //Microdata, Microformats, RDFa
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'scroll_reply', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'scroll_speed', '2000');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'reply_depth', '5');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'reply_arrow', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_1', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_2', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_3', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_4', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_5', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_sort_by_6', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_gravatar', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'gravatar_default', 'mm');"); //mm = mystery-man
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'gravatar_custom', 'http://');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'gravatar_size', '70');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'gravatar_rating', 'g');"); //g = general-audience
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_topic', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_read_more', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'read_more_limit', '500');"); //characters
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'transport_method', 'php');"); //php-basic, php, smtp, sendmail
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'smtp_host', 'smtp.example.com');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'smtp_port', '25');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'smtp_encrypt', 'off');"); //off, ssl, tls
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'smtp_username', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'smtp_password', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'sendmail_path', '/usr/sbin/sendmail');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_confirmation_subject', 'Subscription Confirmation');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_confirmation_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_confirmation_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_confirmation_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_subject', 'The Admin has Posted');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_basic_subject', 'New Comment');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_basic_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_basic_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_basic_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_subject', 'You Have a Reply');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_subject', 'Comments - Email Test');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_ban_subject', 'Comments - New Ban');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_ban_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_ban_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_ban_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_approve_subject', 'New Comment - Approve');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_approve_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_approve_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_approve_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_okay_subject', 'New Comment - Okay');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_okay_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_okay_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_comment_okay_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_flag_subject', 'Comments - New Flag');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_flag_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_flag_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_new_flag_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_reset_password_subject', 'Comments - Password Reset');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_reset_password_from_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_reset_password_from_email', 'comments@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_reset_password_reply_to', 'no-reply@$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'signature', '$signature');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('error_reporting', 'error_reporting_admin', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('error_reporting', 'error_reporting_frontend', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('error_reporting', 'error_reporting_method', 'log');"); //log, screen
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_form', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'display_javascript_disabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_email', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_website', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_town', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_country', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_rating', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_question', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_captcha', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_notify', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_remember', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_privacy', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_terms', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'required_email', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'required_website', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'required_town', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'required_country', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'required_rating', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'display_required_symbol', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'display_required_symbol_message', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'display_email_note', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_name', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_email', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_website', 'http://');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_town', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_country', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_rating', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_comment', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_notify', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_remember', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_privacy', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'default_terms', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_name', 'normal');"); //normal, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_email', 'normal');"); //normal, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_website', 'normal');"); //normal, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_town', 'normal');"); //normal, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_country', 'normal');"); //normal, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_name', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_email', '100');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_website', '100');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_town', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_question', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_captcha', '4');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_bold', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_italic', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_underline', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_strike', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_superscript', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_subscript', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_code', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_php', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_quote', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_line', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_bullet', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_numeric', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_link', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_email', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_image', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_bb_code_video', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_smile', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_sad', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_huh', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_laugh', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_mad', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_tongue', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_crying', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_grin', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_wink', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_scared', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_cool', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_sleep', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_blush', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_unsure', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_smilies_shocked', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_counter', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'enabled_preview', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'agree_to_preview', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'recaptcha_public_key', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'recaptcha_private_key', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'recaptcha_theme', 'white');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'recaptcha_language', 'en');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'repeat_ratings', 'disable');"); //allow, disable, hide
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'hide_form', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'captcha_type', 'securimage');"); //securimage, recaptcha
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_width', '155');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_height', '50');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_length', '4');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_perturbation', '0.75');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_lines', '5');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_noise', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_text_color', '#707070');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_line_color', '#707070');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_back_color', '#F0F0F0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_noise_color', '#707070');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('language', 'language_frontend', 'english');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('language', 'language_backend', 'english');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('maintenance', 'maintenance_mode', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('maintenance', 'maintenance_message', 'Presently in maintenance.');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('notice', 'notice_manage_comments', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('notice', 'notice_layout_form_questions', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('notice', 'notice_settings_admin_detection', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('notice', 'notice_settings_email_sender', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('order', 'sort_order_parts', '1,2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('order', 'sort_order_fields', '1,2,3,4,5,6');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('order', 'sort_order_captchas', '1,2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('order', 'sort_order_checkboxes', '1,2,3,4');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('order', 'sort_order_buttons', '1,2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'one_name_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'fix_name_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'detect_link_in_name_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'link_in_name_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_names_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_names_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_names_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_names_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_names_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_names_action', 'ban');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_emails_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_emails_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_emails_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_emails_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_emails_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_emails_action', 'ban');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'approve_websites', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'validate_website_ping', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'website_new_window', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'website_nofollow', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_websites_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_websites_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_websites_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_websites_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_websites_as_website_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_websites_as_website_action', 'ban');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_websites_as_comment_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_websites_as_comment_action', 'approve');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_towns_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'reserved_towns_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_towns_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'dummy_towns_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_towns_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'banned_towns_action', 'ban');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'fix_town_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'detect_link_in_town_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'link_in_town_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_minimum_characters', '2');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_minimum_words', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_maximum_characters', '1000');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_maximum_lines', '50');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_maximum_smilies', '5');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_parser_convert_links', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_parser_convert_emails', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_links_new_window', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_links_nofollow', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'comment_line_breaks', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'long_word_length_to_deny', '100');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'swear_word_masking', '*****');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'check_capitals_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'check_capitals_percentage', '50');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'check_capitals_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'mild_swear_words_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'mild_swear_words_action', 'mask');"); //mask, approve, mask_approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'strong_swear_words_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'strong_swear_words_action', 'mask_approve');"); //mask, approve, mask_approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'spam_words_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'spam_words_action', 'approve');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'detect_link_in_comment_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'link_in_comment_action', 'approve');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'approve_images', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'approve_videos', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'check_repeats_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'check_repeats_action', 'reject');"); //approve, reject, ban
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_delay_enabled', '1');"); //delay between next comment
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_delay_time', '60');"); //seconds
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_delay_all_pages', '1');"); //all pages or single page
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_maximum_enabled', '1');"); //maximum comments within period
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_maximum_amount', '5');"); //amount of comments
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_maximum_period', '1');"); //hours
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'flood_control_maximum_all_pages', '1');"); //all pages or single page
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'akismet_enabled', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'akismet_key', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'form_cookie', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('processor', 'form_cookie_days', '365');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_title', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_link', '$site_url');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_image_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_image_url', '$site_url" . "/favicon.ico');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_image_width', '16');"); //pixels
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_image_height', '16');"); //pixels
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_most_recent_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('rss', 'rss_most_recent_amount', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'ban_cookie_days', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'security_key', '$security_key');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'session_key', '$session_key');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'check_referrer', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'check_db_file', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'check_honeypot', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('security', 'check_time', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'social_new_window', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_facebook', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_delicious', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_stumbleupon', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_digg', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_technorati', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_google', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_reddit', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_myspace', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_twitter', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('social', 'show_social_linkedin', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'time_zone', '$time_zone');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_domain', '$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_url', '$site_url');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'commentics_folder', '$commentics_folder');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'commentics_url', '$commentics_url');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'admin_folder', '$admin_folder');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'mysqldump_path', '');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'enabled_wysiwyg', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'display_parsing', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'is_demo', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'limit_comments', '50');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'delay_pages', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'lower_pages', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'admin_cookie_days', '365');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_bans', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_bans', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_comments', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_comments', '365');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_reporters', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_reporters', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_subscribers', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_subscribers', '7');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_voters', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_voters', '30');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('theme', 'theme', 'default');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('theme', 'split_screen', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('theme', 'center_screen', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('viewers', 'viewers_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('viewers', 'viewers_timeout', '1200');"); //seconds
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('viewers', 'viewers_refresh_enabled', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('viewers', 'viewers_refresh_time', '60');"); //seconds
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'subscribers' ***************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "subscribers` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `name` varchar(250) NOT NULL default '',
  `email` varchar(250) NOT NULL default '',
  `page_id` int(10) unsigned NOT NULL default '0',
  `token` varchar(20) NOT NULL default '',
  `to_all` tinyint(1) unsigned NOT NULL default '1',
  `to_admin` tinyint(1) unsigned NOT NULL default '1',
  `to_reply` tinyint(1) unsigned NOT NULL default '1',
  `is_confirmed` tinyint(1) unsigned NOT NULL default '0',
  `ip_address` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'version' *******************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "version` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `version` varchar(10) NOT NULL default '',
  `type` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "version` (`version`, `type`, `dated`) VALUES ('$latest_version', 'Installation', NOW());");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'viewers' *******************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "viewers` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `user_agent` varchar(250) NOT NULL default '',
  `ip_address` varchar(250) NOT NULL default '',
  `page_reference` varchar(250) NOT NULL default '',
  `page_url` varchar(1000) NOT NULL default '',
  `timestamp` int(50) unsigned NOT NULL default '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/


/********************************************** CREATE TABLE 'voters' ********************************************/
cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "voters` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `comment_id` int(10) unsigned NOT NULL default '0',
  `ip_address` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");
/*****************************************************************************************************************/
?>

<?php
if ($cmtx_query_error) {
	echo '<div style="background: #FCFCFC; padding: 5px; border-top: 1px solid #ABABAB; border-left: 1px solid #ABABAB; border-right: 1px solid #888888; border-bottom: 1px solid #888888; background-image: linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -o-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -moz-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -webkit-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); box-shadow: 3px 3px 5px #888888; background-image: -ms-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); float:left;">';
	echo '<span class="fail">' . 'Creating tables failed.' . '</span>';
	echo '<p></p>';
	echo 'Please consult these error messages:';
	echo '<p></p>';
	echo $cmtx_query_error;
	echo '</div>';
	echo '<div style="clear:left;"></div>';
} else {
	echo '<div class="success">Installation complete!</div>';
	echo '<div style="clear:left"></div>';
	echo '<p></p>';
	echo '<div class="info">You can now go to your <a href="../' . $admin_folder . '/">admin panel</a>.</div>';
}
?>

</body>
</html>