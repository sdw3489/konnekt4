<?php
  session_start();
  $title="Signup";
  require_once "../_includes/head.php";
?>
  <div class="container">
    <p class="text-center"><img src="/images/title.png"/></p>
    <form class="form-signin"  id="signup_form" name="signup_form" action="/app/controllers/userController.php" method="POST">
      <h1>Sign Up</h1>
      <p>Already Signed up? <a href="/login">Login</a></p>
      <input type="text" name="username" class="signin-name form-control" placeholder="Username" required autofocus>
      <input type="password" name="password" class="signin-password form-control" placeholder="Password" required >
      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submit-register" value="Sign Up"/>
    </form>
  </div> <!-- /container -->

  <!-- Latest compiled and minified JavaScript -->
  <script src="/js/vendor/jquery-1.11.1.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
  <script type="text/javascript">
    $(document).ready(function(){

    });
  </script>
</body>
</html>