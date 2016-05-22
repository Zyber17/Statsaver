$(document).ready(function() {
	init();
});

function init() {
	timeInit();
	weatherInit();
	busInit();
	trainInit();
	noteInit();
}

function nextMinute() {
	var now = new Date();
	var time = (59 - now.getSeconds()) * 1000 + (1000 - now.getMilliseconds()); // Get time until next minute
	return time;
}
