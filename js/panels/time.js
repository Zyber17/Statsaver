function timeInit() {
	time();
}

function time() {
	var now   = new Date();
	var hours = now.getHours();
	var ampm  = 'AM';
	var mins  = now.getMinutes();

	if (hours > 12) {
		hours %= 12;
		ampm = 'PM';
	}
	if (mins < 10) {
		mins = '0' + mins;
	}

	$('#time').html(hours + ':' + mins + ' ' + ampm);

	var timeRefresh = setTimeout(function () {
		time();
	}, nextMinute());
}
