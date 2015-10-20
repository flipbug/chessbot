/**
 * Chess
 *
 * Contains the main logic of the game
 *
 * @author Daniel Milenkovic
 */
function Chess(canvas, dimension) {

	this.context = canvas.getContext("2d");
	this.dimension = dimension;
	this.offsetX = 90;
	this.offsetY = 0;

	// store each piece in an array
	this.pieces = [[],[]];

	// white begins
	this.currentTurn = 1;
	this.bot = new Bot(0, 2);

	// init easel.js
	this.stage = new createjs.Stage(canvas);
	this.stage.enableMouseOver();
	this.stage.mouseMoveOutside = true;

	// conifgure ticker to use requestAnimationFrame
	// createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
	// createjs.Ticker.setFPS(10);

	createjs.Touch.enable(this.stage);
}

Chess.prototype.start = function() {
	this.chessboard = new Chessboard(this.offsetX, this.offsetY);
	this.chessboard.draw(this.stage, this.dimension);
	this.initPiecePlacement();
	this.update();

	this.bot.init(this);
}

Chess.prototype.update = function() {
	this.stage.update();
}

Chess.prototype.initPiecePlacement = function() {
	var board = this.chessboard.getBoard();
	for (var i = 0; i < board.length; i++) {
		var row = board[i];
		for (var j = 0; j < row.length; j++) {
			// get piece and draw it
			var piece = board[i][j];
			if (piece instanceof Piece) {
				var pixelPos = this.chessboard.getPositionFromCoordinates(j, i);
				piece.init({x: j, y: i}, pixelPos, this);
				// store piece
				this.pieces[piece.side].push(piece);
			}
		}
	}
}

Chess.prototype.makeMove = function(coords, piece) {
	if (this.checkMove(coords, piece, this.chessboard.board)) {
		// kill enemy if there is one
		var target = this.chessboard.board[coords.y][coords.x];
		if (target instanceof Piece) {
			this.killPiece(coords, piece);
		}

		// snap into tile
		var pixelPos = this.chessboard.getPositionFromCoordinates(coords.x, coords.y);
		piece.shape.x = pixelPos.x;
		piece.shape.y = pixelPos.y;

		// update chessboard matrix
		this.chessboard.board[piece.y][piece.x] = 0;
		this.chessboard.board[coords.y][coords.x] = piece;

		piece.x = coords.x;
		piece.y = coords.y;

		piece.shape.originX = piece.shape.x;
		piece.shape.originY = piece.shape.y;

		// update stage before next move
		this.stage.update();

		// next turn
		this.currentTurn = 1 - this.currentTurn;
		if (this.currentTurn === this.bot.side) {
			this.bot.makeMove();
		}
	} else {
		// revert to previous position
		piece.shape.x = piece.shape.originX;
		piece.shape.y = piece.shape.originY;

		this.stage.update();
		return false;
	}

	return true;
}

Chess.prototype.checkMove = function(newPos, piece, board) {
	// check if piece was moved
	if (newPos.x == piece.x && newPos.y == piece.y) {
		return false;
	}

	// check if move is inside the board
	if (newPos.x >= board.length || newPos.x < 0 || newPos.y >= board.length || newPos.y < 0) {
		return false;
	}

	// check if move was valid
	if (!piece.validateMove(newPos, board)) {
		return false;
	}

	// if place is already occupied
	var target = board[newPos.y][newPos.x];
	if (target instanceof Piece) {
		// check if place is occupied by an ally
		if (piece.side === target.side) {
			return false
		}
	}

	return true;
}

Chess.prototype.killPiece = function(pos, attacker) {
	var scope = this;
	var victimSide = 1 - attacker.side;
	// search & remove piece from stage
	this.pieces[victimSide].forEach(function(item, index) {
		var itemPos = scope.chessboard.getCoordinatesFromPosition(item.shape.x, item.shape.y);
		if (pos.x == itemPos.x && pos.y == itemPos.y && attacker != item) {
			scope.stage.removeChild(item.shape);
			scope.pieces[victimSide].splice(index, 1);
			// todo: do something with dead pieces
			return true;
		}
	});

	return false;
}
