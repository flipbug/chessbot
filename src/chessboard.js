/**
 * Chessboard
 *
 * @author Daniel Milenkovic
 */
function Chessboard() {
	this.board = [];
	this.dimension = BOARD.SIZE_RECTANGLE;
	this.startX = BOARD.OFFSET_X;
	this.startY = BOARD.OFFSET_Y;

	// create the 8x8 chessboard with the initial setup
	this.board[0] = [
		new Rook(0),
		new Knight(0),
		new Bishop(0),
		new Queen(0),
		new King(0),
		new Bishop(0),
		new Knight(0),
		new Rook(0)
	];
	this.board[1] = [
		new Pawn(0),
		new Pawn(0),
		new Pawn(0),
		new Pawn(0),
		new Pawn(0),
		new Pawn(0),
		new Pawn(0),
		new Pawn(0)
	];
	this.board[2] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[3] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[4] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[5] = [0, 0, 0, 0, 0, 0, 0, 0];
	this.board[6] = [
		new Pawn(1),
		new Pawn(1),
		new Pawn(1),
		new Pawn(1),
		new Pawn(1),
		new Pawn(1),
		new Pawn(1),
		new Pawn(1)
	];
	this.board[7] = [
		new Rook(1),
		new Knight(1),
		new Bishop(1),
		new Queen(1),
		new King(1),
		new Bishop(1),
		new Knight(1),
		new Rook(1)
	];
}

Chessboard.prototype.draw = function(stage) {
	var xPos = this.startX,
		yPos = this.startY,
		firstColor = BOARD.PRIMARY_COLOR,
		secondColor = BOARD.SECONDARY_COLOR;

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
			xPos += this.dimension;
		}
		yPos += this.dimension;
	}
};

Chessboard.prototype.initPieces = function(stage) {
	var pieces = [[],[]];
	for (var i = 0; i < this.board.length; i++) {
		var row = this.board[i];
		for (var j = 0; j < row.length; j++) {
			var piece = this.board[i][j];
			if (piece instanceof Piece) {
				piece.init(new Vector(j,i), stage);
				pieces[piece.side].push(piece);
			}
		}
	}
	return pieces;
};

Chessboard.prototype.updateBoard = function(newPos, piece) {
	this.board[piece.position.y][piece.position.x] = 0;
	this.board[newPos.y][newPos.x] = piece;
};

Chessboard.prototype.isPieceOnPosition = function(pos) {
	var target = this.board[pos.y][pos.x];
	if (target instanceof Piece) {
		return true;
	}
	return false;
};

Chessboard.prototype.getPieceFromPosition = function(pos) {
	return this.board[pos.y][pos.x];
};
