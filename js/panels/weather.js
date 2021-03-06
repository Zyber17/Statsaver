var skycons, temp, high, low, wAlert;

function weatherInit() {
	var canvas = $('#skycon')[0];

	canvas.width  = 320;
	canvas.height = 320;

	if (window.is2x) {
		canvas.style.width = "160px";
		canvas.style.height = "160px";
		canvas.getContext('2d').scale(2,2);
	}

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
	var url = 'https://api.forecast.io/forecast/' + window.forcastAPIKey + '/' + window.lat + ',' + window.long + '?exclude=hourly,flags';
	console.log(url);
	$.getJSON(url, function(data) {
		$('#weatherAlert').fadeOut(1000);
		$('#weatherInfo').fadeIn(1000);

		temp.html(Math.round(data.currently.temperature));
		high.html(Math.round(data.daily.data[0].temperatureMax));
		low.html(Math.round(data.daily.data[0].temperatureMin));

		var rainSoon = false;
		for (var i = 0; i < 20; i++) {
			if (data.minutely.data[i].precipProbability >= 0.25) {
				rainSoon = true;
				break;
			}
		}
		skycons.set('skycon', (rainSoon ? 'rain' : data.currently.icon));

		if ("alert" in data || "alerts" in data) {
			$('#severeWeather').fadeIn(1000);
		} else {
			$('#severeWeather').fadeOut(1000);
		}



		schedule(function() {
			weather();
		}, 5);
	}).fail(function() {
		$('#weatherAlert').fadeIn(1000);
		$('#weatherInfo').fadeOut(1000);
	});
}
