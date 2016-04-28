var PIECES = {
	BLACK: 0,
	WHITE: 1,
	VALUES: {
		1: 1,
		2: 2,
		3: 3,
		4: 4,
		5: 5,
		6: 100000000,
		11: -1,
		12: -2,
		13: -3,
		14: -4,
		15: -5,
		16: -100000000,
	}
};

var DIFFICULTY = {
	EASY: 0,
	MEDIUM: 1,
	HARD: 2
};

var BOARD = {
	// in pixel
	SIZE_RECTANGLE: 45,
	OFFSET_X: 90,
	OFFSET_Y: 0,

	PRIMARY_COLOR: "#E5C4A0",
	SECONDARY_COLOR: "#756452"
};

var EVENT = {
	PIECE_MOVED: "pieceMoved",
	NEXT_TURN: "nextTurn",
	TICK: "tick",
	RESTART_GAME: "restartGame"
};

var SIMULATION =  {
	DEPTH_LIMIT: 3
};
