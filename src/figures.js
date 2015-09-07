/**
 * Figures
 *
 * Containes the code for all the different figures
 *
 * @author Daniel Milenkovic
 */

 function Figure(side) {
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

 Pawn.prototype = Object.create(Figure.prototype);
 function Pawn(side) {
 	this.side = side;
	this.images = ["assets/Chess_pdt45.svg", "assets/Chess_plt45.svg"]
 }

 Rook.prototype = Object.create(Figure.prototype);
 function Rook(side) {
 	this.side = side;
	this.images = ["assets/Chess_rdt45.svg", "assets/Chess_rlt45.svg"]
 }
 
 Knight.prototype = Object.create(Figure.prototype);
 function Knight(side) {
 	this.side = side;
	this.images = ["assets/Chess_ndt45.svg", "assets/Chess_nlt45.svg"]
 }
 
 Bishop.prototype = Object.create(Figure.prototype);
 function Bishop(side) {
 	this.side = side;
	this.images = ["assets/Chess_bdt45.svg", "assets/Chess_blt45.svg"]
 }
 
 Queen.prototype = Object.create(Figure.prototype);
 function Queen(side) {
 	this.side = side;
	this.images = ["assets/Chess_qdt45.svg", "assets/Chess_qlt45.svg"]
 }
 
 King.prototype = Object.create(Figure.prototype);
 function King(side) {
 	this.side = side;
	this.images = ["assets/Chess_kdt45.svg", "assets/Chess_klt45.svg"]
 }