var system = require('system');

// setup domains with default values
var firstDomain = 'publisher.localhost';
var thirdDomain = '.adsp.localhost';
if (system.args.length > 1)
	firstDomain = system.args[1];
if (system.args.length > 2)
	thirdDomain = system.args[2];


var cookies = phantom.cookies;
var cookies_by_domain = [];

for(var i in cookies) {
  if (cookies[i].name == 'adsp_di') {
	cookies_by_domain[cookies[i].domain] = cookies[i].value;	
  }
}

var reFirst = /[0-9lsv|=]*(di=[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/;
var reThird = /.*(di%3D[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/;

var matchFirst = reFirst.exec(cookies_by_domain[firstDomain])
var matchThird = reThird.exec(cookies_by_domain[thirdDomain])

var deviceFirst = null;
if (matchFirst) {
	deviceFirst = matchFirst[1].split('=');
	deviceFirst.shift();
}

var deviceThird = null;
if (matchThird) {
	deviceThird = matchThird[1].split('%3D');
	deviceThird.shift();
}


if (deviceFirst && deviceThird && String(deviceFirst) == String(deviceThird))
	console.log('SUCCESS');
else
	console.log('ERROR');


phantom.exit();
