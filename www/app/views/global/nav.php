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
        <ul class="nav navbar-nav">
          <li <?=($bodyClass=='dashboard')? 'class="active"': ''?>><a href="/"><span class="glyphicon glyphicon-dashboard"></span> Dashboard</a></li>
          <li <?=($bodyClass=='users')? 'class="active"': ''?>><a href="/users/"><span class="glyphicon glyphicon-user"></span> Users <span class="badge js-notifications"><?= $notifications; ?></span></a></li>
          <li <?=($bodyClass=='profile' && $user->id==$id)? 'class="active dropdown"': 'dropdown'?>>
            <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-expanded="false"><span class="glyphicon glyphicon-eye-open"></span> <?=ucfirst($_SESSION['username']);?> <span class="caret"></span></a>
            <ul class="dropdown-menu" role="menu">
              <li><a href="/user/<?=$id;?>"><span class="glyphicon glyphicon-user"></span> View Profile</a></li>
              <li><a href="/user/edit/<?=$id;?>"><span class="glyphicon glyphicon-pencil"></span> Edit Profile</a></li>
              <li class="divider"></li>
              <li><a href="/user/logout/"><span class="glyphicon glyphicon-off"></span> Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>

    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>