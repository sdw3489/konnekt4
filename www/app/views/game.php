  <div class="container">

    <p><img src="/images/title.png"/></p>

    <p><a href="/" class="btn btn-primary"><span class="glyphicon glyphicon-hand-left"></span> Back to Foyer</a></p>

    <div class="row">
      <div class="col-sm-4">
        <div class="panel panel-primary">
          <div class="panel-heading">Game Info</div>
          <ul class="list-group js-info-view"></ul>
        </div>
      </div>

      <div class="col-sm-8">
        <div class="panel panel-primary">
          <div class="panel-heading ">Game Board</div>
          <div class="alerts-panel">
            <div class="alert alert-danger js-turn-alert" role="alert">Not Your Turn!</div>
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

