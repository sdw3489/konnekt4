<?php
	session_start();
	if(isset($_GET['username'])){
		$name=$_GET['username'];
	}else{
		$name='';
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"
          "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Login</title>
	<link type="text/css" rel="stylesheet" href="/css/styles.css"/>
</head>
<body>
	<div id="container">
		<img src="/images/title.png"/>
		<form id="login_form" name="login_form" method="POST" action="/app/controllers/userController.php">
		  <h1 class="sub_title">Log in</h1>
		  <p>New User? - <a href="/signup/">Sign up</a></p>
			<label for="name">Username:</label>
			<input type="text" name="name" id="name" value="<?php echo $name ?>" /><br/>
			<label for="password">Password:</label>
			<input type="password" name="password" id="password" /><br/>
			<input class="button" type="submit" name="submit-login" value="Submit" />
		</form>
	</div>
</body>
</html>