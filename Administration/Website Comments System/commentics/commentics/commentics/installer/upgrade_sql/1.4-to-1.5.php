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

cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."comments` ADD vote_up int(10) unsigned NOT NULL default '0'");
cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."comments` ADD vote_down int(10) unsigned NOT NULL default '0'");
cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."comments` ADD is_flagged tinyint(1) unsigned NOT NULL default '0'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_like','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_dislike','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','js_vote_ok','0');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','js_vote_bad','1');");

cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."admins` ADD receive_email_new_comment_flag tinyint(1) unsigned NOT NULL default '1'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_flag','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','flag_max_per_user','3');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','flag_min_per_comment','2');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','flag_disapprove','1');");

$from_name = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_new_ban_from_name'");
$from_name = cmtx_db_fetch_assoc($from_name);
$from_name = $from_name["value"];

$from_email = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_new_ban_from_email'");
$from_email = cmtx_db_fetch_assoc($from_email);
$from_email = $from_email["value"];

$reply_to = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_new_ban_reply_to'");
$reply_to = cmtx_db_fetch_assoc($reply_to);
$reply_to = $reply_to["value"];

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','admin_new_comment_flag_subject','New Comment: Flag');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','admin_new_comment_flag_from_name','$from_name');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','admin_new_comment_flag_from_email','$from_email');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','admin_new_comment_flag_reply_to','$reply_to');");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'comments_first'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'newest_first' WHERE title = 'list_newest_first'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','task_enabled_delete_old_reports','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','days_to_delete_old_reports','30');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','task_enabled_delete_old_voters','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','days_to_delete_old_voters','30');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','task_enabled_delete_old_comment_ips','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','days_to_delete_old_comment_ips','30');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('security','check_db_file','1');");

cmtx_db_query("CREATE TABLE IF NOT EXISTS `".$cmtx_mysql_table_prefix."reports` (
  id int(10) unsigned NOT NULL auto_increment,
  comment_id int(10) unsigned NOT NULL default '0',
  ip_address varchar(39) NOT NULL default '',
  status varchar(250) NOT NULL default '',
  reason varchar(250) NOT NULL default '',
  dated datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

cmtx_db_query("CREATE TABLE IF NOT EXISTS `".$cmtx_mysql_table_prefix."voters` (
  id int(10) unsigned NOT NULL auto_increment,
  comment_id int(10) unsigned NOT NULL default '0',
  ip_address varchar(39) NOT NULL default '',
  dated datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

?>