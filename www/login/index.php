<?php
	if($_SERVER['SCRIPT_NAME'] === '/login/index.php'){
		header("Location:/");
	}
	$name = (isset($_GET['username']))? $_GET['username'] : '';
?>
	<div class="container">
		<p class="text-center"><img src="/images/title.png"/></p>
   	<form class="form-signin" id="login_form" name="login_form" method="POST" action="/app/controllers/userController.php" role="form">
		  <h1 class="sub_title">Log in</h1>
		  <p>New User? - <a href="/signup/">Sign up</a></p>
      <input type="text" name="name" class="form-control" placeholder="Username" value="<?= $name ;?>" required autofocus>
      <input type="password" class="form-control" placeholder="Password" required name="password">
     <!--  <div class="checkbox">
        <label>
          <input type="checkbox" value="remember-me"> Remember me
        </label>
      </div> -->
      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submit-login" value="Sign in"/>
    </form>
  </div> <!-- /container -->

	<script src="/js/vendor/jquery-1.11.1.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
	<script type="text/javascript">
		$(document).ready(function(){});
	</script>
</body>
</html>