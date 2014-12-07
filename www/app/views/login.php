  <div class="container">
    <h1 class="text-center"><img src="/images/title.png"/></h1>
    <form class="form-signin" id="login_form" name="login_form" method="POST" action="/login/" role="form">
      <h1>Login</h1>
      <p>New User? - <a href="/signup/">Sign Up</a></p>
      <?php if(isset($query)): ?>
      <p class="text-success">Registration Successful</p>
      <?php endif; ?>
      <?php echo validation_errors('<p class="text-danger">', '</p>'); ?>
      <input type="text" name="username" class="form-control-first form-control" value="<?php echo set_value('username'); ?>" placeholder="Username" required autofocus autocorrect="off" autocapitalize="off" spellcheck="false">
      <input type="password" name="login_password" class="form-control-last form-control" value="<?php echo set_value('login_password'); ?>" placeholder="Password" required autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
      <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login"/>
    </form>
  </div> <!-- /container -->