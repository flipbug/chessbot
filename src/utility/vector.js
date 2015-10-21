function Vector(x, y) {
  this.x = x;
  this.y = y;
}

Vector.prototype.convertToPixel = function() {
	return new Vector(
		this.x * BOARD.SIZE_RECTANGLE + BOARD.OFFSET_X,
		this.y * BOARD.SIZE_RECTANGLE + BOARD.OFFSET_Y
	);
}

Vector.prototype.convertToLocalCoordinates = function() {
	return new Vector(
		Math.round((this.x - BOARD.OFFSET_X) / BOARD.SIZE_RECTANGLE),
		Math.round((this.y - BOARD.OFFSET_Y) / BOARD.SIZE_RECTANGLE)
	);
}
