var trainNorth, trainSouth;
var turl = 'http://lapi.transitchicago.com/api/1.0/ttarrivals.aspx?key=' + window.ctaTrainKey + '&mapid=' + window.trainStop;

function trainInit() {
	trainNorth = $('#trainNorth');
	trainSouth = $('#trainSouth');

	train();
}

function train() {
	var orgN = Infinity, orgS = Infinity, redN = Infinity, redS = Infinity, greN = Infinity, greS = Infinity;
	var orgNS, orgSS, redNS, redSS, greNS, greSS, greSSInv = false, orgND, orgSD, redND, redSD, greND, greSD;

	$.get(turl, function(data) {
		$('#trainNorthAlert').fadeOut(1000);
		$('#trainSouthAlert').fadeOut(1000);

		$(data).find('eta').each(function() {
			var when;
			if (parseInt($(this).find('isApp').text()) == 1) {
				when = 0;
			} else {
				var time = $(this).find('arrT').text();
				var train = new Date(parseInt(time.substr(0,4)), parseInt((time.substr(4,2) - 1)), parseInt(time.substr(6,2)), (parseInt((time.substr(9,2))) + window.timezoneOffset), parseInt(time.substr(12,2)), parseInt(time.substr(13,2)));
				var now = new Date();
				when = train - now;
				when/=60000; // Get minutes from now from miliseconds from now
				when = Math.floor(when);
				if (when < 0) when = 0;
			}

			if (parseInt($(this).find('trDr').text()) == 1) {
				if ($(this).find('rt').text() == 'Org' && when < orgN) {
					orgN  = when;
					orgNS = $(this).find('destNm').text();
					orgND = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
				} else if ($(this).find('rt').text() == 'Red' && when < redN) {
					redN  = when;
					redNS = $(this).find('destNm').text();
					redND = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
				} else if ($(this).find('rt').text() == 'G' && when < greN) {
					greN  = when;
					greNS = $(this).find('destNm').text();
					greND = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
				}
			} else {

				if ($(this).find('rt').text() == 'Org' && when < orgS) {
					orgS = when;
					orgSS = $(this).find('destNm').text();
					orgSD = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
				} else if ($(this).find('rt').text() == 'Red' && when < redS) {
					redS  = when;
					redSS = $(this).find('destNm').text();
					redSD = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
				} else if ($(this).find('rt').text() == 'G' && when < greS) {
					greS  = when;
					greSS = $(this).find('destNm').text();
					greSD = (parseInt($(this).find('isDly').text()) == 1 ? '*' : '');
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
			{eta: orgN, routeColor: 'org', routeName: orgNS, delay: orgND},
			{eta: redN, routeColor: 'red', routeName: redNS, delay: redND},
			{eta: greN, routeColor: 'gre', routeName: greNS, delay: greND}
		];

		var south = [
			{eta: orgS, routeColor: 'org', routeName: orgSS, delay: orgSD},
			{eta: redS, routeColor: 'red', routeName: redSS, delay: redSD},
			{eta: greS, routeColor: (greSSInv ? 'wht' : 'gre'), routeName: greSS, delay: greSD}
		];

		north.sort(function(a, b) {
			return a.eta - b.eta;
		});
		south.sort(function(a, b) {
			return a.eta - b.eta;
		});

		trainNorth.append('<ul id="trainNNew" class="fadeUL">');
		trainSouth.append('<ul id="trainSNew" class="fadeUL">');
		var nNew = $('#trainNNew'), sNew = $('#trainSNew'), nOld = $('#trainN'), sOld = $('#trainS');

		nNew.hide();
		sNew.hide();

		for (var i = 0; i < 3; i++) {
			nNew.append('<li class="'+north[i].routeColor+'">'+north[i].routeName.replace(/(\d)(th|rd)/,'$1<span class="th">$2</span>')+' <span class="min"> '+north[i].delay+(north[i].eta < 1 ? 'Due' : north[i].eta)+'</span></li>');
			sNew.append('<li class="'+south[i].routeColor+'">'+south[i].routeName.replace(/(\d)(th|rd)/,'$1<span class="th">$2</span>')+' <span class="min"> '+south[i].delay+(south[i].eta < 1 ? 'Due' : south[i].eta)+'</span></li>');
		}

		nNew.fadeIn(1000, function() {
			nOld.remove();
			nNew.attr("id","trainN");
		});

		sNew.fadeIn(1000, function() {
			sOld.remove();
			sNew.attr("id","trainS");
		});

		schedule(function() {
			train();
		}, 1);
	}).fail(function() {
		$('#trainN').fadeOut(1000);
		$('#trainS').fadeOut(1000);
		$('#trainNorthAlert').fadeIn(1000);
		$('#trainSouthAlert').fadeIn(1000);

		schedule((function() {
			train();
		}), 1);
	});

}
