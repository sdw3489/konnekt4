  <div class="container">
    <img src="/images/title.png"/>
    <div class="row">
      <div class="col-md-6">
        <div id="users" class="panel panel-default">
          <div class="panel-heading">Users Online</div>
          <div class="panel-body">
            <ul id="usersLoggedIn">
            </ul>
          </div>
        </div>
      </div>
      <div class="col-md-6">
        <div id="chat-container" class="well well-lg">
          <div id="chat-padder" class="well well-lg">
            <div id="chat-box"></div>
          </div>
          <form id="chat-form" method="" action="" onSubmit="scrollBox(); return false">
            Chat: <input id="chat-input" value="" type="text" name="message" onChange="sendChat(this.value)"/>
          </form>
        </div>
        <div class="well" id="games-avail">No Games Currently</div>
        <div class="well" id="games-avail2">No Games Currently</div>
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