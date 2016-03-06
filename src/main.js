/**
 * Main Function to connect the core with the ui engine
 *
 *
 * @author Daniel Milenkovic
 */
game.main = function(canvas) {

	var chess = {};
	var engine = new game.ui.Engine();

	window.addEventListener(EVENT.PIECE_MOVED, function(e) {
		chess.move(e.detail.start, e.detail.target);
		engine.draw(chess.board);
	});

	this.start = function() {
		chess = new game.core.Chess();
		engine.draw(chess.board);
	}

	this.move = function(start, target) {
		chess.move(start, target);
	}
}
