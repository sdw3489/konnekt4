<div class="container">
  <div class="page-header">
    <h1>Profile</h1>
  </div>

  <div class="row">
    <div class="col-sm-3">
      <h2 class="text-capitalize text-center"><?= $user->username;?></h2>
      <div class="text-center">
        <img src="/images/user-placeholder.png" class="avatar img-circle" alt="avatar" width="256">
      </div>
    </div>
        <!-- left column -->
    <div class="col-sm-9 personal-info">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">User Info</h3>
        </div>
        <div class="panel-body">
        <!-- edit form column -->
          <form class="form-horizontal" role="form">
            <div class="form-group">
              <label class="col-sm-3 control-label">Username:</label>
              <div class="col-sm-8">
                <p class="form-control-static"><?= $user->username;?></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">First name:</label>
              <div class="col-sm-8">
                 <p class="form-control-static"><?= $user->first_name;?></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Last name:</label>
              <div class="col-sm-8">
                 <p class="form-control-static"><?= $user->last_name;?></p>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Email:</label>
              <div class="col-sm-8">
                 <p class="form-control-static"><?= $user->email;?></p>
              </div>
            </div>
            <?php if($id == $user->id): ?>
            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-8">
                <a href="/user/edit/<?=$id;?>" class="btn btn-primary">Edit Info</a>
              </div>
            </div>
            <?php endif; ?>
          </form>
        </div>
      </div>
    </div>

  </div><!-- end .row -->
</div><!-- end .container -->