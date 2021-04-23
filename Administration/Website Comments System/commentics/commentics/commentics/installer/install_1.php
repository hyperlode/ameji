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

<script type="text/javascript">
// <![CDATA[
function check_passwords() {
	if (document.install.admin_password_1.value == document.install.admin_password_2.value) {
		return true;
	} else {
		alert('The two passwords do not match.');
		return false;
	}
}
// ]]>
</script>

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
require $cmtx_path . 'includes/functions/page.php';
?>

<?php
require $cmtx_path . 'includes/db/connect.php'; //connect to database
if (!$cmtx_db_ok) { die(); }
?>

<?php
if (cmtx_db_num_rows(cmtx_db_query("SHOW TABLES LIKE '" . $cmtx_mysql_table_prefix . "comments'"))) {
	echo '<div class="error">';
	echo 'The programme is already installed.';
	echo '</div>';
	echo '<div style="clear:left;"></div>';
	echo '<p></p>';
	echo '<a href="javascript:history.back()">back</a>';
	echo '</body>';
	echo '</html>';
	die();
}
?>

The Installer will now create the tables in the database.

<p></p>
<hr/>
<p></p>

<form name="install" id="install" action="install_2.php" method="post" onsubmit="return check_passwords()">

<span class="heading">Administrator</span>

<p></p>

<span class="heading_note">These settings are for the Commentics admin panel.</span>

<p></p>

<span class="field">Admin Username:</span> <span class="required_symbol">*</span><br />
<input type="text" required autofocus name="admin_username" size="35"/> <span class="field_note">(enter your admin panel username)</span>
<p></p>
<span class="field">Admin Password:</span> <span class="required_symbol">*</span><br />
<input type="password" required name="admin_password_1" size="35"/> <span class="field_note">(enter your admin panel password)</span>
<p></p>
<span class="field">Repeat Password:</span> <span class="required_symbol">*</span><br />
<input type="password" required name="admin_password_2" size="35"/> <span class="field_note">(repeat your admin panel password)</span>
<p></p>
<span class="field">Email Address:</span> <span class="required_symbol">*</span><br />
<input type="email" required name="email_address" size="35"/> <span class="field_note">(enter your admin email address)</span>

<p></p>
<hr/>
<p></p>

<span class="heading">General</span>

<p></p>

<span class="heading_note">General settings.</span>

<p></p>

<span class="field">Site Name:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="site_name" size="35" value="My Site"/> <span class="field_note">(enter the name of your site)</span>

<p></p>

<span class="field">Time Zone:</span> <span class="required_symbol">*</span><br />
<?php
$time_zones = DateTimeZone::listIdentifiers();
echo '<select name="time_zone">';
foreach ($time_zones as $time_zone) {
	echo '<option value="' . $time_zone . '">' . $time_zone . '</option>';
}
echo '</select>';
?>
<span class="field_note"> (select your time zone)</span>

<p></p>
<hr/>
<p></p>

<span class="heading">Website</span>

<p></p>

<span class="heading_note">These settings are <b>auto-populated</b> so may not need editing.</span>

<p></p>

<?php
//Site Domain
$site_domain = str_ireplace('www.', '', parse_url(cmtx_current_page(), PHP_URL_HOST));

//Site URL
$site_url = 'http://' . parse_url(cmtx_current_page(), PHP_URL_HOST);

//Commentics Folder
$tokens = explode('/', cmtx_current_page());
$commentics_folder = $tokens[sizeof($tokens)-3];

//Commentics URL
$commentics_url = str_ireplace('installer/install_1.php', '', cmtx_current_page());

//Admin Folder
$folders = array();
foreach (glob('../*', GLOB_ONLYDIR) as $dir) {
	array_push($folders, basename($dir));
}
$admin_folder = 'admin';
foreach ($folders as $folder) {
	if ($folder != 'agreement' && $folder != 'css' && $folder != 'external' && $folder != 'images' && $folder != 'includes' && $folder != 'installer' && $folder != 'javascript') {
		$admin_folder = $folder;
	}
}
?>

<span class="field">Site Domain:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="site_domain" size="35" value="<?php echo $site_domain; ?>"/> <span class="field_note">(the domain of your site)</span>
<p></p>
<span class="field">Site URL:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="site_url" size="35" value="<?php echo $site_url; ?>"/> <span class="field_note">(the URL to your site)</span>
<p></p>
<span class="field">Commentics Folder:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="commentics_folder" size="35" value="<?php echo $commentics_folder; ?>"/> <span class="field_note">(the folder you uploaded)</span>
<p></p>
<span class="field">Commentics URL:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="commentics_url" size="35" value="<?php echo $commentics_url; ?>"/> <span class="field_note">(the URL to the folder)</span>
<p></p>
<span class="field">Admin Folder:</span> <span class="required_symbol">*</span><br />
<input type="text" required name="admin_folder" size="35" value="<?php echo $admin_folder; ?>"/> <span class="field_note">(the admin folder name)</span>

<p></p>
<hr/>
<p></p>

When ready click 'Install' below.

<p></p>

<input type="submit" class="button" name="submit" value="Install" title="Install"/>
</form>

</body>
</html>