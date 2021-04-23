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

cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "settings` (`category`, `title`, `value`) VALUES ('comments', 'show_permalink', '1')");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` DROP COLUMN `is_active`");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "subscribers` DROP COLUMN `last_action`");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'task_enabled_delete_inactive_subscribers'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'days_to_delete_inactive_subscribers'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'task_enabled_reactivate_inactive_subscribers'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'days_to_reactivate_inactive_subscribers'");

cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "comments` DROP COLUMN `is_flagged`");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "comments` ADD `reports` int(10) unsigned NOT NULL default '0'");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "comments` ADD `is_verified` tinyint(1) unsigned NOT NULL default '0'");

cmtx_db_query("RENAME TABLE `" . $cmtx_mysql_table_prefix . "reports` TO `" . $cmtx_mysql_table_prefix . "reporters`");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "reporters` DROP COLUMN `status`");
cmtx_db_query("ALTER TABLE `" . $cmtx_mysql_table_prefix . "reporters` DROP COLUMN `reason`");

cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'task_enabled_delete_comment_ips'");
cmtx_db_query("DELETE FROM `" . $cmtx_mysql_table_prefix . "settings` WHERE `title` = 'days_to_delete_comment_ips'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'task_enabled_delete_reporters' WHERE `title` = 'task_enabled_delete_reports'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'days_to_delete_reporters' WHERE `title` = 'days_to_delete_reports'");

cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'task_enabled_delete_subscribers' WHERE `title` = 'task_enabled_delete_unconfirmed_subscribers'");
cmtx_db_query("UPDATE `" . $cmtx_mysql_table_prefix . "settings` SET `title` = 'days_to_delete_subscribers' WHERE `title` = 'days_to_delete_unconfirmed_subscribers'");

?>