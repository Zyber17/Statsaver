function trainInit() {
	train();
}

function train() {

	var busRefresh = setTimeout(function () {
		bus(true);
	}, nextMinute());
}
