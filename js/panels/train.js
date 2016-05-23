function trainInit() {
	train();
}

function train() {

	schedule(function() {
		train();
	}, 1);
}
