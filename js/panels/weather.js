var skycons;

function weatherInit() {
	skycons = new Skycons({
		"monochrome": false,
		"colors" : {
			"main": "black",
			"cloud": "blue",
			"sun": "#F0F",
		}
	});
	skycons.add('skycon', Skycons.PARTLY_CLOUDY_NIGHT);
	skycons.play();
	weather();
}

function weather() {
	var url = 'https://api.forecast.io/forecast/' + window.forcastAPIKey + '/' + window.lat + ',' + window.long;
	$.getJSON(url, function(data) {
		$('#temp').html(Math.round(data.currently.temperature));
		$('#high').html(Math.round(data.daily.data[0].temperatureMin));
		$('#low').html(Math.round(data.daily.data[0].temperatureMax));
		// $('#precip').html(Math.round(data.currently.precipProbability * 100));
		skycons.set('skycon', data.currently.icon);
	});

	var weatherRefresh = setTimeout(function () {
			weather();
	}, 120000);
}
