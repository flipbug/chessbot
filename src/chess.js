/**
 * Chess 
 *
 * Containes the main logic of the game
 *
 * @author Daniel Milenkovic
 */
 
 function Chess(canvas, dimension) {
 		
	 this.context = canvas.getContext("2d");
	 this.dimension = dimension;
	 
	 // init easel.js
	 this.stage = new createjs.Stage(canvas);
	 this.stage.enableMouseOver();
 }
 
 Chess.prototype.start = function() {
	 this.chessboard = new Chessboard(20, 0);
	 this.chessboard.draw(this.stage, this.dimension);
	 this.initFigurePlacement();
	 this.update();
 }

 
 Chess.prototype.update = function() {
	 this.stage.update();
 }

 Chess.prototype.initFigurePlacement = function() {
	 var board = this.chessboard.getBoard();
	 for (var i = 0; i < board.length; i++) {
	 	var row = board[i];
		for (var j = 0; j < row.length; j++) {
			// get figure and draw it
			var pos = this.chessboard.getPositionFromCoordinates(j, i);
			var figure = this.getFigureByNumber(row[j]);
			if (figure) {
				figure.draw(pos, this.stage);
			}
		}
	 }
 }
 
 Chess.prototype.getFigureByNumber = function(number) {
  	switch (number) {
		case 1:
			return new Rook(0);
		case 2:
			return new Knight(0);
		case 3:
			return new Bishop(0);
		case 4:
			return new Queen(0);
		case 5:
			return new King(0);
		case 6:
			return new Pawn(0);
		case 7:
			return new Pawn(1);
		case 8:
			return new Rook(1);
		case 9:
			return new Knight(1);
		case 10:
			return new Bishop(1);
		case 11:
			return new Queen(1);
		case 12:
			return new King(1);
	}
	return false;
 }
