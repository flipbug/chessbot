/**
 * Chessboard
 *
 * @author Daniel Milenkovic
 */
function Chessboard(x, y) {
	this.board = [];
	this.dimension = 60;
	this.startX = x;
	this.startY = y;

	// create the 8x8 chessboard with the initial setup
	// todo: save the objects directly inside the matrix
	this.board[0] = [new Rook(0), new Knight(0), new Bishop(0), new Queen(0), new Knight(0), new Bishop(0), new Knight(0), new Rook(0)];
	this.board[1] = [new Pawn(0), new Pawn(0), new Pawn(0), new Pawn(0), new Pawn(0), new Pawn(0), new Pawn(0), new Pawn(0)];
	this.board[2] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[3] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[4] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[5] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[6] = [new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1), new Pawn(1)];
	this.board[7] = [new Rook(1), new Knight(1), new Bishop(1), new Queen(1), new Knight(1), new Bishop(1), new Knight(1), new Rook(1)];
}

Chessboard.prototype.draw = function(stage, dimension) {
	var xPos = this.startX,
		yPos = this.startY,
		firstColor = "#E5C4A0",
		secondColor = "#756452";

	this.dimension = dimension;

	for (var i = 0; i < this.board.length; i++) {
		var row = this.board[i];
		xPos = this.startX;
		for (var j = 0; j < row.length; j++) {
			var rect = new createjs.Shape();
			if ((i % 2 != 0 && j % 2 != 0) || (i % 2 == 0 && j % 2 == 0)) {
				rect.graphics.beginFill(firstColor);
			} else {
				rect.graphics.beginFill(secondColor);
			}
			rect.graphics.drawRect(xPos, yPos, this.dimension, this.dimension);
			stage.addChild(rect);
			xPos += dimension;
		}
		yPos += dimension;
	}
}

Chessboard.prototype.getPositionFromCoordinates = function(x, y) {
	return {
		'x': x * this.dimension + this.startX,
		'y': y * this.dimension + this.startY
	};
}

Chessboard.prototype.getCoordinatesFromPosition = function(x, y) {
	return {
		'x': Math.round((x - this.startX) / this.dimension),
		'y': Math.round((y - this.startY) / this.dimension)
	};
}

Chessboard.prototype.getBoard = function() {
	return this.board;
}
