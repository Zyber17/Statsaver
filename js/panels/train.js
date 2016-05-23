var trainNorth, trainSouth;
var turl = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' + window.ctaTrainKey + '&mapid=' + window.trainStop;

function trainInit() {
	trainNorth = $('#trainN');
	trainSouth = $('#trainS');

	train();
}

function train() {
	trainNorth.empty();
	trainSouth.empty();

	$.get(turl, function(data) {
		$(data).find('eta').each(function() {
			var time = $(this).find('arrT').text();
			var train = new Date(parseInt(time.substr(0,4)), parseInt((time.substr(4,2) - 1)), parseInt(time.substr(6,2)), (parseInt((time.substr(9,2))) +1), parseInt(time.substr(12,2)), parseInt(time.substr(13,2))); // MAKESURE TO DELETE THE +1, that just accounts for
			var now = new Date();
			var when = train - now;
			when/=60000; // Get minutes from now from miliseconds from now
			when = Math.floor(when);
			if (when < 0) when = 0;
			if (parseInt($(this).find('trDr').text()) == 1) {
				trainNorth.append('<li class="'+$(this).find('rt').text().toLowerCase()+'">' + $(this).find('destNm').text() + ', ETA: ' + when + 'min</li>');
			} else {
				trainSouth.append('<li class="'+$(this).find('rt').text().toLowerCase()+'">' + $(this).find('destNm').text() + ', ETA: ' + when + 'min</li>');
			}

		});
	});

	schedule(function() {
		train();
	}, 1);
}
