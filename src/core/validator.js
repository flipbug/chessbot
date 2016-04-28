/**
 * Rule validator
 *
 * @author Daniel Milenkovic
 */
game.core.validator = {

	isValidMove: function(start, target, turn, board) {
		var isValid = false;
		var piece = board[start.y][start.x];
		var targetPiece = board[target.y][target.x];
		var diffX = Math.abs(start.x - target.x),
			diffY = Math.abs(start.y - target.y);

		// don't eat yourself
		if (diffX == 0 && diffY == 0) {
			return false;
		}

		// no friendly fire
		if (targetPiece > 0 && ((piece < 10 && targetPiece < 10 ) || (piece > 10 && targetPiece > 10))) {
			return false;
		}

		var pos = {
			'diffX': diffX,
			'diffY': diffY,
			'start': start,
			'target': target
		};

		switch (piece) {
			case 1:
			case 11:
				isValid = game.core.validator.isValidPawnMove(pos, board, turn);
				break;
			case 2:
			case 12:
				isValid = game.core.validator.isValidRookMove(pos, board, turn);
				break;
			case 3:
			case 13:
				isValid = game.core.validator.isValidKnightMove(pos, board, turn);
				break;
			case 4:
			case 14:
				isValid = game.core.validator.isValidBishopMove(pos, board, turn);
				break;
			case 5:
			case 15:
				isValid = game.core.validator.isValidQueenMove(pos, board, turn);
				break;
			case 6:
			case 16:
				isValid = game.core.validator.isValidKingMove(pos, board, turn);
				break;
		}
		return isValid;
	},

	isValidPawnMove: function(pos, board, turn) {
		var isValid = false;

		if ((turn === 0 && pos.start.y < pos.target.y) ||
			(turn === 1 && pos.start.y > pos.target.y)) {

			// only forward if no one in front
			if (pos.diffX === 0 && board[pos.target.y][pos.target.x] === 0) {
				// only one step at a time
				if (pos.diffY == 1) {
					isValid = true;
					// two steps if never been moved before
				}/* else if (pos.diffY == 2 && this.moved == false) {
					valid = true
				}*/
			} else if (pos.diffX == 1 && pos.diffY == 1 && board[pos.target.y][pos.target.x] > 0) {
				// diagonal if there is an enemy
				isValid = true;
			}
		}
		return isValid;
	},

	isValidRookMove: function(pos, board, turn) {
		var valid = false;

		// only one axis at a time
		if (pos.diffX === 0 || pos.diffY === 0) {
			// prevent jumping
			if (!game.core.validator.isJumping(pos, board)) {
				valid = true;
			}
		}

		return valid;
	},

	isValidKnightMove: function(pos, board, turn) {
		var valid = false;

		// 2x1 jump pattern
		if ((pos.diffX == 2 && pos.diffY == 1) || (pos.diffX == 1 && pos.diffY == 2)) {
			valid = true;
		}

		return valid;
	},

	isValidBishopMove: function(pos, board, turn) {
		var	valid = false;

		// diagonal move pattern
		if (pos.diffX == pos.diffY) {
			// prevent jumping
			if (!game.core.validator.isJumping(pos, board)) {
				valid = true;
			}
		}

		return valid;
	},

	isValidQueenMove: function(pos, board, turn) {
		var valid = false;

		// diagonal or straight move pattern
		if (pos.diffX == pos.diffY || pos.diffX === 0 || pos.diffY === 0) {
			// prevent jumping
			if (!game.core.validator.isJumping(pos, board)) {
				valid = true;
			}
		}

		return valid;
	},

	isValidKingMove: function(pos, board, turn) {
		var	valid = false;

		// diagonal or straight move pattern
		if (pos.diffX == pos.diffY || pos.diffX === 0 || pos.diffY === 0) {
			// only one step at a time
			if (pos.diffX <= 1 && pos.diffY <= 1) {
				valid = true;
			}
		}

		return valid;
	},

	isJumping: function(pos, board) {
		var xOperator = pos.start.x < pos.target.x ? 1 : -1,
			yOperator = pos.start.y < pos.target.y ? 1 : -1,

			currentY = pos.start.y,
			currentX = pos.start.x,

			diagonal = false;

		if (pos.diffX == pos.diffY) {
			diagonal = true;
		}

		if (pos.diffX > 0) {
			// check for obstacles horizontal and diagonal
			for (var i = pos.start.x + xOperator;
				(i < pos.target.x && xOperator > 0) ||
				(i > pos.target.x && xOperator < 0); i += xOperator) {

				currentY += yOperator;
				if (diagonal && board[currentY][i] > 0) {
					return true;
				} else if (!diagonal && board[pos.start.y][i] > 0) {
					return true;
				}
			}
		} else {
			// check for obstacles vertical and diagonal
			for (var i = pos.start.y + yOperator;
				(i < pos.target.y && yOperator > 0) ||
				(i > pos.target.y && yOperator < 0); i += yOperator) {

				currentX += xOperator;
				if (diagonal && board[i][currentX] > 0) {
					return true;
				} else if (!diagonal && board[i][pos.start.x] > 0) {
					return true;
				}
			}
		}

		return false;
	}
};
