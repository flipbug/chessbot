/**
 * Parent class for individual pieces
 *
 * @author Daniel Milenkovic
 * @param {int} side
 */
function Piece(side) {
	this.side = side;
	this.images = ["", ""];
}

/**
 * Initialize a chess piece
 *
 * @param  {Object} coords
 * @param  {Object} pixelPos
 * @param  {Chess} globalScope
 */
Piece.prototype.init = function(coords, pixelPos, globalScope) {
	this.shape = new createjs.Bitmap(this.getImage());

	// set initial position
	this.shape.x = this.shape.originX = pixelPos.x;
	this.shape.y = this.shape.originY = pixelPos.y;

	this.x = coords.x;
	this.y = coords.y;

	this.loadImage(globalScope);
	this.makeDraggable(globalScope);
}

/**
 * Load the image and display it afterwards
 *
 * @param  {Chess} global
 */
Piece.prototype.loadImage = function(global) {
	var shape = this.shape;
	// update stage after image has loaded
	shape.image.onload = function() {

		// create hit area after image has loaded to get the image dimensions
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#FF0000").rect(0, 0, shape.image.width, shape.image.height);
		shape.hitArea = hit;

		global.stage.update();
	}
}

/**
 * Make the piece draggable
 *
 * @param  {Chess} global
 */
Piece.prototype.makeDraggable = function(global) {
	var shape = this.shape,
			parentScope = this;

	// change cursor
	this.shape.on("mouseover", function() {
		if (global.currentTurn == parentScope.side) {
			shape.cursor = 'pointer';
		} else {
			shape.cursor = 'default';
		}
	});

	// make draggable
	this.shape.on("pressmove", function(event) {
		if (global.currentTurn == parentScope.side) {
			// include a small offset, so it stays with the cursor
			event.target.x = event.stageX - (shape.image.width / 2);
			event.target.y = event.stageY - (shape.image.height / 2);

			// bring to front
			global.stage.addChild(shape);

			global.stage.update();
		}
	});

	// make move after piece has been dropped
	this.shape.on("pressup", function(evt) {
		var coords = global.chessboard.getCoordinatesFromPosition(evt.target.x, evt.target.y);
		global.makeMove(coords, parentScope, false);
	});

	global.stage.addChild(shape);
}

/**
 * Check if piece is jumping over other pieces
 *
 * @param  {Object} newPos
 * @param  {array} board
 * @return {bool}
 */
Piece.prototype.isJumping = function(newPos, board) {
	var xOperator = this.x < newPos.x ? 1 : -1,
		yOperator = this.y < newPos.y ? 1 : -1,

		diffX = Math.abs(this.x - this.x),
		diffY = Math.abs(this.y - this.y),

		currentY = this.y,
		currentX = this.x,

		diagonal = false;

	if (diffX == diffY) {
		diagonal = true;
	}

	if (diffX > 0) {
		// check for obstacles horizontal and diagonal
		for (var i = this.x + xOperator;
			(i < newPos.x && xOperator > 0) ||
			(i > newPos.x && xOperator < 0); i += xOperator) {

			currentY += yOperator;
			if (diagonal && board[currentY][i] instanceof Piece) {
				return true;
			} else if (!diagonal && board[this.y][i] instanceof Piece) {
				return true;
			}
		}
	} else {
		// check for obstacles vertical and diagonal
		for (var i = this.y + yOperator;
			(i < newPos.y && yOperator > 0) ||
			(i > newPos.y && yOperator < 0); i += yOperator) {

			currentX += xOperator;
			if (diagonal && board[i][currentX] instanceof Piece) {
				return true;
			} else if (!diagonal && board[i][this.x] instanceof Piece) {
				return true;
			}
		}
	}

	return false;
}

/**
 * Get image for its side
 *
 * @return {array}
 */
Piece.prototype.getImage = function() {
	return this.images[this.side]
}

/**
 * Setter for images
 */
Piece.prototype.setImages = function(images) {
	this.images = images;
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

Pawn.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// check direction
	if ((this.side === 0 && this.y < newPos.y) || (this.side == 1 && this.y > newPos.y)) {
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
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
		valid = false;

	// diagonal move pattern
	if (diffX == diffY) {
		// prevent jumping
		if (!this.isJumping(newPos, board)) {
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

Queen.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// prevent jumping
		if (!this.isJumping(newPos, board)) {
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

King.prototype.validateMove = function(newPos, board) {
	var diffX = Math.abs(this.x - newPos.x),
		diffY = Math.abs(this.y - newPos.y),
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
