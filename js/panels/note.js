var noteI, noteText, oldNote = 'ERROR', visible = true;

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
				if (visible) {
					noteText.fadeOut(1000, function() {
						noteText.html(data.replace('\n','<br><br>'));
						noteText.fadeIn(1000);
					});
				} else {
					noteText.html(data.replace('\n','<br><br>'));
				}
				visible = true;
			}
		} else {
			noteI.fadeOut(1000);
			visible = false;
		}
	}).fail(function() {
		noteI.fadeOut(1000);
		visible = false;
	});

	schedule(function() {
		note();
	}, 1);
}
