function noteInit() {
	note();
}

function note() {
	$.get(window.notePath + '?time=' + (new Date).getTime(), function(data) { // Append time to make sure we don't get a cached version
		if (/\S/.test(data)) {
			$('#note').html(data);
		} else {
			$('#note').html('No note to see here');
		}
	}).fail(function() {
		$('#note').html('No note to see here');
	});

	var noteRefresh = setTimeout(function () {
		note();
	}, 60000);
}
