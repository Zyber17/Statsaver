var skycons, temp, high, low;

function weatherInit() {
	var canvas = $('#skycon')[0];

	canvas.width  = 256;
	canvas.height = 256;
	// canvas.style.width = "128px";
	// canvas.style.height = "128px";
	canvas.getContext('2d').scale(2,2);

	skycons = new Skycons({
		"monochrome": false,
		"colors" : {
			"main": "#ffffff",
  			"cloud": "#c8dee7",
  			"sun": "#febb09",
  			"moon": "#feeebe",
  			"fog": "#9aafb7",
  			"snow": "#ffffff",
  			"rain": "#29a3e1",
  			"leaf": "#e56e2f"
		}
	});
	skycons.add('skycon', Skycons.PARTLY_CLOUDY_NIGHT);
	skycons.play();

	temp = $('#temp');
	high = $('#high');
	low  = $('#low');

	weather();
}

function weather() {
	var url = 'https://api.forecast.io/forecast/' + window.forcastAPIKey + '/' + window.lat + ',' + window.long;
	$.getJSON(url, function(data) {
		temp.html(Math.round(data.currently.temperature));
		high.html(Math.round(data.daily.data[0].temperatureMax));
		low.html(Math.round(data.daily.data[0].temperatureMin));
		// $('#precip').html(Math.round(data.currently.precipProbability * 100));
		skycons.set('skycon', data.currently.icon);
	});

	schedule(function() {
		weather();
	}, 5);
}
