/**
 * Main Function to connect the core with the ui engine
 *
 *
 * @author Daniel Milenkovic
 */
game.main = function(canvas) {

	var chess = {};
	var bot = new game.ai.Bot(PIECES.BLACK);
	var engine = new game.ui.Engine();

	window.addEventListener(EVENT.PIECE_MOVED, function(e) {
		chess.move(e.detail.start, e.detail.target);
		engine.draw(chess.board);
	});

	window.addEventListener(EVENT.NEXT_TURN, function(e) {
		if (chess.turn == bot.side) {
			bot.makeMove(chess.board);
		}
	});

	this.start = function() {
		chess = new game.core.Chess();
		engine.draw(chess.board);
	}

	this.move = function(start, target) {
		chess.move(start, target);
	}
}
