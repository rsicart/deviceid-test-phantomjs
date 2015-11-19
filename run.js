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
		test.assert(!!devicesFirst);
		casper.log('First: ' + devicesFirst.join(), 'debug');

		test.assert(!!devicesThird);
		casper.log('Third: ' + devicesThird.join(), 'debug');

		test.assertEquals(devicesFirst[0], devicesThird[0]);

    });

	casper.run(function() {
		test.done();
	});
});


casper.test.begin('user_accepts_all | cookie_third_is_empty', 4, function suite(test) {

	phantom.clearCookies();

	var deviceIdA = '1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1';
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls=1447859209770|v=1|di=' + deviceIdA,
		'domain': firstDomain,
	});

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
		test.assert(!!devicesFirst);
		casper.log('First: ' + devicesFirst.join(), 'debug');

		test.assert(!!devicesThird);
		casper.log('Third: ' + devicesThird.join(), 'debug');

		test.assertEquals(deviceIdA, devicesThird[0]); // original deviceId is kept
		test.assertEquals(devicesFirst[0], devicesThird[0]);
    });

	casper.run(function() {
		test.done();
	});
});


casper.test.begin('user_accepts_all | cookie_first_is_empty', 4, function suite(test) {

	phantom.clearCookies();

	var deviceIdA = '1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1';
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D' + deviceIdA,
		'domain': thirdDomain,
	});

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
		test.assert(!!devicesFirst);
		casper.log('First: ' + devicesFirst.join(), 'debug');

		test.assert(!!devicesThird);
		casper.log('Third: ' + devicesThird.join(), 'debug');

		test.assertEquals(deviceIdA, devicesFirst[0]); // original deviceId is kept
		test.assertEquals(devicesFirst[0], devicesThird[0]);

    });

	casper.run(function() {
		test.done();
	});
});


casper.test.begin('user_accepts_all | cookies_contain_same_device_ids', 4, function suite(test) {

	phantom.clearCookies();

	var deviceIdA = '1447859209.69696969-6969-6969-6969-696969696969';
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls=1447859209000|v=1|di=' + deviceIdA,
		'domain': firstDomain,
	});
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D' + deviceIdA,
		'domain': thirdDomain,
	});

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
		test.assert(!!devicesFirst);
		casper.log('First: ' + devicesFirst.join(), 'debug');

		test.assert(!!devicesThird);
		casper.log('Third: ' + devicesThird.join(), 'debug');

		test.assertEquals(deviceIdA, devicesFirst[0]); // original deviceId is kept
		test.assertEquals(devicesFirst[0], devicesThird[0]);

    });

	casper.run(function() {
		test.done();
	});
});


casper.test.begin('user_accepts_all | cookies_contain_different_device_ids', 6, function suite(test) {

	phantom.clearCookies();
	var deviceIdA = '1447859209.11111111-1111-1111-1111-111111111111';
	var deviceIdB = '1447859209.69696969-6969-6969-6969-696969696969';
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls=1447859209000|v=1|di=' + deviceIdA,
		'domain': firstDomain,
	});
	phantom.addCookie({
		'name': 'adsp_di',
		'value': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D' + deviceIdB,
		'domain': thirdDomain,
	});

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
		test.assert(!!devicesFirst);
		casper.log('First: ' + devicesFirst.join(), 'debug');

		test.assert(!!devicesThird);
		casper.log('Third: ' + devicesThird.join(), 'debug');

		test.assertEquals(deviceIdB, devicesFirst[0]); // third deviceId is added to first deviceId
		test.assertEquals(deviceIdA, devicesFirst[1]); // original deviceId is kept
		test.assertEquals(deviceIdB, devicesThird[0]); // original deviceId is kept

		test.assertEquals(devicesFirst[0], devicesThird[0]);

    });

	casper.run(function() {
		test.done();
	});
});
