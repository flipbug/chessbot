/**
 * Chess 
 *
 * Containes the main logic of the game
 *
 * @author Daniel Milenkovic
 */
 
 function Chess(canvas, dimension) {
 		
	 this.context = canvas.getContext("2d");
	 this.dimension = dimension;
	 this.offsetX = 20;
	 this.offsetY = 0;
	 
	 // init easel.js
	 this.stage = new createjs.Stage(canvas);
	 this.stage.enableMouseOver();
	 this.stage.mouseMoveOutside = true; 
	 
	 createjs.Touch.enable(this.stage);
 }
 
 Chess.prototype.start = function() {
	 this.chessboard = new Chessboard(this.offsetX, this.offsetY);
	 this.chessboard.draw(this.stage, this.dimension);
	 this.initFigurePlacement();
	 this.update();
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
			}
		}
	 }
 }
 
 Chess.prototype.makeMove = function(x, y, figure) {
	 // get coordinates
	 var coords = this.chessboard.getCoordinatesFromPosition(x, y);
	 var moveValid = this.checkMove(coords.x, coords.y);
	 
	 if (moveValid) {
	     // snap into tile
	     var pos = this.chessboard.getPositionFromCoordinates(coords.x, coords.y);
		 figure.shape.x =  pos.x;
		 figure.shape.y =  pos.y;
		 
		 // update chessboard matrix
		 var oldCoords = this.chessboard.getCoordinatesFromPosition(figure.shape.originX, figure.shape.originY);
		 this.chessboard.board[oldCoords.y][oldCoords.x] = 0;
		 this.chessboard.board[coords.y][coords.x] = figure.type;
		
		 figure.shape.originX = figure.shape.x;
		 figure.shape.originY = figure.shape.y;
	 } else {
		 // revert to previous position
		 figure.shape.x = figure.shape.originX;
		 figure.shape.y = figure.shape.originY;
	 }
			
	 this.stage.update();
 }
 
 Chess.prototype.checkMove = function(x, y) {
 	 // todo: define rules!
 	 if (x >= this.chessboard.board.length || x < 0 || y >= this.chessboard.board.length || y < 0) {
	 	 return false;
 	 }
	 if (this.chessboard.board[y][x] > 0) {
		 return false;
	 }
	 return true;
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
