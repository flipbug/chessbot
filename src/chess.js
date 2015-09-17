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

	// store each figure in an array
	this.figures = [[],[]];

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
	this.initFigurePlacement();
	this.update();
	
	this.bot.init(this);
}

Chess.prototype.update = function() {
	this.stage.update();
}

Chess.prototype.initFigurePlacement = function() {
	var board = this.chessboard.getBoard();
	for (var i = 0; i < board.length; i++) {
		var row = board[i];
		for (var j = 0; j < row.length; j++) {
			// get figure and draw it
			var pos = this.chessboard.getPositionFromCoordinates(j, i);
			var figure = this.getFigureByNumber(row[j]);
			if (figure) {
				figure.init(pos, this);
				// store figure
				var side = row[j] > 6 ? 1 : 0
				this.figures[side].push(figure);
			}
		}
	}
}

Chess.prototype.makeMove = function(coords, figure, isBot) {
	// get old coordinates
	var oldCoords = this.chessboard.getCoordinatesFromPosition(figure.shape.originX, figure.shape.originY);

	var moveValid = this.checkMove(oldCoords, coords, figure);
	if (moveValid) {
		// kill enemy if there is one
		var target = this.chessboard.board[coords.y][coords.x];
		if (target > 0) {
			this.killFigure(coords, figure);
		}
			
		// snap into tile
		var pos = this.chessboard.getPositionFromCoordinates(coords.x, coords.y);
		figure.shape.x = pos.x;
		figure.shape.y = pos.y;

		// update chessboard matrix
		this.chessboard.board[oldCoords.y][oldCoords.x] = 0;
		this.chessboard.board[coords.y][coords.x] = figure.type;

		figure.shape.originX = figure.shape.x;
		figure.shape.originY = figure.shape.y;
	
		// next turn
		this.currentTurn = this.currentTurn ? 0 : 1;
		if (!isBot && this.currentTurn === this.bot.side) {
			this.bot.makeMove();
		}
	} else {
		// revert to previous position
		figure.shape.x = figure.shape.originX;
		figure.shape.y = figure.shape.originY;
		
		this.stage.update();
		return false;
	}

	this.stage.update();
	return true;
}

Chess.prototype.checkMove = function(oldPos, newPos, figure) {
	// check if move is inside the board
	if (newPos.x >= this.chessboard.board.length || newPos.x < 0 || newPos.y >= this.chessboard.board.length || newPos.y < 0) {
		return false;
	}

	// check if move was valid
	if (!figure.validateMove(oldPos, newPos, this.chessboard.board)) {
		return false;
	}

	// if place is already occupied
	var target = this.chessboard.board[newPos.y][newPos.x];
	if (target > 0) {
		// check if place is occupied by an ally
		if ((figure.type < 7 && target < 7) || (figure.type > 6 && target > 6)) {
			return false
		}
	}

	return true;
}

Chess.prototype.killFigure = function(pos, attacker) {
	var scope = this;
	var victimSide = attacker.side ? 0 : 1;
	// search & remove figure from stage
	this.figures[victimSide].forEach(function(item, index) {
		var itemPos = scope.chessboard.getCoordinatesFromPosition(item.shape.x, item.shape.y);
		if (pos.x == itemPos.x && pos.y == itemPos.y && attacker != item) {
			scope.stage.removeChild(item.shape);
			scope.figures[victimSide].splice(index, 1);
			// todo: do something with dead pieces
			return true;
		}
	});

	return false;
}

Chess.prototype.getFigureByNumber = function(number) {
	switch (number) {
		case 1:
			return new Rook(0);
		case 2:
			return new Knight(0);
		case 3:
			return new Bishop(0);
		case 4:
			return new Queen(0);
		case 5:
			return new King(0);
		case 6:
			return new Pawn(0);
		case 7:
			return new Pawn(1);
		case 8:
			return new Rook(1);
		case 9:
			return new Knight(1);
		case 10:
			return new Bishop(1);
		case 11:
			return new Queen(1);
		case 12:
			return new King(1);
	}
	return false;
}
