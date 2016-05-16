function note() {
	$.get(window.notePath + '?time=' + (new Date).getTime(), function(data) {
		if (/\S/.test(data)) {
			$('#note').html(data);
		} else {
			$('#note').html('No note to see here');
		}
	}).fail(function() {
		$('#note').html('No note to see here');
	});
}
