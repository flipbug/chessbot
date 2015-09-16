/**
 * Figure
 *
 * Parent class for individual pieces
 *
 * @author Daniel Milenkovic
 */
function Figure(side) {
	this.side = side;
	this.images = ["", ""];
}

Figure.prototype.init = function(pos, global) {
	var shape = new createjs.Bitmap(this.getImage());
	
	// todo: clean me up!
	this.shape = shape;
	var figure = this;

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

	// make draggable
	shape.on("pressmove", function(event) {
		if (global.currentTurn == figure.side) {
			// include a small offset, so it stays with the cursor
			event.target.x = event.stageX - (shape.image.width / 2);
			event.target.y = event.stageY - (shape.image.height / 2);

			// bring to front
			global.stage.addChild(shape);

			global.stage.update();
		}
	});

	// make move after figure has been dropped
	shape.on("pressup", function(evt) {
		global.makeMove(evt.target.x, evt.target.y, figure);
	});

	global.stage.addChild(shape);
}

Figure.prototype.getImage = function() {
	return this.images[this.side]
}

Figure.prototype.setImages = function(images) {
	this.images = images;
}


/**
 * Pawn
 *
 * Initialisation and rules
 */
Pawn.prototype = Object.create(Figure.prototype);

function Pawn(side) {
	this.side = side;
	this.type = side ? 7 : 6;
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
		if (diffX === 0 && target == 0) {
			// only one step at a time
			if (diffY == 1) {
				valid = true;
				// two steps if never been moved before
			} else if (diffY == 2 && this.moved == false) {
				valid = true
			}
		} else if (diffX == 1 && diffY == 1 && target > 0) {
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
Rook.prototype = Object.create(Figure.prototype);

function Rook(side) {
	this.side = side;
	this.type = side ? 8 : 1;
	this.images = ["assets/Chess_rdt45.svg", "assets/Chess_rlt45.svg"]
}

Rook.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// only on axis at a time
	if (diffX === 0 || diffY === 0) {
		// todo: prevent jumping
		valid = true;
	}

	return valid;
}

/**
 * Knight
 *
 * Initialisation and rules
 */
Knight.prototype = Object.create(Figure.prototype);

function Knight(side) {
	this.side = side;
	this.type = side ? 9 : 2;
	this.images = ["assets/Chess_ndt45.svg", "assets/Chess_nlt45.svg"]
}

Knight.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
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
Bishop.prototype = Object.create(Figure.prototype);

function Bishop(side) {
	this.side = side;
	this.type = side ? 10 : 3;
	this.images = ["assets/Chess_bdt45.svg", "assets/Chess_blt45.svg"]
}

Bishop.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal move pattern
	if (diffX == diffY) {
		// todo: prevent jumping
		valid = true;
	}

	return valid;
}

/**
 * Queen
 *
 * Initialisation and rules
 */
Queen.prototype = Object.create(Figure.prototype);

function Queen(side) {
	this.side = side;
	this.type = side ? 11 : 4;
	this.images = ["assets/Chess_qdt45.svg", "assets/Chess_qlt45.svg"]
}

Queen.prototype.validateMove = function(oldPos, newPos, board) {
	var diffX = Math.abs(oldPos.x - newPos.x),
		diffY = Math.abs(oldPos.y - newPos.y),
		target = board[newPos.y][newPos.x],
		valid = false;

	// diagonal or straight move pattern
	if (diffX == diffY || diffX === 0 || diffY === 0) {
		// todo: prevent jumping
		valid = true;
	}

	return valid;
}

/**
 * King
 *
 * Initialisation and rules
 */
King.prototype = Object.create(Figure.prototype);

function King(side) {
	this.side = side;
	this.type = side ? 12 : 5;
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