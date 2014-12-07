<div class="container">
  <div class="page-header">
    <h1>Edit Profile</h1>
  </div>

  <div class="row">
    <!-- left column -->
    <div class="col-sm-3">
     <h2 class="text-capitalize text-center"><?= $user->username;?></h2>
      <div class="text-center">
        <img src="/images/user-placeholder.png" class="avatar img-circle" alt="avatar" width="256">
        <!-- <input type="file" class="form-control"> -->
      </div>
    </div>

    <!-- edit form column -->
    <div class="col-sm-9 personal-info">
      <div class="panel panel-primary">
        <div class="panel-heading">
          <h3 class="panel-title">User Info</h3>
        </div>
        <div class="panel-body">
          <form class="form-horizontal" role="form" action="/user/edit/<?=$id;?>" method="post">
            <?php if((isset($query) && $query == 1) || validation_errors()): ?>
            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-8">
                <?= validation_errors('<p class="text-danger">', '</p>'); ?>
                <?php if(isset($query) && $query == 1): ?>
                <p class="text-success">Update Successful</p>
                <?php endif; ?>
              </div>
            </div>
            <?php endif; ?>
            <div class="form-group">
              <label class="col-sm-3 control-label">Username:</label>
              <div class="col-sm-8">
                <p class="form-control-static"><?= $user->username;?></p>
                <!-- <input class="form-control" type="text" name="username" value="<?= $user->username;?>"> -->
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">First name:</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" name="first_name" value="<?= set_value('first_name', $user->first_name); ?>">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Last name:</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" name="last_name" value="<?= set_value('last_name', $user->last_name); ?>">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Email:</label>
              <div class="col-sm-8">
                <input class="form-control" type="text" name="email" value="<?=set_value('email', $user->email);?>">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">New Password:</label>
              <div class="col-sm-8">
                <input class="form-control" type="password" name="password" value="<?= set_value('password'); ?>">
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 control-label">Confirm password:</label>
              <div class="col-sm-8">
                <input class="form-control" type="password" name="confirm_password" value="<?= set_value('confirm_password'); ?>">
              </div>
            </div>
          <!--   <div class="form-group">
              <div class="col-sm-offset-3 col-sm-9">
                <div class="checkbox">
                  <label>
                    <input type="checkbox" name="is_private" value="1" <?= ($user->is_private)?'checked=checked':'';?>> Set Profile Private
                  </label>
                </div>
              </div>
            </div> -->
            <div class="form-group">
              <label class="col-sm-3 control-label"></label>
              <div class="col-sm-8">
                <input type="submit" class="btn btn-primary" value="Save Changes">
                <span></span>
                <a href="/user/<?=$id;?>" class="btn btn-default">Cancel</a>
                <input type="reset" class="btn btn-default pull-right" value="Reset">
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>