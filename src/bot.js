/**
 * The ultimate chessbot!
 *
 * @author Daniel Milenkovic
 */
game.Bot = function(side, board) {
	this.side = side;
	this.board = board;

	this.simulator = new game.core.Simulator();
	this.enabled = 1;
}

game.Bot.prototype.makeMove = function() {
	var gameTree = this.simulator.generateGameTree(this.side, this.board, 0);
	var move = this.findBestMove(gameTree);

	var event = new CustomEvent(EVENT.PIECE_MOVED, {
		'detail': {
			'target': move.newPos,
			'start': move.oldPos
		}
	});
	window.dispatchEvent(event);
};

game.Bot.prototype.findBestMove = function(gameTree) {
	//todo: alphabeta implementation
	// console.log(gameTree);
	var move = gameTree[Math.floor(Math.random() * gameTree.length)];
	var actualMove = move.moves[Math.floor(Math.random() * move.moves.length)];
	// console.log(actualMove);
	return {
		'target': new Vector(actualMove.x, actualMove.y),
		'start': move.piece.position
	}
};

game.Bot.prototype.findBestMoveByValue = function(moves) {
	var m = -Infinity;

	for (var i = 0; i < moves.length; ++i) {
		if (moves[i] > m) {
			m = moves[i];
		}
	}

	return m;
};
