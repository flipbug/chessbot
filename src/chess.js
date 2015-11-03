/**
 * Contains the main logic of the game
 *
 * @author Daniel Milenkovic
 */
function Chess(canvas) {
	this.canvas = canvas;

	this.pieces = [[],[]];
	this.initEaselJs();
}

Chess.prototype.initEaselJs = function() {
	this.stage = new createjs.Stage(this.canvas);
	this.stage.enableMouseOver();
	this.stage.mouseMoveOutside = true;

	createjs.Ticker.setFPS(10);
	createjs.Touch.enable(this.stage);
};

Chess.prototype.start = function() {
	this.chessboard = new Chessboard();
	this.chessboard.draw(this.stage);
	this.pieces = this.chessboard.initPieces(this.stage);

	global.currentTurn = PIECES.WHITE;
	this.bot = new Bot(PIECES.BLACK, DIFFICULTY.MEDIUM);
	this.bot.init(this.chessboard.board, this.pieces);

	this.bot.enabled = 0;

	this.listenToPieces();
	this.startGameLoop();
};

Chess.prototype.listenToPieces = function() {
	var scope = this;
	window.addEventListener(EVENT.PIECE_MOVED, function(e) {
		scope.makeMove(e.detail.newPos, e.detail.oldPos);
	});
};

Chess.prototype.startGameLoop = function() {
	var scope = this;
	createjs.Ticker.addEventListener(EVENT.TICK, function() {
		scope.update();
	});
};

Chess.prototype.update = function() {
	this.stage.update();
};

Chess.prototype.makeMove = function(newPos, oldPos) {
	var piece = this.chessboard.getPieceFromPosition(oldPos);
	if (Validator.checkMove(newPos, piece, this.chessboard.board)) {

		if (this.chessboard.isPieceOnPosition(newPos)) {
			this.killPiece(newPos, piece);
		}

		this.chessboard.updateBoard(newPos, piece);
		piece.updatePosition(newPos);

		this.nextTurn();
	} else {
		piece.resetPosition();
		return false;
	}

	return true;
};

Chess.prototype.nextTurn = function() {
	global.currentTurn = 1 - global.currentTurn;
	if (this.bot.enabled && global.currentTurn === this.bot.side) {
		this.bot.makeMove();
	}
};

Chess.prototype.killPiece = function(pos, attacker) {
	var scope = this;
	var victimSide = 1 - attacker.side;
	// search & remove piece from stage
	this.pieces[victimSide].forEach(function(item, index) {
		var itemPos = item.position;
		if (pos.x == itemPos.x && pos.y == itemPos.y && attacker != item) {
			scope.stage.removeChild(item.shape);
			scope.pieces[victimSide].splice(index, 1);
			// todo: do something with dead pieces
			return true;
		}
	});

	return false;
};
