  <div class="container">
    <h1 class="text-center"><img src="/images/title.png"/></h1>
    <form class="form-signin"  id="signup_form" name="signup_form" action="/signup/" method="POST">
      <h1>Sign Up</h1>
      <p>Already Signed up? <a href="/">Login</a></p>
      <?php echo validation_errors('<p class="text-danger">', '</p>'); ?>
      <input type="text" name="username" class="form-control-first form-control" value="<?php echo set_value('username'); ?>" placeholder="Username" pattern=".{3,}" title="A minimum of 3 characters is required" required autofocus autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="email" name="email" class="form-control" value="<?php echo set_value('email'); ?>" placeholder="Email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" title="x@x.xx" required autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="text" name="first_name" class="form-control" value="<?php echo set_value('first_name'); ?>" placeholder="First Name" autocorrect="off" spellcheck="false">
      <input type="text" name="last_name" class="form-control" value="<?php echo set_value('last_name'); ?>" placeholder="Last Name" autocorrect="off" spellcheck="false">
      <input type="password" name="password" class="form-control" value="<?php echo set_value('password'); ?>" placeholder="Password" pattern=".{3,}" title="A minimum of 3 characters is required" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="password" name="confirm_password" class="form-control-last form-control" value="<?php echo set_value('confirm_password'); ?>" placeholder="Confirm Password" pattern=".{3,}" title="A minimum of 3 characters is required" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submit-register" value="Sign Up"/>
    </form>
  </div> <!-- /container -->