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

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_page_number' WHERE title = 'show_comments_info'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_comment_count','1');");

$gravatar_default = cmtx_db_query("SELECT * FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'gravatar_default'");
$gravatar_default = cmtx_db_fetch_assoc($gravatar_default);
$gravatar_default = $gravatar_default["value"];
if ($gravatar_default == "") {
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = 'default' WHERE title = 'gravatar_default'");
}

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','gravatar_size','70');");

cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'field_size_captcha'");
cmtx_db_query("DELETE FROM `".$cmtx_mysql_table_prefix."settings` WHERE title = 'field_maximum_captcha'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','recaptcha_public_key','');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','recaptcha_private_key','');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','recaptcha_theme','white');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','recaptcha_language','en');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('notice','notice_field_size_css','1');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'comments_order' WHERE title = 'newest_first'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','hide_form','0');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','enabled_remember','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('form','default_remember','0');");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '0' WHERE title = 'default_notify'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('order','sort_order_captchas','1,2');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('order','sort_order_checkboxes','1,2,3,4');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('system','check_comments_url','1');");

cmtx_db_query("ALTER TABLE `".$cmtx_mysql_table_prefix."pages` CHANGE custom_id page_id varchar(250) NOT NULL default ''");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('system','delay_pages','0');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','form_cookie','0');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('processor','form_cookie_days','365');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('system','admin_cookie_days','365');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'ban_cookie_days' WHERE title = 'banning_cookie_days'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_topic','1');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','rich_snippets_markup','Microformats');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_gravatar' WHERE title = 'enabled_gravatar'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social' WHERE title = 'enabled_social'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_facebook' WHERE title = 'enabled_social_facebook'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_delicious' WHERE title = 'enabled_social_delicious'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_stumbleupon' WHERE title = 'enabled_social_stumbleupon'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_digg' WHERE title = 'enabled_social_digg'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_technorati' WHERE title = 'enabled_social_technorati'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_google' WHERE title = 'enabled_social_google'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_reddit' WHERE title = 'enabled_social_reddit'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_myspace' WHERE title = 'enabled_social_myspace'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_twitter' WHERE title = 'enabled_social_twitter'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_social_linkedin' WHERE title = 'enabled_social_linkedin'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by' WHERE title = 'enabled_sort_by'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_1' WHERE title = 'enabled_sort_by_1'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_2' WHERE title = 'enabled_sort_by_2'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_3' WHERE title = 'enabled_sort_by_3'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_4' WHERE title = 'enabled_sort_by_4'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_5' WHERE title = 'enabled_sort_by_5'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET title = 'show_sort_by_6' WHERE title = 'enabled_sort_by_6'");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','show_read_more','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('comments','read_more_limit','500');");

cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','task_enabled_reactivate_inactive_subscribers','1');");
cmtx_db_query("INSERT INTO `".$cmtx_mysql_table_prefix."settings` (category, title, value) VALUES ('tasks','days_to_reactivate_inactive_subscribers','3');");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '2' WHERE title = 'comment_minimum_characters'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '1' WHERE title = 'comment_minimum_words'");

cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '60' WHERE title = 'flood_control_delay_time'");
cmtx_db_query("UPDATE `".$cmtx_mysql_table_prefix."settings` SET value = '5' WHERE title = 'flood_control_maximum_amount'");

?>