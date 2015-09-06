/**
 * Figures 
 *
 * Containes the code for all the different figures
 *
 * @author Daniel Milenkovic
 */
 
 function Figure(sprite_0, sprite_1) {
 	this.sprite_0 = sprite_1;
 	this.x = 0;
 	this.y = 0;
	 
 }
 
 Figure.prototype.setSide = function(side) {
 	this.side = side;
 }
 
 Figure.prototype.move = function(x, y) {
	 
 }
 
 Figure.prototype.draw = function() {
	 
 }
 
 Pawn = new Figure('../assets/pawn_black.svg', '../assets/pawn_white.svg');