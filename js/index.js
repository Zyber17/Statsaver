$(document).ready(function() {
	weatherInit();
	panels();
});

function panels() {
	bus();
	// train();
	weather();
	note();
	var refresh = setTimeout(function(){panels();}, 87000); // 1.45 Mins, set to just say withing the totally free Forecast.io free tier
}
