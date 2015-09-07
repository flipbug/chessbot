/**
 * Figures 
 *
 * Containes the code for all the different figures
 *
 * @author Daniel Milenkovic
 */
 
 var Figure = function(side) {
  	this.side = side;
  	this.images = ["", ""];
 }

 Figure.prototype.draw = function(pos, stage) {
	var figure = new createjs.Bitmap(this.getImage());
	figure.image.onload = function() { 
		stage.update();
	} 
	
	figure.x = pos.x;
	figure.y = pos.y;
	
	stage.addChild(figure);
 }
  
 Figure.prototype.getImage = function() {
 	return this.images[this.side]
 }
 
 Figure.prototype.setImages = function(images) {
	this.images = images;
 }

 Figure.prototype.move = function(x, y) {
	 
 }
 
 var Pawn = function(side) {
 	this.side = side;
	this.images = ["assets/pawn_black.png", "assets/pawn_white.png"]
 }
 Pawn.prototype = Object.create(Figure.prototype);
