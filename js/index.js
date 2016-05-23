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

// function nextMinute() {
// 	var now = new Date();
// 	var nextMin = (59 - now.getSeconds()) * 1000 + (1000 - now.getMilliseconds()); // Get time until next minute
// 	return nextMin;
// }

function schedule(fun, mins) {
	var now = new Date();
	var till = (59 - now.getSeconds()) * 1000 + (1000 - now.getMilliseconds()) + (mins - 1) * 60 * 1000; // Get time until next minute

	console.log('hello '+mins);

	var timeout = setTimeout(function() {
		fun();
	}, till);
}
