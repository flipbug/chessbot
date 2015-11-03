/**
 * "Static" functions for different validations
 *
 * @author Daniel Milenkovic
 */
var Validator = {};

Validator.checkMove = function(newPos, piece, board) {
	// check if piece was actually moved
	var oldPos = piece.position;
	if (newPos.x == oldPos.x && newPos.y == oldPos.y) {
		return false;
	}

	// check if move is inside the board
	if (newPos.x >= board.length || newPos.x < 0 || newPos.y >= board.length || newPos.y < 0) {
		return false;
	}

	// check if move was valid
	if (!piece.validateMove(newPos, board)) {
		return false;
	}

	// if place is already occupied
	var target = board[newPos.y][newPos.x];
	if (target instanceof Piece) {
		// check if place is occupied by an ally
		if (piece.side === target.side) {
			return false
		}
	}

	return true;
};

Validator.isJumping = function(newPos, oldPos, board) {
	var xOperator = oldPos.x < newPos.x ? 1 : -1,
		yOperator = oldPos.y < newPos.y ? 1 : -1,

		diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),

		currentY = oldPos.y,
		currentX = oldPos.x,

		diagonal = false;

	if (diffX == diffY) {
		diagonal = true;
	}

	if (diffX > 0) {
		// check for obstacles horizontal and diagonal
		for (var i = oldPos.x + xOperator;
			(i < newPos.x && xOperator > 0) ||
			(i > newPos.x && xOperator < 0); i += xOperator) {

			currentY += yOperator;
			if (diagonal && board[currentY][i] instanceof Piece) {
				return true;
			} else if (!diagonal && board[oldPos.y][i] instanceof Piece) {
				return true;
			}
		}
	} else {
		// check for obstacles vertical and diagonal
		for (var i = oldPos.y + yOperator;
			(i < newPos.y && yOperator > 0) ||
			(i > newPos.y && yOperator < 0); i += yOperator) {

			currentX += xOperator;
			if (diagonal && board[i][currentX] instanceof Piece) {
				return true;
			} else if (!diagonal && board[i][oldPos.x] instanceof Piece) {
				return true;
			}
		}
	}

	return false;
};
