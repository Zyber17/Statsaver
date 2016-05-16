$(document).ready(function() {
	initalizePanels();
	setTimeout(refreshPanels(), 87000); // 1.45 Mins, set to just say withing the totally free Forecast.io free tier
});

function initalizePanels() {
	busInit();
	trainInit();
	weatherInit();
}

function refreshPanels() {
	busRefresh();
	trainRefresh();
	weatherRefresh();
}
