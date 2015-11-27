  <div class="container">

    <h1><img src="/images/title.png"/></h1>

    <div class="row">
      <div class="col-sm-5 col-md-4 col-lg-3">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><span class="glyphicon glyphicon-user"></span> User Connections</h3>
          </div>
          <ul class="list-group js-user-connections"></ul>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><span class="glyphicon glyphicon-stats"></span> Stats</h3>
          </div>
          <ul class="list-group">
            <li class="list-group-item">Wins <span class="js-wins badge"><?= $stats['wins']; ?></span></li>
            <li class="list-group-item">Losses <span class="js-loses badge"><?= $stats['losses']; ?></span></li>
            <li class="list-group-item">Ties <span class="js-ties badge"><?= $stats['ties']; ?></span></li>
          </ul>
        </div>
      </div>

      <div class="col-sm-7 col-md-8 col-lg-9">
        <div class="row">
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title"><span class="glyphicon glyphicon-tower"></span> Challenges</h3>
              </div>
              <ul class="challenges-view list-group"></ul>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title"><span class="glyphicon glyphicon-tower"></span> Challengers</h3>
              </div>
              <ul class="challengers-view list-group"></ul>
            </div>

          </div>
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">
                <h3 class="panel-title"><span class="glyphicon glyphicon-comment"></span> Chat</h3>
              </div>
              <div class="panel-body">
                <div class="chat-container"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>


