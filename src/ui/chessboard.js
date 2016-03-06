/**
 * Chessboard
 *
 * @author Daniel Milenkovic
 */

game.ui.Chessboard = function() {

	this.dimension = BOARD.SIZE_RECTANGLE;
	this.startX = BOARD.OFFSET_X;
	this.startY = BOARD.OFFSET_Y;

	this.draw = function(board, stage) {
		var xPos = this.startX,
			yPos = this.startY,
			firstColor = BOARD.PRIMARY_COLOR,
			secondColor = BOARD.SECONDARY_COLOR;

		for (var i = 0; i < board.length; i++) {
			var row = board[i];
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
				xPos += this.dimension;
			}
			yPos += this.dimension;
		}
	}
};
