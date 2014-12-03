  <div class="container">

    <h1><img src="/images/title.png"/></h1>

    <p><a href="/" class="btn btn-primary"><span class="glyphicon glyphicon-hand-left"></span> Back to Foyer</a></p>

    <div class="row">
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading">
            <h3 class="panel-title"><span class="glyphicon glyphicon-info-sign"></span> Game Info</h3>
          </div>
          <ul class="list-group js-info-view"></ul>
        </div>
      </div>

      <div class="col-sm-8">
        <div class="panel panel-primary">
          <div class="panel-heading ">
            <h3 class="panel-title"><span class="glyphicon glyphicon-tower"></span> Game Board</h3>
          </div>
          <div class="alerts-panel">
            <div class="alert alert-danger js-turn-alert" role="alert">Not Your Turn!</div>
            <div class="alert alert-danger js-game-alert" role="alert">The Game is Over</div>
          </div>
          <div class="svg-container">
            <svg class="js-game-svg svg-content" viewBox="0 0 525 450" preserveAspectRatio="xMinYMin meet"></svg>
          </div>
        </div>
      </div>
    </div>
  </div>


  <div class="modal fade js-game-end-modal" data-backdrop="static" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">
        <div class="modal-header">
          <h2 class="modal-title">Game Over</h2>
        </div>
        <div class="modal-body js-game-end-msg"></div>
        <div class="modal-footer">
          <a href="/" class="btn btn-primary">End Game</a>
        </div>
      </div>
    </div>
  </div>

