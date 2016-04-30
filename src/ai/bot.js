/**
 * The ultimate chessbot!
 *
 * @author Daniel Milenkovic
 */
game.ai.Bot = function(side) {
	this.side = side;
	this.simulator = new game.ai.BruteForce();
}

game.ai.Bot.prototype.makeMove = function(board) {
	var busy = false;
	var scope = this;

	// use an interval to achieve asynchronous code execution
	var process = setInterval(function() {
		if (!busy) {
			busy = true;
			var gameTree = scope.simulator.generateGameTree(board, scope.side, 0);
			var move = scope.findBestMove(gameTree, scope.side);

			console.log(gameTree);
			console.log(move);

			var event = new CustomEvent(EVENT.PIECE_MOVED, {
				'detail': {
					'start': new Vector(move[0][0],move[0][1]),
					'target': new Vector(move[1][0],move[1][1])
				}
			});
			window.dispatchEvent(event);
			clearInterval(process);
		}
	}, 1000);

};

game.ai.Bot.prototype.findBestMove = function(gameTree, side) {
	var move = [];
	var currentScore = 0;
	for (var i = 0; i < gameTree.length; i++) {
		var score = this.evaluatePathScore(gameTree[i], side, 0);
		if ((side == PIECES.BLACK && currentScore <= score) || (side == PIECES.WHITE && currentScore >= score)) {
			currentScore = score;
			move = gameTree[i];
		}
	}
	console.log('-- winning score --');
	console.log(currentScore);

	return move;
};

game.ai.Bot.prototype.evaluatePathScore = function(moves, side, score) {
	var result = 0;
	if (moves && moves.length) {
		score = moves[2];
		if (moves[3] && moves[3].length > 0) {
			for (var i = 0; i < moves[3].length; i++) {
				result = this.evaluatePathScore(moves[3][i], 1 - side, score);
				if ((side == PIECES.BLACK && result < score) || (side == PIECES.WHITE && result > score)) {
					score += result;
				}
			}
		}
	}
	return score;
};
