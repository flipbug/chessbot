/**
 * Rook
 *
 * Initialisation and rules
 */
Rook.prototype = Object.create(Piece.prototype);

function Rook(side) {
	this.side = side;
	this.type = side ? 8 : 1;
	this.value = 2;
	this.images = ["assets/Chess_rdt45.svg", "assets/Chess_rlt45.svg"]
}

Rook.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
		valid = false;

	// only one axis at a time
	if (diffX === 0 || diffY === 0) {
		// prevent jumping
		if (!this.isJumping(newPos, board)) {
			valid = true;
		}
	}

	return valid;
}
