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

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'gravatar_custom', 'http://');");

$from_name = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'admin_new_ban_from_name'");
$from_name = cmtx_db_fetch_assoc($from_name);
$from_name = $from_name["value"];

$from_email = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'admin_new_ban_from_email'");
$from_email = cmtx_db_fetch_assoc($from_email);
$from_email = $from_email["value"];

$reply_to = cmtx_db_query("SELECT * FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'admin_new_ban_reply_to'");
$reply_to = cmtx_db_fetch_assoc($reply_to);
$reply_to = $reply_to["value"];

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_from_name', '$from_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_from_email', '$from_email');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'setup_reply_to', '$reply_to');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_subject', 'Comments: Email Test');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_from_name', '$from_name');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_from_email', '$from_email');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'admin_email_test_reply_to', '$reply_to');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'scroll_speed', '50');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('email', 'signature', 'Add your signature here');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('notice', 'notice_settings_email_sender', '1');");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "pages` CHANGE `page_id` `identifier` varchar(250) NOT NULL default ''");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('approval', 'trust_users', '0');");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "comments` CHANGE `vote_up` `likes` int(10) unsigned NOT NULL default '0'");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "comments` CHANGE `vote_down` `dislikes` int(10) unsigned NOT NULL default '0'");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_name'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_email'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_website'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_town'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_comment_columns'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_comment_rows'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'field_size_question'");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'notice_layout_form_sizes_maximums'");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'captcha_type', 'recaptcha');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'field_maximum_captcha', '4');");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_width', '150');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_height', '50');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_length', '4');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_perturbation', '.75');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_lines', '5');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_noise', '1');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_text_color', '#707070');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_line_color', '#707070');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_back_color', '#F0F0F0');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'securimage_noise_color', '#707070');");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "pages` CHANGE `url` `url` varchar(1000) NOT NULL default ''");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "viewers` CHANGE `page_url` `page_url` varchar(1000) NOT NULL default ''");

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_name', 'normal');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_email', 'normal');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_website', 'normal');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_town', 'normal');");
cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('form', 'state_country', 'normal');");

?>