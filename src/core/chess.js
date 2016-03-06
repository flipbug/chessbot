/**
 * Contains the main logic of the game
 *
 * @author Daniel Milenkovic
 */
 game.core.Chess = function() {

	this.turn = 1;
	this.log = [];
	this.board = [];

	this.board[0] = [12, 13, 14, 15, 16, 14, 13, 12];
	this.board[1] = [11, 11, 11, 11, 11, 11, 11, 11];
	this.board[2] = [ 0,  0,  0,  0,  0,  0,  0,  0];
	this.board[3] = [ 0,  0,  0,  0,  0,  0,  0,  0];
	this.board[4] = [ 0,  0,  0,  0,  0,  0,  0,  0];
	this.board[5] = [ 0,  0,  0,  0,  0,  0,  0,  0];
	this.board[6] = [ 1,  1,  1,  1,  1,  1,  1,  1];
	this.board[7] = [ 2,  3,  4,  5,  6,  4,  3,  2];

    this.draw = function() {
    	for (y = 0; y < this.board.length; y++) {
    		var row = "";
    		for (x = 0; x < this.board[y].length; x++) {
    			var piece = this.board[y][x];
    			if (piece > 10) {
    				row += " " + piece + " ";
    			}
    			else {
    				row += "  " + piece + " ";
    			}
    		}
    		console.log(row);
    	}
    };

    this.move = function(start, target) {
    	var piece = this.board[start.y][start.x];
    	if (piece > 0) {
    		if ((this.turn == 0 && piece > 10) || (this.turn == 1 && piece < 10)) {
    			if (game.core.validator.isValidMove(start, target, this.turn, this.board)) {
    				this.updateBoard(start, target);
    				this.turn = 1 - this.turn;
    				this.log.push([start, target]);
    			} else {
    				console.log("invalid move");
    			}
    		} else {
    			console.log("not your turn");
    		}
    	}
    };

    this.updateBoard = function(start, target) {
    	this.board[target.y][target.x] = this.board[start.y][start.x];
    	this.board[start.y][start.x] = 0;
    	this.draw();
    };

    this.sendEvent = function(event, data) {
    	var event = new CustomEvent(event, {'detail': data});
    	window.dispatchEvent(event);
    };

};
