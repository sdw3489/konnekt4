  <div class="container">

    <h1><img src="/images/title.png"/></h1>

    <div class="row">
      <div class="col-sm-5 col-md-4 col-lg-3">
        <div class="panel panel-primary">
          <div class="panel-heading">Users Online</div>
          <ul class="list-group js-logged-in-users"></ul>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">Stats</div>
          <ul class="list-group">
            <li class="list-group-item">Wins <span class="js-wins badge"><?= $stats->wins; ?></span></li>
            <li class="list-group-item">Losses <span class="js-loses badge"><?= $stats->losses; ?></span></li>
            <li class="list-group-item">Ties <span class="js-ties badge"><?= $stats->ties; ?></span></li>
          </ul>
        </div>
      </div>

      <div class="col-sm-7 col-md-8 col-lg-9">
        <div class="row">
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">Challenges</div>
              <ul class="challenges-view list-group"></ul>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Challengers</div>
              <ul class="challengers-view list-group"></ul>
            </div>

          </div>
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">Chat</div>
              <div class="panel-body">
                <div class="chat-container"></div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>


