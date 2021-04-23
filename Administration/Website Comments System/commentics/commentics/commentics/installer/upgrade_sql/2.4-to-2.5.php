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

if (!isset($cmtx_path)) { die('Access Denied.'); }

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `value` = '2000' WHERE `title` = 'scroll_speed'");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` ADD `ip_address` varchar(250) NOT NULL default ''");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'js_vote_ok'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'enabled_bb_code_link' WHERE `title` = 'enabled_bb_code_url'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'enabled_bb_code_php' WHERE `title` = 'enabled_bb_code_php_code'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'enabled_bb_code_numeric' WHERE `title` = 'enabled_bb_code_list_numeric'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'enabled_bb_code_bullet' WHERE `title` = 'enabled_bb_code_list_bullet'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `value` = '1' WHERE `title` = 'validate_website_ping'");

$site_name = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'setup_from_name'");
$site_name = cmtx_db_fetch_assoc($site_name);
$site_name = $site_name["value"];

$commentics_url = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'url_to_comments_folder'");
$commentics_url = cmtx_db_fetch_assoc($commentics_url);
$commentics_url = $commentics_url["value"];

$site_domain = str_ireplace('www.', '', parse_url($commentics_url, PHP_URL_HOST));

$site_url = 'http://' . parse_url($commentics_url, PHP_URL_HOST);

$tokens = explode('/', $commentics_url);
$commentics_folder = $tokens[sizeof($tokens)-3];

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_name', '$site_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_domain', '$site_domain');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'site_url', '$site_url');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'commentics_folder', '$commentics_folder');");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'commentics_url' WHERE `title` = 'url_to_comments_folder'");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'check_comments_url'");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('system', 'display_parsing', '0');");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'rss_description'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'rss_language'");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('theme', 'theme', 'default');");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `category` = 'theme' WHERE `title` = 'split_screen'");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('theme', 'center_screen', '0');");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'time_format'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'date_time_format'");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'task_enabled_delete_comments', '0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('tasks', 'days_to_delete_comments', '365');");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'smtp_auth'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'subscriber_notification_basic_subject' WHERE `title` = 'subscriber_notification_subject'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'subscriber_notification_basic_from_name' WHERE `title` = 'subscriber_notification_from_name'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'subscriber_notification_basic_from_email' WHERE `title` = 'subscriber_notification_from_email'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'subscriber_notification_basic_reply_to' WHERE `title` = 'subscriber_notification_reply_to'");

$from_name = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'setup_from_name'");
$from_name = cmtx_db_fetch_assoc($from_name);
$from_name = $from_name["value"];

$from_email = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'setup_from_email'");
$from_email = cmtx_db_fetch_assoc($from_email);
$from_email = $from_email["value"];

$reply_to = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'setup_reply_to'");
$reply_to = cmtx_db_fetch_assoc($reply_to);
$reply_to = $reply_to["value"];

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_subject', 'You Have a Reply');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_from_name', '$from_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_from_email', '$from_email');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_reply_reply_to', '$reply_to');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_subject', 'The Admin has Posted');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_from_name', '$from_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_from_email', '$from_email');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'subscriber_notification_admin_reply_to', '$reply_to');");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` ADD `to_all` tinyint(1) unsigned NOT NULL default '1'");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` ADD `to_admin` tinyint(1) unsigned NOT NULL default '1'");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` ADD `to_reply` tinyint(1) unsigned NOT NULL default '1'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'show_rss' WHERE `title` = 'show_rss_this_page'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'rss_enabled'");

cmtx_db_query("CREATE TABLE IF NOT EXISTS `" . $cmtx_mysql_table_prefix . "ratings` (
  `id` int(10) unsigned NOT NULL auto_increment,
  `page_id` int(10) unsigned NOT NULL default '0',
  `rating` tinyint(1) unsigned NOT NULL default '0',
  `ip_address` varchar(250) NOT NULL default '',
  `dated` datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

?>