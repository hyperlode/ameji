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

session_start();

if (isset($_POST['submit'])) {

$data = 
'<?php
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

if (!isset($cmtx_path)) { die(\'Access Denied.\'); }

//ENTER DATABASE INFORMATION HERE*****************************************************
$cmtx_mysql_database = \'' . $_POST['name'] . '\';				// The name of the database you created
$cmtx_mysql_username = \'' . $_POST['user'] . '\'; 				// Your MySQL username
$cmtx_mysql_password = \'' . $_POST['password'] . '\';			 	// Your MySQL password
$cmtx_mysql_host = \'' . $_POST['host'] . '\';			// Usually \'localhost\'. Can also be an IP address.
$cmtx_mysql_port = \'' . $_POST['port'] . '\';					// In most cases leave blank
$cmtx_mysql_table_prefix = \'' . $_POST['prefix'] . '\';			// In most cases leave blank
//************************************************************************************

?>';

	$file = '../includes/db/details.php';

	@$handle = fopen($file, 'w');
	@fputs($handle, $data);
	@fclose($handle);
	
	if (file_exists('../includes/db/details.php')) {
		@chmod('../includes/db/details.php', 0444);
		header('Location: ' . 'http://' . $_SERVER['HTTP_HOST'] . dirname($_SERVER['PHP_SELF']) . '/system.php');
		die();	
	} else {
		$issue = true;
	}
}
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
	<div class="step active">Database</div>
	<div class="step">System</div>
	<div class="step">Menu</div>
	<div class="step">Action</div>
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
if (isset($issue)) {

	//Commentics Folder
	require $cmtx_path . 'includes/functions/page.php';
	$tokens = explode('/', cmtx_current_page());
	$commentics_folder = $tokens[sizeof($tokens)-3];

	echo '<span class="fail">' . 'Issue creating the database details file.' . '</span>';
	echo '<p></p>';
	echo 'Please create the file /' . $commentics_folder .  '/includes/db/<b>details.php</b> with the following content inside:';
	echo '<p></p>';
	echo 'After you have created the file, you can proceed to the <a href="system.php">next step</a>.';
	echo '<p></p>';
	echo '<div class="db_details">';
	echo highlight_string($data, true);
	echo '</div>';
	
} else {
?>

	Please enter your database details.

	<p></p>

	<form name="database" id="database" action="database.php" method="post">

	<span class="field">Database Name:</span> <span class="required_symbol">*</span><br />
	<input type="text" required autofocus name="name" size="35"/> <span class="field_note">(The name of the database you created)</span>
	<p></p>
	<span class="field">MySQL Username:</span> <span class="required_symbol">*</span><br />
	<input type="text" required name="user" size="35"/> <span class="field_note">(Your MySQL username)</span>
	<p></p>
	<span class="field">MySQL Password:</span><br />
	<input type="password" name="password" size="35"/> <span class="field_note">(Your MySQL password)</span>
	<p></p>
	<span class="field">Database Host:</span> <span class="required_symbol">*</span><br />
	<input type="text" required name="host" size="35" value="localhost"/> <span class="field_note">(Usually 'localhost'. Can also be an IP address.)</span>
	<p></p>
	<span class="field">Database Port:</span><br />
	<input type="text" name="port" size="35"/> <span class="field_note">(In most cases leave blank)</span>
	<p></p>
	<span class="field">Database Prefix:</span><br />
	<input type="text" name="prefix" size="35"/> <span class="field_note">(In most cases leave blank)</span>

	<p></p>

	<input type="submit" class="button" name="submit" value="Continue" title="Continue"/>

	</form>

<?php } ?>

</body>
</html>