function cloneBoard(currentArray) {
	var len = currentArray.length,
		copy = new Array(len); // boost in Safari

	for (var i=0; i < len; i++) {
		copy[i] = currentArray[i].slice(0);
	}
	return copy
}