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
	 this.chessboard = new Chessboard(0, 0);
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
			var pos = this.chessboard.getPositionFromCoordinates(j, i);
			if (row[j] == 6) {
				var pawn = new Pawn(0);
				pawn.draw(pos, this.stage);
			}
		}
	 }

 }
