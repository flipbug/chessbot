// Chessboard.js

function Chessboard() {
	this.board = [];
	 	
	// create the 8x8 chessboard
	for (var i = 0; i < 8; i++) {
		this.board[i] = Array.apply(null, Array(8)).map(Number.prototype.valueOf,0);
	}
}
	
Chessboard.prototype.draw = function(ctx, dimension) {
	var yPos = 0,
		xPos = 0,
		firstColor = "#262626",
		secondColor = "#E4E5E2";
	
	for (var i = 0; i < this.board.length; i++) {
		var row = this.board[i];
		xPos = 0;
		for (var j = 0; j < row.length; j++) {
			if ((i % 2 != 0 && j % 2 != 0) || (i % 2 == 0 && j % 2 == 0)) {
				ctx.fillStyle = firstColor;
			} else {
				ctx.fillStyle = secondColor;
			}
			ctx.fillRect(xPos, yPos, dimension, dimension);
			xPos += dimension;
		}
		yPos += dimension;
	}
}