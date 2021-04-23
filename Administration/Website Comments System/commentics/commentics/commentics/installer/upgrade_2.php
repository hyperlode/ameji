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
require 'functions/upgrade.php';
require $cmtx_path . 'includes/functions/page.php';
?>

<?php
if (isset($_POST['submit'])) {
	$installed_version = $_POST['installed_version'];
	$latest_version = $_POST['latest_version'];
} else {
	echo '<div class="error">';
	echo 'Please restart the Installer.';
	echo '</div>';
	echo '<div style="clear:left;"></div>';
	die();
}
?>

<?php
require $cmtx_path . 'includes/db/connect.php'; //connect to database
if (!$cmtx_db_ok) { die(); }
?>

<?php
cmtx_set_time_zone(cmtx_setting('time_zone')); //set the time zone
?>

<?php
$admin_folder = cmtx_setting('admin_folder');
?>

<?php
switch ($installed_version) {
	case '2.4':
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '2.3':
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '2.2':
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '2.1':
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '2.0':
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.8':
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.7':
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.6':
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.5':
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.4':
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.3.5':
	require_once 'upgrade_sql/1.3.5-to-1.4.php';
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.3':
	require_once 'upgrade_sql/1.3-to-1.3.5.php';
	require_once 'upgrade_sql/1.3.5-to-1.4.php';
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.2':
	require_once 'upgrade_sql/1.2-to-1.3.php';
	require_once 'upgrade_sql/1.3-to-1.3.5.php';
	require_once 'upgrade_sql/1.3.5-to-1.4.php';
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.1':
	require_once 'upgrade_sql/1.1-to-1.2.php';
	require_once 'upgrade_sql/1.2-to-1.3.php';
	require_once 'upgrade_sql/1.3-to-1.3.5.php';
	require_once 'upgrade_sql/1.3.5-to-1.4.php';
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
	case '1.0':
	require_once 'upgrade_sql/1.0-to-1.1.php';
	require_once 'upgrade_sql/1.1-to-1.2.php';
	require_once 'upgrade_sql/1.2-to-1.3.php';
	require_once 'upgrade_sql/1.3-to-1.3.5.php';
	require_once 'upgrade_sql/1.3.5-to-1.4.php';
	require_once 'upgrade_sql/1.4-to-1.5.php';
	require_once 'upgrade_sql/1.5-to-1.6.php';
	require_once 'upgrade_sql/1.6-to-1.7.php';
	require_once 'upgrade_sql/1.7-to-1.8.php';
	require_once 'upgrade_sql/1.8-to-2.0.php';
	require_once 'upgrade_sql/2.0-to-2.1.php';
	require_once 'upgrade_sql/2.1-to-2.2.php';
	require_once 'upgrade_sql/2.2-to-2.3.php';
	require_once 'upgrade_sql/2.3-to-2.4.php';
	require_once 'upgrade_sql/2.4-to-2.5.php';
	break;
}
?>

<?php
if (!$cmtx_query_error) {
	cmtx_db_query("INSERT INTO `" . $cmtx_mysql_table_prefix . "version` (`version`, `type`, `dated`) VALUES ('$latest_version', 'Upgrade', NOW());");
}
?>

<?php
if ($cmtx_query_error) {
	echo '<div style="background: #FCFCFC; padding: 5px; border-top: 1px solid #ABABAB; border-left: 1px solid #ABABAB; border-right: 1px solid #888888; border-bottom: 1px solid #888888; background-image: linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -o-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -moz-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -webkit-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); background-image: -ms-linear-gradient(top, #FFFFFF 1%, #F5F5F5 65%); box-shadow: 3px 3px 5px #888888;">';
	echo '<span class="fail">' . 'Upgrade failed.' . '</span>';
	echo '<p></p>';
	echo 'Please consult these error messages:';
	echo '<p></p>';
	echo $cmtx_query_error;
	echo '</div>';
	echo '<div style="clear:left;"></div>';
} else {
	echo '<div class="success">Upgrade complete!</div>';
	echo '<div style="clear:left"></div>';
	echo '<p></p>';
	echo '<div class="info">You can now go to your <a href="../' . $admin_folder . '/">admin panel</a>.</div>';
}
?>

</body>
</html>