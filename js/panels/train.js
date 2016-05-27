var trainNorth, trainSouth;
var turl = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' + window.ctaTrainKey + '&mapid=' + window.trainStop;

function trainInit() {
	trainNorth = $('#trainN');
	trainSouth = $('#trainS');

	train();
}

function train() {
	var orgN = Infinity, orgS = Infinity, redN = Infinity, redS = Infinity, greN = Infinity, greS = Infinity;
	var orgNS, orgSS, redNS, redSS, greNS, greSS, greSSInv = false;

	$.get(turl, function(data) {
		$(data).find('eta').each(function() {
			var time = $(this).find('arrT').text();
			var train = new Date(parseInt(time.substr(0,4)), parseInt((time.substr(4,2) - 1)), parseInt(time.substr(6,2)), (parseInt((time.substr(9,2))) +1), parseInt(time.substr(12,2)), parseInt(time.substr(13,2))); // MAKESURE TO DELETE THE +1, that just accounts for
			var now = new Date();
			var when = train - now;
			when/=60000; // Get minutes from now from miliseconds from now
			when = Math.floor(when);
			if (when < 0) when = 0;


			if (parseInt($(this).find('trDr').text()) == 1) {
				if ($(this).find('rt').text() == 'Org' && when < orgN) {
					orgN  = when;
					orgNS = $(this).find('destNm').text()
				} else if ($(this).find('rt').text() == 'Red' && when < redN) {
					redN  = when;
					redNS = $(this).find('destNm').text();
				} else if ($(this).find('rt').text() == 'G' && when < greN) {
					greN  = when;
					greNS = $(this).find('destNm').text();
				}
			} else {

				if ($(this).find('rt').text() == 'Org' && when < orgS) {
					orgS = when;
					orgSS = $(this).find('destNm').text();
				} else if ($(this).find('rt').text() == 'Red' && when < redS) {
					redS  = when;
					redSS = $(this).find('destNm').text();
				} else if ($(this).find('rt').text() == 'G' && when < greS) {
					greS  = when;
					greSS = $(this).find('destNm').text();
					var stp = parseInt($(this).find('destSt').text());
					if (stp == 30139 || stp == 30140) {
						greSSInv = true;
					} else {
						greSSInv = false;
					}
				}
			}

		});

		var north = [
			{eta: orgN, routeColor: 'org', routeName: orgNS},
			{eta: redN, routeColor: 'red', routeName: redNS},
			{eta: greN, routeColor: 'gre', routeName: greNS}
		];

		var south = [
			{eta: orgS, routeColor: 'org', routeName: orgSS},
			{eta: redS, routeColor: 'red', routeName: redSS},
			{eta: greS, routeColor: (greSSInv ? 'wht' : 'gre'), routeName: greSS}
		];

		north.sort(function(a, b) {
			return a.eta - b.eta;
		});
		south.sort(function(a, b) {
			return a.eta - b.eta;
		});

		trainNorth.empty();
		trainSouth.empty();

		for (var i = 0; i < 3; i++) {
			trainNorth.append('<li class="'+north[i].routeColor+'">'+north[i].routeName.replace(/(\d)(th|rd)/,'$1<span class="th">$2</span>')+' <span class="min"> '+(north[i].eta < 1 ? 'Due' : north[i].eta)+'</span></li>');
			trainSouth.append('<li class="'+south[i].routeColor+'">'+south[i].routeName.replace(/(\d)(th|rd)/,'$1<span class="th">$2</span>')+' <span class="min"> '+(south[i].eta < 1 ? 'Due' : south[i].eta)+'<span></li>');
		}


		schedule(function() {
			train();
		}, 1);
	});

}
