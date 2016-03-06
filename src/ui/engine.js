/**
 * UI Engine
 *
 * Responsible for drawing the game on the canvas
 *
 * @author Daniel Milenkovic
 */
game.ui.Engine = function() {
	var uiBoard = new game.ui.Chessboard();
	var sprites = [
		[],
		["assets/Chess_pdt45.svg", "assets/Chess_plt45.svg"],
		["assets/Chess_rdt45.svg", "assets/Chess_rlt45.svg"],
		["assets/Chess_ndt45.svg", "assets/Chess_nlt45.svg"],
		["assets/Chess_bdt45.svg", "assets/Chess_blt45.svg"],
		["assets/Chess_qdt45.svg", "assets/Chess_qlt45.svg"],
		["assets/Chess_kdt45.svg", "assets/Chess_klt45.svg"],
	];

	this.stage = new createjs.Stage(canvas);
	this.stage.enableMouseOver();
	this.stage.mouseMoveOutside = true;

	createjs.Ticker.setFPS(10);
	createjs.Touch.enable(this.stage);

	var scope = this;
	createjs.Ticker.addEventListener(EVENT.TICK, function() {
		scope.stage.update();
	});

	this.resetStage = function() {
		this.stage.removeAllChildren();
		this.stage.update();
	}

	this.draw = function(board) {
		this.resetStage();
		uiBoard.draw(board, this.stage);
		this.drawPieces(board, this.stage);
		this.stage.update();
	}

	this.drawPieces = function(board) {
		for (y = 0; y < board.length; y++) {
			for (x = 0; x < board[y].length; x++) {
				var piece = board[y][x];
				var position = new Vector(x, y);

				if (piece > 10) {
					piece -= 10;
					shape = new game.ui.Piece(sprites[piece][0], position, this.stage)
				}
				else if (piece > 0){
					shape = new game.ui.Piece(sprites[piece][1], position, this.stage)
				}

				this.stage.addChild(shape);
			}
		}
	}
}
