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

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form', 'enabled_bb_code_quote', '1');");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'enabled_smilies_confused'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'enabled_smilies_thumbsup'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'enabled_smilies_thumbdown'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form', 'enabled_smilies_sleep', '1');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','transport_method','php');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_host','smtp.example.com');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_port','25');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_encrypt','off');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_auth','0');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_username','');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','smtp_password','');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('email','sendmail_path','/usr/sbin/sendmail');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('system','enabled_wysiwyg','1');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','rich_snippets','0');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','reply_depth','5');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','reply_arrow','1');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '33' WHERE title = 'field_size_name'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '33' WHERE title = 'field_size_email'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '33' WHERE title = 'field_size_website'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '33' WHERE title = 'field_size_town'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '41' WHERE title = 'field_size_comment_columns'");

?>