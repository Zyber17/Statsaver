var noteI, noteText, oldNote = 'ERROR';

function noteInit() {
	noteI    = $('#note');
	noteText = $('#noteText');
	note();
}

function note() {
	$.get(window.notePath + '?time=' + (new Date).getTime(), function(data) { // Append time to make sure we don't get a cached version
		if (/\S/.test(data)) {
			if(data != oldNote) {
				oldNote = data;
				noteI.fadeIn(1000);
				noteText.fadeOut(1000, 'swing', false, function() {
					noteText.html(data.replace('\n','<br><br>'));
					noteText.fadeIn(1000);
				});
			}
		} else {
			noteI.fadeOut(1000);
		}
	}).fail(function() {
		noteI.fadeOut(1000);
	});

	schedule(function() {
		note();
	}, 1);
}
