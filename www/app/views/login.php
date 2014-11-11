  <div class="container">
    <p class="text-center"><img src="/images/title.png"/></p>
    <form class="form-signin" id="login_form" name="login_form" method="POST" action="/user/login/" role="form">
      <h1>Login</h1>
      <p>New User? - <a href="/signup/">Sign Up</a></p>
      <input type="text" name="name" class="signin-name form-control" placeholder="Username" value="" required autofocus>
      <input type="password" class="signin-password form-control" placeholder="Password" required name="password">
      <input class="btn btn-lg btn-primary btn-block" type="submit" value="Login"/>
    </form>
  </div> <!-- /container -->