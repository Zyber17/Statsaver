var noteText;

function noteInit() {
	noteText = $('#noteText');
	note();
}

function note() {
	$.get(window.notePath + '?time=' + (new Date).getTime(), function(data) { // Append time to make sure we don't get a cached version
		if (/\S/.test(data)) {
			noteText.html(data.replace('\n','<br><br>'));
		} else {
			noteText.html('No note to see here');
		}
	}).fail(function() {
		noteText.html('No note to see here');
	});

	var noteRefresh = setTimeout(function () {
		note();
	}, nextMinute());
}
