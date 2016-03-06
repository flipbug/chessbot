/**
 * The ultimate chessbot!
 *
 * @author Daniel Milenkovic
 */
function Bot(side, board) {
	this.side = side;
	this.board = board;

	this.simulator = new Simulator();
	this.enabled = 1;
}

Bot.prototype.makeMove = function() {
	var gameTree = this.simulator.generateGameTree(this.side, this.board, 0);
	var move = this.findBestMove(gameTree);

	var event = new CustomEvent(EVENT.PIECE_MOVED, {
		'detail': {
			'newPos': move.newPos,
			'oldPos': move.oldPos
		}
	});
	window.dispatchEvent(event);
};

Bot.prototype.findBestMove = function(gameTree) {
	//todo: alphabeta implementation
	// console.log(gameTree);
	var move = gameTree[Math.floor(Math.random() * gameTree.length)];
	var actualMove = move.moves[Math.floor(Math.random() * move.moves.length)];
	// console.log(actualMove);
	return {
		'newPos': new Vector(actualMove.x, actualMove.y),
		'oldPos': move.piece.position
	}
};

Bot.prototype.findBestMoveByValue = function(moves) {
	var m = -Infinity;

	for (var i = 0; i < moves.length; ++i) {
		if (moves[i] > m) {
			m = moves[i];
		}
	}

	return m;
};
