var xhtmlns = "http://www.w3.org/1999/xhtml";
var svgns = "http://www.w3.org/2000/svg";
var BOARDX = 50;				//starting pos of board
var BOARDY = 50;				//look above
var boardArr = new Array();		//2d array [row][col]
var pieceArr = new Array();		//2d array [player][piece] (player is either 0 or 1)
var BOARDWIDTH = 7;				//how many squares across
var BOARDHEIGHT = 6;			//how many squares down
//the problem of dragging....
var myX;						//hold my last pos.
var myY;						//hold my last pos.
var mover='';					//hold the id of the thing I'm moving

function gameInit(){

	//create a parent to stick board in...
	var gEle=document.createElementNS(svgns,'g');

	gEle.setAttributeNS(null,'transform','translate('+BOARDX+','+BOARDY+')');

	gEle.setAttributeNS(null,"id","game_1");

	gEle.setAttributeNS(null,'stroke','blue');
	//stick g on board

	document.getElementsByTagName('svg')[0].insertBefore(gEle,document.getElementsByTagName('svg')[0].childNodes[4]);

	//create the board...
	for(i=0;i<BOARDHEIGHT;i++){//rows i
		boardArr[i]=new Array();
		for(j=0;j<BOARDWIDTH;j++){//cols j
			boardArr[i][j]=new Cell(document.getElementById("game_1"),'cell_'+j+i,75,j,i);
		}
	}

	//put the player in the text
	document.getElementById('youPlayer').firstChild.data+=player;
	document.getElementById('opponentPlayer').firstChild.data+=player2;
	ajax_checkTurn('/app/controllers/gameController.php','checkTurn',gameId);

}

//************************ NEW FUNCTION ***********************/
function placePiece(col)
{
	//checks from the bottom of the board up.
	for(var i=boardArr.length-1; i >= 0; i--)
	{
		//get the target cell based on the col passed into the function and the i variable which counts bottom up
		var targetSpot = boardArr[i][col];
		//if the target drop spot cell is not already occupied
		if(targetSpot.occupied == "")
		{
			//if its the current players turn add a new piece at the target spot
			if(playerId == turn){
				var piece = new Piece('game_'+gameId,playerId,i,col,'Checker',1);
				ajax_changeBoard('/app/controllers/gameController.php',targetSpot.id,i,col,'changeBoard',gameId);
				changeTurn();
			}else{// if its not your turn throw a not your turn error at the top of the game board
				var hit=false;
				nytwarning();
			}
			break;
		}
	}
}


///////////////////////////////Utilities////////////////////////////////////////
////get Piece/////
//	get the piece (object) from the id and return it...
////////////////
function getPiece(which){
	return pieceArr[parseInt(which.substr((which.search(/\_/)+1),1))][parseInt(which.substring((which.search(/\|/)+1),which.length))];
}

////get Transform/////
//	look at the id of the piece sent in and work on it's transform
////////////////
function getTransform(which){
	var hold=document.getElementById(which).getAttributeNS(null,'transform');
	var retVal=new Array();
	retVal[0]=hold.substring((hold.search(/\(/) + 1),hold.search(/,/));			//x value
	retVal[1]=hold.substring((hold.search(/,/) + 1),hold.search(/\)/));;		//y value
	return retVal;
}

////set Transform/////
//	look at the id, x, y of the piece sent in and set it's translate
////////////////
function setTransform(which,x,y){
	document.getElementById(which).setAttributeNS(null,'transform','translate('+x+','+y+')');
}

////change turn////
//	change who's turn it is
//////////////////
function changeTurn(){
	//locally, for the name color
	if(turn == 0){
		turn=1;
	}else{
		turn=0;
	}
	//how about for the server (and other player)?
	//send JSON message to server, have both clients monitor server to know who's turn it is...
	document.getElementById('output2').firstChild.data='playerId '+playerId+ ' turn '+turn;
	ajax_changeServerTurn('/app/controllers/gameController.php','changeTurn',gameId);
}

/////////////////////////////////Messages to user/////////////////////////////////
////nytwarning (not your turn)/////
//	tell player it isn't his turn!
////////////////
function nytwarning(){
	if(document.getElementById('nyt').getAttributeNS(null,'display') == 'none'){
		document.getElementById('nyt').setAttributeNS(null,'display','inline');
		setTimeout('nytwarning()',2000);
	}else{
		document.getElementById('nyt').setAttributeNS(null,'display','none');
	}
}

////nypwarning (not your piece)/////
//	tell player it isn't his piece!
////////////////
function nypwarning(){
	if(document.getElementById('nyp').getAttributeNS(null,'display') == 'none'){
		document.getElementById('nyp').setAttributeNS(null,'display','inline');
		setTimeout('nypwarning()',2000);
	}else{
		document.getElementById('nyp').setAttributeNS(null,'display','none');
	}
}