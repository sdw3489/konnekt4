  <div class="container">
    <p><img src="/images/title.png"/></p>
    <div class="row">
      <div class="col-md-3">

        <div class="panel panel-default">
          <div class="panel-heading">Users Online</div>
          <div class="panel-body js-logged-in-users"></div>
        </div>

      </div>
      <div class="col-md-9">
        <div class="row">
          <div class="col-md-6">
            <div class="panel panel-default">
              <div class="panel-heading">Challenges</div>
              <div  id="games-avail" class="panel-body">
                No Games Currently
              </div>
            </div>

          </div>
          <div class="col-md-6">

            <div class="panel panel-default">
              <div class="panel-heading">Challengers</div>
              <div  id="games-avail2" class="panel-body">
                No Games Currently
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-3">
        <div class="panel panel-default">
          <div class="panel-heading">Stats</div>
          <div class="panel-body">
            <ul class="list-group">
              <li class="list-group-item">Wins <span class="js-wins badge">34</span></li>
              <li class="list-group-item">Loses <span class="js-loses badge">10</span></li>
              <li class="list-group-item">Ties <span class="js-ties badge">4</span></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-9">

        <div class="panel panel-default">
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