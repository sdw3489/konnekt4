<?php
	session_start();
	$title="Game Board";
	require_once "../_includes/head.php";
?>
	<?php require_once "../_includes/nav.php"; ?>
	<div class="container">

		<p><img src="/images/title.png"/></p>

		<p><a href="/" class="btn btn-primary"><span class="glyphicon glyphicon-hand-left"></span> Back to Foyer</a></p>

		<div class="row">
			<div class="col-sm-4">
				<div class="panel panel-primary">
					<div class="panel-heading">Game Info</div>
					<ul class="list-group">
						<li id="youPlayer" class="list-group-item">You Are: </li>
						<li id="opponentPlayer" class="list-group-item">Opponent Is: </li>
						<li id="output2" class="list-group-item">Turn: </li>
					</ul>
				</div>
			</div>

			<div class="col-sm-8">
				<div class="panel panel-primary">
					<div class="panel-heading ">Game Board</div>
					<div class="alerts-panel">
						<div class="alert alert-danger js-turn-alert" role="alert">Not Your Turn!</div>
					</div>
					<div class="svg-container">
						<svg class="svg-content" viewBox="0 0 525 450" preserveAspectRatio="xMinYMin meet"></svg>
					</div>
				</div>
			</div>
		</div>
	</div>

  <!-- Latest compiled and minified JavaScript -->
	<script src="/js/vendor/jquery-1.11.1.min.js" type="text/javascript"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.0/js/bootstrap.min.js"></script>
	<script src="/js/Cell.js" type="text/javascript"></script>
	<script src="/js/Piece.js" type="text/javascript"></script>
	<script src="/js/gameFunctions.js" type="text/javascript"></script>
	<script src="/js/ajaxFunctions.js" type="text/javascript"></script>
	<script type="text/javascript">
		var gameId=<?php echo $_GET['gameId'] ?>;
		var player=<?php echo $_GET['player']?>;
		$(document).ready(function(){
			ajax_getInfo("/app/controllers/gameController.php",'start', gameId);
		});
	</script>
</body>
</html>