function note() {
	$.get(window.notePath + '?time=' + (new Date).getTime(), function(data) {
		$('#note').html(data);
	}).fail(function() {
		$('#note').html('No note to see here');
	});
}
