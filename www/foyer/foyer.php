  <div class="container">
    <p><img src="/images/title.png"/></p>

    <div class="row">
      <div class="col-sm-5 col-md-4 col-lg-3">
        <div class="panel panel-primary">
          <div class="panel-heading">Users Online</div>
          <ul class="list-group js-logged-in-users"></ul>
        </div>

        <div class="panel panel-primary">
          <div class="panel-heading">Stats</div>
          <ul class="list-group">
            <li class="list-group-item">Wins <span class="js-wins badge">0</span></li>
            <li class="list-group-item">Loses <span class="js-loses badge">0</span></li>
            <li class="list-group-item">Ties <span class="js-ties badge">0</span></li>
          </ul>
        </div>
      </div>

      <div class="col-sm-7 col-md-8 col-lg-9">
        <div class="row">
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">Challenges</div>
              <ul id="games-avail" class="list-group"></ul>
            </div>
            <div class="panel panel-primary">
              <div class="panel-heading">Challengers</div>
              <ul id="games-avail2" class="list-group"></ul>
            </div>

          </div>
          <div class="col-sm-12 col-lg-6">

            <div class="panel panel-primary">
              <div class="panel-heading">Chat</div>
              <div class="panel-body">
                <div class="chat-container">
                  <div class="chat-inner well well-lg">
                    <div class="chat-box js-chat"></div>
                  </div>
                  <form id="chat-form" class="" method="" action="" onSubmit="return false">
                    <div class="form-group">
                      <input id="chat-input" class="form-control" placeholder="Type Message (Hit Enter to Send)" type="text" name="message" onChange="sendChat(this.value)" />
                      <!-- <input type="submit" class="btn btn-default disabled" name="chatSubmit"/> -->
                    </div>
                  </form>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>


  <!-- Latest compiled and minified JavaScript -->
  <script src="/js/vendor/jquery-1.11.1.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
  <script type="text/javascript" src="/js/foyerFunctions.js"></script>
  <script type="text/javascript">
    var userId = <?php echo $_SESSION['user_Id']; ?>;
    $(document).ready(function(){
      init();
    });
  </script>
</body>
</html>