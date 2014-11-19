  <div class="footer">
  	<div class="container">
  		<p class="text-muted">&copy; Seth Whitaker 2014</p>
  	</div>
  </div>

  <!-- Scripts -->
  <script type="text/javascript" src="/js/plugins.js"></script>
  <script src="/js/libs/modernizr-2.8.3-respond-1.1.0.min.js"></script>
  <script type="text/javascript">
    var require = {
      config: {
        'views/baseView':{
          page: "<?= $bodyClass; ?>"
        },
        'fv/foyerView': {},
        'gv/gameView': <?= (isset($gameData))? "$gameData" : "null"; ?>
      }
    };
  </script>
  <script data-main="/js/main" src="/js/libs/require.js"></script>
</body>
</html>