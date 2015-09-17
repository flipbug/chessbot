/**
 * Bot
 *
 * The ultimate chessbot!
 *
 * @author Daniel Milenkovic
 */
function Bot(side, difficulty) {
	this.side = side;
	// difficulty goes from 1 to 3 (todo)
	this.difficulty = difficulty;
}

Bot.prototype.init = function(chess) {
	this.chess = chess;
	this.board = chess.chessboard.board;
	this.figures = this.chess.figures[this.side];
}

Bot.prototype.makeMove = function() {
	var possibleMoves = this.getPossibleMoves(this.side);
	
	// go by chance ;)
	var move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
	if (chess.makeMove(move.moves[Math.floor(Math.random() * move.moves.length)], move.figure, true)) {
		return true;
	}
	
	return false;
}

Bot.prototype.getPossibleMoves = function(side) {
	var scope = this,
		possibleMoves = [];
	
	this.figures.forEach(function(figure, index) {
		var moves = [],
			oldPos = scope.chess.chessboard.getCoordinatesFromPosition(figure.shape.x, figure.shape.y);
		
		// iterate through every field to check if possible move
		for (var i = 0; i < scope.board.length; i++) {
			var row = scope.board[i];
			for (var j = 0; j < row.length; j++) {
				var newPos = {x: j, y: i};
				// validate move
				if (newPos != oldPos && scope.chess.checkMove(oldPos, newPos, figure)) {
					moves.push(newPos);
				}
			}
		}
		
		if (moves.length) {
			possibleMoves.push({
				figure: figure,
				moves: moves
			});
		}
	});
	
	return possibleMoves;
}