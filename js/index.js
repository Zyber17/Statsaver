$(document).ready(function() {
	weatherInit();
	panels();
	setTimeout(panels(), 87000); // 1.45 Mins, set to just say withing the totally free Forecast.io free tier
});

function panels() {
	bus();
	train();
	weather();
}
