var busI;
var burl = 'http://www.ctabustracker.com/bustime/api/v1/getpredictions?key=' + window.ctaBusKey + '&stpid=' + window.busStop;

function busInit() {
	busI = $('#bus');
	bus();
}

function bus() {
	busI.append('<ul id="busListN" class="fadeUL">');
	var bNew = $('#busListN'), bOld = $('#busList');
	bNew.hide();

	$.get(burl, function(data) {
		$(data).find('prd').each(function() {
			var time = $(this).find('prdtm').text();
			var train = new Date(parseInt(time.substr(0,4)), parseInt((time.substr(4,2) - 1)), parseInt(time.substr(6,2)), (parseInt((time.substr(9,2))) +1), parseInt(time.substr(12,2))); // MAKESURE TO DELETE THE +1, that just accounts for
			var now = new Date();
			var when = train - now;
			when/=60000; // Get minutes from now from miliseconds from now
			when = Math.floor(when);
			if (when < 0) when = 0;
			if (!(parseInt($(this).find('rt').text()) == 18 && parseInt($(this).find('stpid').text()) == 1580) && when > 0) {
				bNew.append('<li><span class="route">' + $(this).find('rt').text() + '</span> <span class="dest">' + $(this).find('des').text().replace(/(\d)(th|rd)/,'$1<span class="th">$2</span>') + '</span> <span class="min">' + (when < 1 ? 'Due' : when) + '</span></li>');
			}
		});

		bNew.fadeIn(1000, function() {
			bOld.remove();
			bNew.attr("id","busList");
		});

		schedule((function() {
			bus();
		}), 1);
	});
}
