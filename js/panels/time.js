function timeInit() {
	time(false);
	var initTime = setTimeout(function () {
		time(true);
	}, nextMinute());
}

function time(autoRefresh) {
	var now   = new Date();
	var hours = now.getHours();
	var ampm  = 'AM';
	var mins  = now.getMinutes();

	if (hours > 12) {
		hours %= 12;
		ampm = 'PM';
	}

	$('#time').html(hours + ':' + mins + ' ' + ampm);

	if (autoRefresh) {
		var timeRefresh = setTimeout(function () {
			time(true);
		}, 60000);
	}
}

function nextMinute() {
	var now = new Date();
	var time = (59 - now.getSeconds()) * 1000 + (1000 - now.getMilliseconds()); // Get time until next minute
	return time;
}
