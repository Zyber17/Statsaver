function trainInit() {
	train(false);
	var initBus = setTimeout(function () {
		train(true);
	}, nextMinute());
}

function train(autoRefresh) {

	if (autoRefresh) {
		var busRefresh = setTimeout(function () {
			bus(true);
		}, nextMinute());
	}
}
