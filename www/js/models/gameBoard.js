define(function(){

  var gameBoard = {
    xhtmlns : "http://www.w3.org/1999/xhtml",
    svgns : "http://www.w3.org/2000/svg",
    // BOARDX : 0,               //starting pos of board
    // BOARDY : 0,               //look above
    boardArr : [],   //2d array [row][col]
    pieceArr : [],   //2d array [player][piece] (player is either 0 or 1)
    directionArr : [
      {
        direction: ['right','left'],
        message:'Won with 4 Across.'
      },
      {
        direction: ['below'],
        message:'Won with 4 Stacked.'
      },
      {
        direction: ['aboveRight','belowLeft'],
        message:'Won with 4 Diagonal Right.'
      },
      {
        direction: ['aboveLeft','belowRight'],
        message:'Won with 4 Diagonal Left.'
      }
    ],
    BOARDWIDTH : 7,       //how many squares across
    BOARDHEIGHT : 6,     //how many squares down
    numPieces:0          //hold the number of pieces
  };

  return gameBoard;

});
