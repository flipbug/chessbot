/**
 * Queen
 *
 * Initialisation and rules
 */
Queen.prototype = Object.create(Piece.prototype);

function Queen(side) {
	this.side = side;
	this.type = side ? 11 : 4;
	this.value = 8;
	this.images = ["assets/Chess_qdt45.svg", "assets/Chess_qlt45.svg"]
}

Queen.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.position.x - newPos.x),
		diffY = Math.abs(this.position.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// prevent jumping
		if (!Validator.isJumping(newPos, this.position, board)) {
			valid = true;
		}
	}

	return valid;
};
