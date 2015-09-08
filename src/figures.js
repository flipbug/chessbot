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
 
 Figure.prototype.init = function(pos, global) {
	var shape = new createjs.Bitmap(this.getImage());
	
	// update stage after image has loaded
	shape.image.onload = function() {
			
		// create hit area after image has loaded to get the image dimensions
		var hit = new createjs.Shape();
		hit.graphics.beginFill("#FF0000").rect(0, 0, shape.image.width, shape.image.height);
		shape.hitArea = hit;
		
		global.stage.update();
	}

	// set initial position
	shape.x = shape.originX = pos.x;
	shape.y = shape.originY = pos.y;
	
	// make draggable
	shape.on("pressmove", function(evt) {
		// include a small offset, so it stays with the cursor
    	evt.target.x = evt.stageX - (shape.image.width / 2);
		evt.target.y = evt.stageY - (shape.image.height / 2);
		
		// bring to front
		global.stage.addChild(shape);
		
		global.stage.update();
	});
	
	// make move
	this.shape = shape;
	var figure = this;
	shape.on("pressup", function(evt) {				
		global.makeMove(evt.target.x, evt.target.y, figure);
	});
	
	global.stage.addChild(shape);
 }
 
 Figure.prototype.getImage = function() {
 	return this.images[this.side]
 }

 Figure.prototype.setImages = function(images) {
	this.images = images;
 }

 Pawn.prototype = Object.create(Figure.prototype);
 function Pawn(side) {
 	this.side = side;
 	this.type = side ? 7 : 6; 
	this.images = ["assets/Chess_pdt45.svg", "assets/Chess_plt45.svg"]
 }

 Rook.prototype = Object.create(Figure.prototype);
 function Rook(side) {
 	this.side = side;
 	this.type = side ? 8 : 1; 
	this.images = ["assets/Chess_rdt45.svg", "assets/Chess_rlt45.svg"]
 }
 
 Knight.prototype = Object.create(Figure.prototype);
 function Knight(side) {
 	this.side = side;
  	this.type = side ? 9 : 2; 
	this.images = ["assets/Chess_ndt45.svg", "assets/Chess_nlt45.svg"]
 }
 
 Bishop.prototype = Object.create(Figure.prototype);
 function Bishop(side) {
 	this.side = side;
  	this.type = side ? 10 : 3; 
	this.images = ["assets/Chess_bdt45.svg", "assets/Chess_blt45.svg"]
 }
 
 Queen.prototype = Object.create(Figure.prototype);
 function Queen(side) {
 	this.side = side;
  	this.type = side ? 11 : 4; 
	this.images = ["assets/Chess_qdt45.svg", "assets/Chess_qlt45.svg"]
 }
 
 King.prototype = Object.create(Figure.prototype);
 function King(side) {
 	this.side = side;
  	this.type = side ? 12 : 5; 
	this.images = ["assets/Chess_kdt45.svg", "assets/Chess_klt45.svg"]
 }