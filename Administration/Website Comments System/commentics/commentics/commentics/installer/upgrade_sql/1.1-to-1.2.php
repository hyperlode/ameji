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

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_bold','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_italic','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_underline','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_strike','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_superscript','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_subscript','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_code','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_php_code','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_line','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_list_bullet','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_list_numeric','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_url','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_email','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_bb_code_image','1');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','approve_images','1');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title='comment_links_new_window' WHERE title = 'comment_parser_new_window'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title='comment_links_nofollow' WHERE title = 'comment_parser_nofollow'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','comments_first','1');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','check_capitals_enabled','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','check_capitals_percentage','50');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','check_capitals_action','reject');");

cmtx_db_query("CREATE TABLE IF NOT EXISTS `".$cmtx_mysql_table_prefix."admins` (
  id int(10) unsigned NOT NULL auto_increment,
  username varchar(250) NOT NULL default '',
  password varchar(250) NOT NULL default '',
  email varchar(250) NOT NULL default '',
  ip_address varchar(39) NOT NULL default '',
  cookie_key varchar(250) NOT NULL default '',
  detect_admin tinyint(1) unsigned NOT NULL default '1',
  detect_method varchar(250) NOT NULL default 'both',
  default_name varchar(250) NOT NULL default '',
  default_email varchar(250) NOT NULL default '',
  default_website varchar(250) NOT NULL default '',
  default_town varchar(250) NOT NULL default '',
  default_country varchar(250) NOT NULL default '',
  default_rating varchar(250) NOT NULL default '',
  default_comment varchar(250) NOT NULL default '',
  receive_email_new_ban tinyint(1) unsigned NOT NULL default '1',
  receive_email_new_comment_approve tinyint(1) unsigned NOT NULL default '1',
  receive_email_new_comment_okay tinyint(1) unsigned NOT NULL default '1',
  last_login datetime NOT NULL default '0000-00-00 00:00:00',
  is_super tinyint(1) unsigned NOT NULL default '0',
  is_enabled tinyint(1) unsigned NOT NULL default '1',
  dated datetime NOT NULL default '0000-00-00 00:00:00',
  PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;");

$admin_username = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_username'");
$admin_username = cmtx_db_fetch_assoc($admin_username);
$username = $admin_username["value"];

$admin_password = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_password'");
$admin_password = cmtx_db_fetch_assoc($admin_password);
$password = $admin_password["value"];

$admin_email_address = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_email_address'");
$admin_email_address = cmtx_db_fetch_assoc($admin_email_address);
$email_address = $admin_email_address["value"];

$detect_admin = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'detect_admin'");
$detect_admin = cmtx_db_fetch_assoc($detect_admin);
$detect_admin = $detect_admin["value"];

$detect_admin_method = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'detect_admin_method'");
$detect_admin_method = cmtx_db_fetch_assoc($detect_admin_method);
$detect_method = $detect_admin_method["value"];

$admin_ip_address = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_ip_address'");
$admin_ip_address = cmtx_db_fetch_assoc($admin_ip_address);
$ip_address = $admin_ip_address["value"];

$cookie_key = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'cookie_key'");
$cookie_key = cmtx_db_fetch_assoc($cookie_key);
$cookie_key = $cookie_key["value"];

$admin_default_name = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_name'");
$admin_default_name = cmtx_db_fetch_assoc($admin_default_name);
$admin_default_name = $admin_default_name["value"];

$admin_default_email = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_email'");
$admin_default_email = cmtx_db_fetch_assoc($admin_default_email);
$admin_default_email = $admin_default_email["value"];

$admin_default_website = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_website'");
$admin_default_website = cmtx_db_fetch_assoc($admin_default_website);
$admin_default_website = $admin_default_website["value"];

$admin_default_town = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_town'");
$admin_default_town = cmtx_db_fetch_assoc($admin_default_town);
$admin_default_town = $admin_default_town["value"];

$admin_default_country = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_country'");
$admin_default_country = cmtx_db_fetch_assoc($admin_default_country);
$admin_default_country = $admin_default_country["value"];

$admin_default_rating = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_rating'");
$admin_default_rating = cmtx_db_fetch_assoc($admin_default_rating);
$admin_default_rating = $admin_default_rating["value"];

$admin_default_comment = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_default_comment'");
$admin_default_comment = cmtx_db_fetch_assoc($admin_default_comment);
$admin_default_comment = $admin_default_comment["value"];

$receive_email_admin_new_ban = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_ban'");
$receive_email_admin_new_ban = cmtx_db_fetch_assoc($receive_email_admin_new_ban);
$receive_email_admin_new_ban = $receive_email_admin_new_ban["value"];

$receive_email_admin_new_comment_approve = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_comment_approve'");
$receive_email_admin_new_comment_approve = cmtx_db_fetch_assoc($receive_email_admin_new_comment_approve);
$receive_email_admin_new_comment_approve = $receive_email_admin_new_comment_approve["value"];

$receive_email_admin_new_comment_okay = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_comment_okay'");
$receive_email_admin_new_comment_okay = cmtx_db_fetch_assoc($receive_email_admin_new_comment_okay);
$receive_email_admin_new_comment_okay = $receive_email_admin_new_comment_okay["value"];

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."admins` (username, password, email, ip_address, cookie_key, detect_admin, detect_method, default_name, default_email, default_website, default_town, default_country, default_rating, default_comment, receive_email_new_ban, receive_email_new_comment_approve, receive_email_new_comment_okay, last_login, is_super, is_enabled, dated) VALUES ('$username','$password','$email_address', '$ip_address', '$cookie_key', '$detect_admin', '$detect_method', '$admin_default_name', '$admin_default_email', '$admin_default_website', '$admin_default_town', '$admin_default_country', '$admin_default_rating', '$admin_default_comment', '$receive_email_admin_new_ban', '$receive_email_admin_new_comment_approve', '$receive_email_admin_new_comment_okay', NOW(), '1', '1', NOW());");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE category = 'admin_detection'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE category = 'administrator'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_username'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'admin_password'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_ban'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_comment_approve'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'receive_email_admin_new_comment_okay'");

?>