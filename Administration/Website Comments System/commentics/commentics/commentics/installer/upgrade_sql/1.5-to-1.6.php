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

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('language','language_backend','english');");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'language_frontend' WHERE title = 'language'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'admin_new_flag_subject' WHERE title = 'admin_new_comment_flag_subject'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'admin_new_flag_from_name' WHERE title = 'admin_new_comment_flag_from_name'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'admin_new_flag_from_email' WHERE title = 'admin_new_comment_flag_from_email'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'admin_new_flag_reply_to' WHERE title = 'admin_new_comment_flag_reply_to'");
cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."admins` CHANGE receive_email_new_comment_flag receive_email_new_flag tinyint(1) unsigned NOT NULL default '1'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_bans' WHERE title = 'task_enabled_delete_old_bans'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_bans' WHERE title = 'days_to_delete_old_bans'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_reports' WHERE title = 'task_enabled_delete_old_reports'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_reports' WHERE title = 'days_to_delete_old_reports'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_voters' WHERE title = 'task_enabled_delete_old_voters'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_voters' WHERE title = 'days_to_delete_old_voters'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_comment_ips' WHERE title = 'task_enabled_delete_old_comment_ips'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_comment_ips' WHERE title = 'days_to_delete_old_comment_ips'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_unconfirmed_subscribers' WHERE title = 'task_enabled_delete_old_unconfirmed_subscribers'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_unconfirmed_subscribers' WHERE title = 'days_to_delete_old_unconfirmed_subscribers'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'task_enabled_delete_inactive_subscribers' WHERE title = 'task_enabled_delete_old_inactive_subscribers'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'days_to_delete_inactive_subscribers' WHERE title = 'days_to_delete_old_inactive_subscribers'");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'stop_repeat_voting'");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','repeat_ratings','disable');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'enabled_counter' WHERE title = 'enabled_comment_counter'");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'enabled_reply'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'default_reply'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value='1,2,3,4,5,6' WHERE title = 'sort_order_fields'");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'anchor_process'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'anchor_form'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'anchor_reset'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'anchor_comments'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('security','hide_trap_bans','0');");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'form_cookie'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'approve_comments' WHERE title = 'approve_all'");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'enabled_notifications'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_social_technorati'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_social_reddit'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_social_myspace'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_social_linkedin'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '1' WHERE title = 'js_vote_ok'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '31' WHERE title = 'field_size_name'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '31' WHERE title = 'field_size_email'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '31' WHERE title = 'field_size_website'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '31' WHERE title = 'field_size_town'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '39' WHERE title = 'field_size_comment_columns'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET question = 'Enter the third letter of the word <i>castle</i>.' WHERE question = 'Enter the first, third and fourth letters of the word <i>castle</i>.'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET answer = 's' WHERE answer = 'cst'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET question = 'Enter the last letter of the word <i>satellite</i>.' WHERE question = 'Enter the second, third and fifth letters of the word <i>satellite</i>.'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET answer = 'e' WHERE answer = 'atl'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET question = 'Type the numbers for four hundred seventy-two.' WHERE question = 'Type the numbers for one thousand six hundred forty-two.'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."questions` SET answer = '472' WHERE answer = '1642'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_smilies_confused'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_smilies_thumbsup'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'enabled_smilies_thumbdown'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'check_capitals_enabled'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'check_repeats_enabled'");

?>