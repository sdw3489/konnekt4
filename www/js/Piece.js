	//////////////////////////////////////////////////////
	// Class: Piece										//
	// Description: Using the javascript prototype, you //
	// can make faux classes. This allows objects to be //
	// made which act like classes and can be referenced//
	// by the game.										//
	//////////////////////////////////////////////////////

	// Piece constructor
	// creates and initializes each Piece object
	function Piece(board,player,cellRow,cellCol,type,num){
		this.board = board;			// piece needs to know the svg board object so that it can be attached to it.
		this.player = player;		// piece needs to know what player it belongs to.
		this.type = type;			// piece needs to know what type of piece it is. (put in so it could be something besides a checker!)
		this.current_cell = boardArr[cellRow][cellCol];	// piece needs to know what its current cell/location is.
		this.number = num;			// piece needs to know what number piece it is.
		//this.isCaptured = false;	// a boolean to know whether the piece has been captured yet or not.
		this.cellRow = cellRow;
		this.cellCol = cellCol;
		//NEW
		this.checkerRow = 0;
		this.checkerCol = 0;
		this.connections = 0;
		//id looks like 'piece_0|3' - for player 0, the third piece
		this.id = "piece_" + this.player + "|" + this.number;		// the piece also needs to know what it's id is.
		this.current_cell.isOccupied(this.id);						//set THIS board cell to occupied
		this.x=this.current_cell.getCenterX();						// the piece needs to know what its x location value is.
		this.y=this.current_cell.getCenterY();						// the piece needs to know what its y location value is as well.

		this.object = eval("new " + type + "(this)");	// based on the piece type, you need to create the more specific piece object (Checker, Pawn, Rook, etc.)
		this.piece = this.object.piece;					// a shortcut to the actual svg piece object
		this.setAtt("id",this.id);						// make sure the SVG object has the correct id value (make sure it can be dragged)

		boardArr[cellRow][cellCol].occupied = Array(player,cellRow, cellCol);
		if(this.countDirection('right','left'))
		{
			alert('Konnekt 4 Won by player ' + this.player + ' with 4 across.');

		} else if(this.countDirection('below'))
		{
			alert('Konnekt 4 Won by player ' + this.player + ' with 4 on top of each other.');

		} else if(this.countDirection('aboveRight','belowLeft'))
		{
			alert('Konnekt 4 Won by player ' + this.player + ' with 4 positive diagonals.');

		} else if(this.countDirection('aboveLeft','belowRight'))
		{
			alert('Konnekt 4 Won by player ' + this.player + ' with 4 negative diagonals.');
		}
		document.getElementsByTagName('svg')[0].appendChild(this.piece);

		// return this piece object
		return this;
	}

	Piece.prototype.countDirection = function()
	{
		for(var i=0;i<arguments.length;i++)
		{
			checkerRow = this.cellRow;
			checkerCol = this.cellCol;
			this.checkDirection(arguments[i]);
		}

		if(this.connections >= 3){return true;} else{return false;}
	}


	Piece.prototype.countConnections = function(direction)
	{
		var checkedCell = boardArr[checkerRow][checkerCol];
		if(checkedCell.occupied != null){
			var checkedCellArr = checkedCell.occupied;
			if(checkedCellArr[0] == this.player){
				this.connections++;
				this.checkDirection(direction);
			}
		}
	}


	Piece.prototype.checkDirection = function(direction)
	{
		switch(direction)
		{
		case 'below':
			if(checkerRow >= BOARDHEIGHT-1) return;
			checkerRow++;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'right':
			if(checkerCol >= BOARDWIDTH-1) return;
			checkerCol++;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'left':
			if(checkerCol === 0) return;
			checkerCol--;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'aboveRight':
			if(checkerCol >= BOARDWIDTH-1 || checkerRow === 0) return;
			checkerRow--;
			checkerCol++;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'aboveLeft':
			if(checkerCol === 0 || checkerRow === 0) return;
			checkerRow--;
			checkerCol--;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'belowRight':
			if(checkerRow >= BOARDHEIGHT-1 || checkerCol >= BOARDWIDTH-1) return;
			checkerRow++;
			checkerCol++;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		case 'belowLeft':
			if(checkerRow >= BOARDHEIGHT-1 || checkerCol === 0) return;
			checkerRow++;
			checkerCol--;
			if (typeof boardArr[checkerRow][checkerCol] != "undefined")
			{
				this.countConnections(direction);
			}
			break;
		default:
			break;
		}
	}

	// function that allows a quick setting of an attribute of the specific piece object
	Piece.prototype.setAtt = function(att,val) {
		this.piece.setAttributeNS(null,att,val);
	}

	//when called, will remove the piece from the document and then re-append it (put it on top!)
	Piece.prototype.putOnTop = function(){
		document.getElementsByTagName('svg')[0].removeChild(this.piece);
		document.getElementsByTagName('svg')[0].appendChild(this.piece);
	}

	// Checker constructor
	function Checker(parent) {
		this.parent = parent;		//I can now inherit from Piece class												// each Checker should know its parent piece object
		this.isKing = false;														// each Checker should know if its a 'King' or not (not a king on init)
		this.piece = document.createElementNS("http://www.w3.org/2000/svg","g");	// each Checker should have an SVG group to store its svg checker in
		if(this.parent.player == playerId){
			this.piece.setAttributeNS(null,"style","cursor: pointer;");						// change the cursor
		}
		this.piece.setAttributeNS(null,"transform","translate("+this.parent.x+","+this.parent.y+")");

		// create the svg 'checker' piece.
		var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
		circ.setAttributeNS(null,"r",'30');
		circ.setAttributeNS(null,"class",'player' + this.parent.player);					// change the color according to player
		this.piece.appendChild(circ);												// add the svg 'checker' to svg group
		//create more circles to prove I'm moving the group (and to make it purty)
		var circ = document.createElementNS("http://www.w3.org/2000/svg","circle");
		circ.setAttributeNS(null,"r",'25');
		circ.setAttributeNS(null,"fill",'white');
		circ.setAttributeNS(null,"opacity",'0.1');
		this.piece.appendChild(circ);


		// return this object to be stored in a variable
		return this;
	}