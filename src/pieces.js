/**
 * Piece
 *
 * Parent class for individual pieces
 *
 * @author Daniel Milenkovic
 */
function Piece(side) {
	this.side = side;
	this.images = ["", ""];
}

Piece.prototype.init = function(pos, global) {
	var shape = new createjs.Bitmap(this.getImage());

	// todo: clean me up!
	this.shape = shape;
	var piece = this;

	// update stage after image has loaded
	shape.image.onload = function() {

		// create hit area after image has loaded to get the image dimensions
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#FF0000").rect(0, 0, shape.image.width, shape.image.height);
		shape.hitArea = hit;

		global.stage.update();
	}

	// set initial position
	shape.x = shape.originX = pos.x;
	shape.y = shape.originY = pos.y;

	// change cursor
	shape.on("mouseover", function() {
		if (global.currentTurn == piece.side) {
			shape.cursor = 'pointer';
		} else {
			shape.cursor = 'default';
		}
	});

	// make draggable
	shape.on("pressmove", function(event) {
		if (global.currentTurn == piece.side) {
			// include a small offset, so it stays with the cursor
			event.target.x = event.stageX - (shape.image.width / 2);
			event.target.y = event.stageY - (shape.image.height / 2);

			// bring to front
			global.stage.addChild(shape);

			global.stage.update();
		}
	});

	// make move after piece has been dropped
	shape.on("pressup", function(evt) {
		var coords = global.chessboard.getCoordinatesFromPosition(evt.target.x, evt.target.y);
		global.makeMove(coords, piece, false);
	});

	global.stage.addChild(shape);
}

Piece.prototype.getImage = function() {
	return this.images[this.side]
}

Piece.prototype.setImages = function(images) {
	this.images = images;
}

Piece.prototype.isJumping = function(oldPos, newPos, board) {
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
			if (diagonal && board[currentY][i]) {
				return true;
			} else if (!diagonal && board[oldPos.y][i]) {
				return true;
			}
		}
	} else {
		// check for obstacles vertical and diagonal
		for (var i = oldPos.y + yOperator;
			(i < newPos.y && yOperator > 0) ||
			(i > newPos.y && yOperator < 0); i += yOperator) {

			currentX += xOperator;
			if (diagonal && board[i][currentX]) {
				return true;
			} else if (!diagonal && board[i][oldPos.x]) {
				return true;
			}
		}
	}

	return false;
}


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

Pawn.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// check direction
	if ((this.side === 0 && oldPos.y < newPos.y) || (this.side == 1 && oldPos.y > newPos.y)) {
		// only forward if no one in front
		if (diffX === 0 && target === 0) {
			// only one step at a time
			if (diffY == 1) {
				valid = true;
				// two steps if never been moved before
			} else if (diffY == 2 && this.moved == false) {
				valid = true
			}
		} else if (diffX == 1 && diffY == 1 && target) {
			// diagonal if there is an enemy
			valid = true;
		}
	}

	if (valid) {
		this.moved = true;
		return true;
	}

	return false;
}

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

Rook.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		valid = false;

	// only one axis at a time
	if (diffX === 0 || diffY === 0) {
		// prevent jumping
		if (!this.isJumping(oldPos, newPos, board)) {
			valid = true;
		}
	}

	return valid;
}

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

Knight.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		valid = false;

	// 2x1 jump pattern
	if ((diffX == 2 && diffY == 1) || (diffX == 1 && diffY == 2)) {
		valid = true;
	}

	return valid;
}

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

Bishop.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		valid = false;

	// diagonal move pattern
	if (diffX == diffY) {
		// prevent jumping
		if (!this.isJumping(oldPos, newPos, board)) {
			valid = true;
		}
	}

	return valid;
}

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

Queen.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// prevent jumping
		if (!this.isJumping(oldPos, newPos, board)) {
			valid = true;
		}
	}

	return valid;
}

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

King.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// only one step at a time
		if (diffX <= 1 && diffY <= 1) {
			valid = true;
		}
	}

	return valid;
}
