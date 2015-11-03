/**
 * Pawn
 *
 * Initialisation and rules
 */
Pawn.prototype = Object.create(Piece.prototype);

function Pawn(side) {
	this.side = side;
	this.type = side ? 7 : 6;
	this.value = 1;
	this.moved = false;
	this.images = ["assets/Chess_pdt45.svg", "assets/Chess_plt45.svg"]
}

Pawn.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.position.x - newPos.x),
		diffY = Math.abs(this.position.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// check direction
	if ((this.side === PIECES.BLACK && this.position.y < newPos.y) ||
		(this.side == PIECES.WHITE && this.position.y > newPos.y)) {
		// only forward if no one in front
		if (diffX === 0 && target === 0) {
			// only one step at a time
			if (diffY == 1) {
				valid = true;
				// two steps if never been moved before
			} else if (diffY == 2 && this.moved == false) {
				valid = true
			}
		} else if (diffX == 1 && diffY == 1 && target instanceof Piece) {
			// diagonal if there is an enemy
			valid = true;
		}
	}

	if (valid) {
		this.moved = true;
		return true;
	}

	return false;
};