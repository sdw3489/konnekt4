  <div class="container">
    <p class="text-center"><img src="/images/title.png"/></p>
    <form class="form-signin"  id="signup_form" name="signup_form" action="/user/register/" method="POST">
      <h1>Sign Up</h1>
      <p>Already Signed up? <a href="/">Login</a></p>
      <input type="text" name="username" class="signin-name form-control" placeholder="Username" required autofocus>
      <input type="password" name="password" class="signin-password form-control" placeholder="Password" required >
      <input class="btn btn-lg btn-primary btn-block" type="submit" name="submit-register" value="Sign Up"/>
    </form>
  </div> <!-- /container -->