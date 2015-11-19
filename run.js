/********************
 * Script arguments
 ********************/
if (!casper.cli.has("target-url"))
	casper.exit(1);
var targetUrl = casper.cli.get('target-url');

if (!casper.cli.has("domain-first"))
	casper.exit(1);
var firstDomain = casper.cli.get('domain-first');

if (!casper.cli.has("domain-third"))
	casper.exit(1);
var thirdDomain = casper.cli.get('domain-third');



/**********
 * Helpers
 **********/

/**
 * Returns an array of 'adsp_di' cookies classified by domain
 * @param cookies phantom.cookies
 * @returns array
 */
function getCookiesByDomain(cookies) {
	var cookies_by_domain = [];
	for(var i in cookies) {
		if (cookies[i].name == 'adsp_di') {
			cookies_by_domain[cookies[i].domain] = cookies[i].value;    
		}
	}
	return cookies_by_domain;
}

/**
 * Returns an array of device ids 
 * @param regexp pattern
 * @param separator to split captured values
 * @param cookies string
 * @returns array
 */
function getDeviceIdsByDomain(regexp, separator, cookies) {
	var devices = [];
	var matches = regexp.exec(cookies)
	while (matches) {
		res = matches[1].split(separator);
		devices.push(res[1]);
		matches = regexp.exec(cookies)
	}
	return devices;
}



/**************
 * Test suites
 **************/
casper.test.begin('user_accepts_all | all_is_empty', 3, function suite(test) {

	phantom.clearCookies();

    casper.start(targetUrl, function() {
    });

    casper.then(function() {
		/*
		 * catch cookies
		 */
		var cookies_by_domain = getCookiesByDomain(phantom.cookies);

		// set regexps
		var reFirst = /[0-9lsv|=]*(di=[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/g;
		var reThird = /.*(di%3D[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/g;

		// get device ids
		var devicesFirst = getDeviceIdsByDomain(reFirst, '=', cookies_by_domain[firstDomain]);
		var devicesThird = getDeviceIdsByDomain(reThird, '%3D', cookies_by_domain[thirdDomain]);

		/*
		 * assertions
		 */
		test.assert(devicesFirst && true);
		test.assert(devicesThird && true);
		test.assertEquals(String(devicesFirst.shift()), String(devicesThird.shift()));

    });

	casper.run(function() {
		test.done();
	});
});


casper.test.begin('user_accepts_all | cookie_third_is_empty', 3, function suite(test) {

	var targetUrl = "http://publisher.localhost/publisher.html";
	var firstDomain = "publisher.localhost";
	var thirdDomain = ".adsp.localhost";

	phantom.clearCookies();

    casper.start(targetUrl, function() {
    });

    casper.then(function() {
		/*
		 * catch cookies
		 */
		var cookies_by_domain = getCookiesByDomain(phantom.cookies);

		// set regexps
		var reFirst = /[0-9lsv|=]*(di=[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/g;
		var reThird = /.*(di%3D[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/g;

		// get device ids
		var devicesFirst = getDeviceIdsByDomain(reFirst, '=', cookies_by_domain[firstDomain]);
		var devicesThird = getDeviceIdsByDomain(reThird, '%3D', cookies_by_domain[thirdDomain]);

		/*
		 * assertions
		 */
		test.assert(devicesFirst && true);
		test.assert(devicesThird && true);
		test.assertEquals(String(devicesFirst.shift()), String(devicesThird.shift()));

    });

	casper.run(function() {
		test.done();
	});
});
