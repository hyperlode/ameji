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
	<div class="step active">Action</div>
	<div class="step">Done</div>
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
require 'functions/upgrade.php';
?>

<?php
require $cmtx_path . 'includes/db/connect.php'; //connect to database
if (!$cmtx_db_ok) { die(); }
?>

<?php
if (cmtx_db_num_rows(cmtx_db_query("SHOW TABLES LIKE '" . $cmtx_mysql_table_prefix . "comments'")) == 0) {
	echo '<div class="error">';
	echo 'There are no database tables. Have you installed the script?';
	echo '</div>';
	echo '<div style="clear:left;"></div>';
	echo '<p></p>';
	echo '<a href="javascript:history.back()">back</a>';
	echo '</body>';
	echo '</html>';
	die();
}
?>

<?php
$installed_version = cmtx_get_version();
?>

<?php
echo '<label class="upgrade_item">Installed Version:</label>' . $installed_version;
echo '<p></p>';
echo '<label class="upgrade_item">Latest Version:</label>' . $latest_version;
echo '<p></p>';
?>

<?php
if ($installed_version == $latest_version) {
	echo '<div class="error">';
	echo 'You already have the latest version.';
	echo '</div>';
	echo '<div style="clear:left;"></div>';
	echo '<p></p>';
	echo '<a href="javascript:history.back()">back</a>';
} else {
?>

<form name="upgrade" id="upgrade" action="upgrade_2.php" method="post">
<input type="hidden" name="installed_version" value="<?php echo $installed_version; ?>"/>
<input type="hidden" name="latest_version" value="<?php echo $latest_version; ?>"/>
<input type="submit" class="button" name="submit" value="Upgrade" title="Upgrade"/>
</form>

<?php } ?>

</body>
</html>