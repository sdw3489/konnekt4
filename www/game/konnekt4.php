<!DOCTYPE html>
<html>
<head>
  <title>Konnekt 4</title>
	<link type="text/css" rel="stylesheet" href="../styles.css" />
	<style type="text/css">
	  <![CDATA[
		.background0 { fill: #966; stroke: black; stroke-width: 2px; }
		.background1 { fill: #696; stroke: black; stroke-width: 2px; }
		.player0   {fill: #DD0000; stroke: #DD0000; stroke-width: 1px; }
		.player1 {fill: black; stroke: black; stroke-width: 1px; }
		.htmlBlock {position:absolute;top:200px;left:300px;width:200px;height:100px;background:#ffc;padding:10px;display:none;}
		body{padding:0px;margin:0px;}
		.cell_white{fill:yellow;stroke-width:2px;stroke:yellow;}
		.cell_black{fill:yellow;stroke-width:2px;stroke:yellow;}
		.cell_alert{fill:yellow;stroke-width:2px;stroke:yellow;}
		.name_black{fill:black;font-size:18px}
		.name_orange{fill:orange;font-size:24px;}
	  ]]>
	</style>
	<script type="text/javascript" src="js/jquery.js"></script>
	<script src="js/Objects/Cell.js" type="text/javascript"></script>
	<script src="js/Objects/Piece.js" type="text/javascript"></script>
	<script src="js/gameFunctions.js" type="text/javascript"></script>
	<script src="js/ajax/ajaxFunctions.js" type="text/javascript"></script>
	<script type="text/javascript">
			var gameId=<?php echo $_GET['gameId'] ?>;
			var player="<?php  echo $_GET['player']?>";
			ajax_getInfo("/konnekt4/gameController.php",'start', gameId);
	</script>
</head>
<body>
	<img src="../images/title.png"/><br/>
	Go back to the <a href="../foyer.php">Foyer</a><br/>
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