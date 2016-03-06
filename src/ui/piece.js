/**
 * Interactive piece
 *
 * @author Daniel Milenkovic
 */

game.ui.Piece = function(image, position, stage) {
	var shape = new createjs.Bitmap(image);
	var pixelPos = position.convertToPixel();
	var currentPos = pixelPos;
	var stage = stage;

	shape.x = pixelPos.x;
	shape.y = pixelPos.y;

	shape.on("mouseover", function() {
		shape.cursor = 'pointer';
	});

	shape.on("pressmove", function(event) {
		// include a small offset, so it stays with the cursor
		event.target.x = event.stageX - (shape.image.width / 2);
		event.target.y = event.stageY - (shape.image.height / 2);
		// bring to front
		stage.addChild(shape);
		stage.update();
	});

	shape.on("pressup", function(evt) {
		var event = new CustomEvent(EVENT.PIECE_MOVED, {
			'detail': {
				'target': new Vector(evt.target.x, evt.target.y).convertToLocalCoordinates(),
				'start': new Vector(currentPos.x, currentPos.y).convertToLocalCoordinates()
			}
		});
		window.dispatchEvent(event);
	});

	shape.image.onload = function() {
		// create hit area after image has loaded to get the image dimensions
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#FF0000").rect(0, 0, shape.image.width, shape.image.height);
		shape.hitArea = hit;
	}

	return shape;
}
