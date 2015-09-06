/**
 * Chessboard 
 *
 * @author Daniel Milenkovic
 */


function Chessboard(x, y) {
	this.board = [];
	this.dimension = 80;
	this.startX = x;
	this.startY = y;
	 	
	// create the 8x8 chessboard with the initial setup
	this.board[0] = [1,2,3,4,5,3,2,1];
	this.board[1] = [6,6,6,6,6,6,6,6];
	this.board[2] = [0,0,0,0,0,0,0,0];
	this.board[3] = [0,0,0,0,0,0,0,0];
	this.board[4] = [0,0,0,0,0,0,0,0];
	this.board[5] = [0,0,0,0,0,0,0,0];
	this.board[6] = [7,7,7,7,7,7,7,7];
	this.board[7] = [8,9,10,11,12,10,9,8];

}
	
Chessboard.prototype.draw = function(stage, dimension) {
	var xPos = this.startX,
		yPos = this.startY,
		firstColor = "#E4E5E2",
		secondColor = "#262626";
		
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
	return { 'x': x * this.dimension, 'y': y * this.dimension };
}

Chessboard.prototype.getBoard = function() {
	return this.board;
}