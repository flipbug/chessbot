/**
 * King
 *
 * Initialisation and rules
 */
King.prototype = Object.create(Piece.prototype);

function King(side) {
	this.side = side;
	this.type = side ? 12 : 5;
	this.value = 1000;
	this.images = ["assets/Chess_kdt45.svg", "assets/Chess_klt45.svg"]
}

King.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.position.x - newPos.x),
		diffY = Math.abs(this.position.y - newPos.y),
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// only one step at a time
		if (diffX <= 1 && diffY <= 1) {
			valid = true;
		}
	}

	return valid;
};
