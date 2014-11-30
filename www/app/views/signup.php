  <div class="container">
    <h1 class="text-center"><img src="/images/title.png"/></h1>
    <form class="form-signin"  id="signup_form" name="signup_form" action="/signup/" method="POST">
      <h1>Sign Up</h1>
      <p>Already Signed up? <a href="/">Login</a></p>
      <?php echo validation_errors('<p class="text-danger">', '</p>'); ?>
      <input type="text" name="username" class="signin-name form-control" value="<?php echo set_value('username'); ?>" placeholder="Username" pattern=".{3,}" title="A minimum of 3 characters is required" required autofocus autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="password" name="password" class="signin-password form-control" value="<?php echo set_value('password'); ?>" placeholder="Password" pattern=".{3,}" title="A minimum of 3 characters is required" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submit-register" value="Sign Up"/>
    </form>
  </div> <!-- /container -->