  <div class="footer">
  	<div class="container">
  		<p class="text-muted">&copy; Seth Whitaker 2014</p>
  	</div>
  </div>

  <!-- Latest compiled and minified JavaScript -->
  <script src="/js/vendor/jquery-1.11.1.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>

<?php if($bodyClass === 'foyer'):?>
  <script type="text/javascript" src="/js/foyerFunctions.js"></script>
  <script type="text/javascript">
    var userId = <?php echo $_SESSION['user_Id']; ?>;
    $(document).ready(function(){
      init();
    });
  </script>
<?php endif; ?>

<?php if($bodyClass === 'game'):?>
  <script src="/js/Cell.js" type="text/javascript"></script>
  <script src="/js/Piece.js" type="text/javascript"></script>
  <script src="/js/gameFunctions.js" type="text/javascript"></script>
  <script src="/js/ajaxFunctions.js" type="text/javascript"></script>
  <script type="text/javascript">
    var gameId=<?= $gameId; ?>;
    var player=<?= $player; ?>;
    $(document).ready(function(){
      gameInit();
    });
  </script>
<?php endif; ?>
</body>
</html>