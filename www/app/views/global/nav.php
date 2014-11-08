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
      <ul class="nav navbar-nav">
      </ul>

      <ul class="nav navbar-nav navbar-right">
        <li class="navbar-text"><span class="glyphicon glyphicon-user"></span> Signed in as <?=ucfirst($_SESSION['username']);?></li>
        <li><a href="/user/logout/"><span class="glyphicon glyphicon-off"></span> Logout</a></li>
       <!--  <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown">Account &amp; Support <b class="caret"></b></a>
          <ul class="dropdown-menu">
            <li class="dropdown-header">Account</li>
            <li><a href="#"><span class="glyphicon glyphicon-user"></span> My Account</a></li>
            <li class="divider"></li>
            <li class="dropdown-header">Support</li>
            <li><a href="#"><span class="glyphicon glyphicon-question-sign"></span> Support</a></li>
            <li><a href="#"><span class="glyphicon glyphicon-info-sign"></span> FAQs</a></li>
            <li class="divider"></li>
            <li><a href="/app/controllers/userController.php?logout"><span class="glyphicon glyphicon-off"></span> Logout</a></li>
          </ul>
        </li> -->
      </ul>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>