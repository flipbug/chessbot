/**
 * Knight
 *
 * Initialisation and rules
 */
Knight.prototype = Object.create(Piece.prototype);

function Knight(side) {
	this.side = side;
	this.type = side ? 9 : 2;
	this.value = 2;
	this.images = ["assets/Chess_ndt45.svg", "assets/Chess_nlt45.svg"]
}

Knight.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
		valid = false;

	// 2x1 jump pattern
	if ((diffX == 2 && diffY == 1) || (diffX == 1 && diffY == 2)) {
		valid = true;
	}

	return valid;
}
