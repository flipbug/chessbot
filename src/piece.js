/**
 * Parent class for individual pieces
 *
 * @author Daniel Milenkovic
 */
function Piece(side) {
	this.side = side;
	this.images = ["", ""];
}

Piece.prototype.init = function(pos, stage) {
	this.shape = new createjs.Bitmap(this.getImage());

	this.updatePosition(pos);
	this.loadImage();
	this.changeCursorOnHover();
	this.initDraggableShape(stage);
	this.makeMoveAfterPieceMoved(stage);

	stage.addChild(this.shape);
};

Piece.prototype.updatePosition = function(newPos) {
	this.position = new Vector(newPos.x, newPos.y);

	var pixelPos = newPos.convertToPixel();
	this.shape.x = pixelPos.x;
	this.shape.y = pixelPos.y;
};

Piece.prototype.resetPosition = function() {
	var pixelPos = this.position.convertToPixel();
	this.shape.x = pixelPos.x;
	this.shape.y = pixelPos.y;
};

Piece.prototype.loadImage = function() {
	var shape = this.shape;
	// update stage after image has loaded
	shape.image.onload = function() {

		// create hit area after image has loaded to get the image dimensions
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#FF0000").rect(0, 0, shape.image.width, shape.image.height);
		shape.hitArea = hit;
	}
};

Piece.prototype.changeCursorOnHover = function() {
	var shape = this.shape,
			parentScope = this;

	this.shape.on("mouseover", function() {
		if (global.currentTurn == parentScope.side) {
			shape.cursor = 'pointer';
		} else {
			shape.cursor = 'default';
		}
	});
};

Piece.prototype.initDraggableShape = function(stage) {
	var shape = this.shape,
			parentScope = this;

	this.shape.on("pressmove", function(event) {
		if (global.currentTurn == parentScope.side) {
			// include a small offset, so it stays with the cursor
			event.target.x = event.stageX - (shape.image.width / 2);
			event.target.y = event.stageY - (shape.image.height / 2);
			// bring to front
			stage.addChild(shape);
			stage.update();
		}
	});
};

Piece.prototype.makeMoveAfterPieceMoved = function() {
	var piece = this;
	this.shape.on("pressup", function(evt) {
		var event = new CustomEvent(EVENT.PIECE_MOVED, {
			'detail': {
				'newPos': new Vector(evt.target.x, evt.target.y).convertToLocalCoordinates(),
				'oldPos': piece.position
			}
		});
		window.dispatchEvent(event);
	});
};

Piece.prototype.getImage = function() {
	return this.images[this.side]
};