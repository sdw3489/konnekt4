  <div class="footer">
  	<div class="container">
  		<p class="text-muted">&copy; Seth Whitaker 2014</p>
  	</div>
  </div>

  <!-- Scripts -->
  <script type="text/javascript" src="/js/plugins.js"></script>
  <script src="/js/libs/modernizr-2.8.3-respond-1.1.0.min.js"></script>
  <script data-main="/js/main" src="/js/libs/require.js"></script>

<?php if($bodyClass === 'foyer'):?>
   <!-- <script type="text/javascript" src="/js/foyerFunctions.js"></script> -->
  <script type="text/javascript">
    var userId = <?php echo $_SESSION['user_Id']; ?>;
    // $(document).ready(function(){
      // init();
    // });
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
    // $(document).ready(function(){
      // gameInit();
    // });
  </script>
<?php endif; ?>
</body>
</html>