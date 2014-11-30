  <div class="container">
    <h1 class="text-center"><img src="/images/title.png"/></h1>
    <form class="form-signin" id="login_form" name="login_form" method="POST" action="/login/" role="form">
      <h1>Login</h1>
      <p>New User? - <a href="/signup/">Sign Up</a></p>
      <?php echo validation_errors('<p class="text-danger">', '</p>'); ?>
      <input type="text" name="name" class="signin-name form-control" value="<?php echo set_value('name'); ?>" placeholder="Username" required autofocus autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="password" name="password" class="signin-password form-control" value="<?php echo set_value('password'); ?>" placeholder="Password" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login"/>
    </form>
  </div> <!-- /container -->