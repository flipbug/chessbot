/**
 * Bishop
 *
 * Initialisation and rules
 */
Bishop.prototype = Object.create(Piece.prototype);

function Bishop(side) {
	this.side = side;
	this.type = side ? 10 : 3;
	this.value = 3;
	this.images = ["assets/Chess_bdt45.svg", "assets/Chess_blt45.svg"]
}

Bishop.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.position.x - newPos.x),
		diffY = Math.abs(this.position.y - newPos.y),
		valid = false;

	// diagonal move pattern
	if (diffX == diffY) {
		// prevent jumping
		if (!Validator.isJumping(newPos, this.position, board)) {
			valid = true;
		}
	}

	return valid;
};
