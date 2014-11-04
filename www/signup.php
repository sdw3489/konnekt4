<?php
session_start();
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Sign Up</title>
	<script type="text/javascript">	</script>
	<link type="text/css" rel="stylesheet" href="styles.css"/>
</head>
<body>
<div id="container">
		<img src="images/title.png"/>
	<form id="signup_form" action="userController.php" method="POST">
    	<h1 class="sub_title">Sign Up</h1>
        <p><br /></p>
		<label for="name">Username:</label>
		<input type="text" name="username"/><br/>
		<label for="password">Password:</label>
		<input type="password" name="password"/><br/>
		<input class="button" type="submit" name="submit-register" value="Register"/>
	</form>
	</div>
</body>
</html>