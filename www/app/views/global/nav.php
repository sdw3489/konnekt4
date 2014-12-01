<nav class="navbar navbar-default" role="navigation">
  <div class="container">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="/">Konnekt4</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <div class="navbar-right">
        <p class="navbar-text">
          <span class="glyphicon glyphicon-user"></span> Signed in as <?=ucfirst($_SESSION['username']);?>
        </p>
        <ul class="nav navbar-nav">
          <li><a href="/user/">Users</a></li>
          <li><a href="/user/logout/"><span class="glyphicon glyphicon-off"></span> Logout</a></li>
        </ul>
      </div>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>