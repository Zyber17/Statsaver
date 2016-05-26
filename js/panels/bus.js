var buslist;
var burl = 'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key=' + window.ctaBusKey + '&stpid=' + window.busStop;

function busInit() {
	buslist = $('#busList');
	bus();
}

function bus() {
	buslist.empty();

	$.get(burl, function(data) {
		$(data).find('prd').each(function() {
			var time = $(this).find('prdtm').text();
			var train = new Date(parseInt(time.substr(0,4)), parseInt((time.substr(4,2) - 1)), parseInt(time.substr(6,2)), (parseInt((time.substr(9,2))) +1), parseInt(time.substr(12,2))); // MAKESURE TO DELETE THE +1, that just accounts for
			var now = new Date();
			var when = train - now;
			when/=60000; // Get minutes from now from miliseconds from now
			when = Math.floor(when);
			if (when < 0) when = 0;
			buslist.append('<li>' + $(this).find('rt').text() + ' ' + $(this).find('des').text() + ', ETA: ' + when + 'min</li>');
		});

		schedule((function() {
			bus();
		}), 1);
	});
}
