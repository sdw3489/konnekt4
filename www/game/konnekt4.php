<!DOCTYPE html>
<html>
<head>
  <title>Konnekt 4</title>
	<link type="text/css" rel="stylesheet" href="/css/styles.css" />
	<script src="/js/vendor/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="/js/Cell.js" type="text/javascript"></script>
	<script src="/js/Piece.js" type="text/javascript"></script>
	<script src="/js/gameFunctions.js" type="text/javascript"></script>
	<script src="/js/ajaxFunctions.js" type="text/javascript"></script>
	<script type="text/javascript">
			var gameId=<?php echo $_GET['gameId'] ?>;
			var player="<?php echo $_GET['player']?>";
			ajax_getInfo("/app/controllers/gameController.php",'start', gameId);
	</script>
</head>
<body>
	<img src="/images/title.png"/><br/>
	Go back to the <a href="/foyer/">Foyer</a><br/>
<svg width="800px" height="525px">
	<text x="20px" y="20px" id="youPlayer">
		You are:
	</text>
	<text x="270px" y="20px" id="nyt" fill="red" display="none">
		NOT YOUR TURN!
	</text>
	<text x="270px" y="20px" id="nyp" fill="red" display="none">
		NOT YOUR PIECE!
	</text>
	<text x="520px" y="20px" id="opponentPlayer">
		Opponent is:
	</text>
	<text x="650px" y="190px" id="output2">
		piece id
	</text>
</svg>
</body>
</html>