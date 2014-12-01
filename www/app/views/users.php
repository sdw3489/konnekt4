  <div class="container">

    <h1><img src="/images/title.png"/></h1>

    <p><a href="/" class="btn btn-primary"><span class="glyphicon glyphicon-hand-left"></span> Back to Foyer</a></p>

    <div class="panel panel-primary">
      <div class="panel-heading">
        <h3 class="panel-title">Users</h3>
      </div>
      <table class="table table-hover">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
            <th>Online</th>
            <th>Wins</th>
            <th>Losses</th>
            <th>Ties</th>
            <th>Game Actions</th>
            <th><span class="pull-right">User Actions</span></th>
          </tr>
        </thead>

          <?php foreach($users as $user): ?>
            <?php
              $isCurrent = ($user->id == $id)? true:false;
              $isConnection = false;
              $which = null;
              $status = null;
              $initiator = false;
              $i=0;
              if(!$isCurrent){
                foreach($user->connections as $connection) {
                  if($connection->user_id == $id || $connection->connection_id == $id) {
                    $which = $i;
                    $isConnection = true;
                    $status = $connection->status;
                    $initiator = ($connection->initiator_id == $id)? true:false;
                    break;
                  }
                  $i++;
                }
              }
            ?>
            <tr class="<?=($id == $user->id)? 'active':'';?> <?=($isConnection && $status == 'connected')? 'info':'';?> <?=($isConnection && $status == 'declined' && $initiator == true)? 'danger':'';?>">
              <td><?= $user->id; ?></td>
              <td><?= $user->first_name; ?></td>
              <td><?= $user->last_name; ?></td>
              <td><a href="http://konnekt4.devs/user/<?= $user->id; ?>"><?= $user->username; ?></a></td>
              <td><?= ($user->logged_in == 1)? '<span class="text-primary glyphicon glyphicon-eye-open"></span>' : '<span class="text-muted glyphicon glyphicon-eye-close"></span>';?></td>
              <td><?= $user->wins; ?></td>
              <td><?= $user->losses; ?></td>
              <td><?= $user->ties; ?></td>
              <td>
                <?php if($isConnection && $status == 'connected'):?>
                  <button data-id="<?= $user->id; ?>" class="js-challenge btn btn-primary btn-xs" data-loading-text="Please Wait..." autocomplete="off"><span class="glyphicon glyphicon-tower"></span> Challenge</button>
                <?php elseif($isConnection && $status == 'sent'): ?>
                <?php elseif($isConnection && $status == 'declined'): ?>
                <?php else: ?>
                <?php endif; ?>
              </td>
              <td>
                <div class="btn-group pull-right" role="group" aria-label="">
                <?php if($isConnection && $status == 'connected'):?>
                  <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Remove</button>
                <?php elseif($isConnection && $status == 'sent' && $initiator == true): ?>
                  <button class="btn btn-primary btn-xs" disabled="disabled">Invite Sent</button>
                <?php elseif($isConnection && $status == 'sent' && $initiator == false): ?>
                  <button class="btn btn-success btn-xs"><span class="glyphicon glyphicon-ok"></span> Accept</button>
                  <button class="btn btn-danger btn-xs"><span class="glyphicon glyphicon-remove"></span> Decline</button>
                <?php elseif($isConnection && $status == 'declined' && $initiator == true): ?>
                  <button class="btn btn-danger btn-xs" disabled="disabled">Declined</button>
                <?php elseif($isConnection && $status == 'declined' && $initiator == false): ?>
                  <button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus"></span> Connect</button>
                <?php else: ?>
                  <button class="btn btn-primary btn-xs"><span class="glyphicon glyphicon-plus"></span> Connect</button>
                <?php endif; ?>
                </div>
              </td>
            </tr>
          <?php endforeach; ?>

        </tbody>
      </table>

    </div>
  </div>