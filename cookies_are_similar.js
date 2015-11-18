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

// multiple device ids
var devicesFirst = [];
matchFirst.shift();
for (match in matchFirst) {
	res = match.split('=');
	devicesFirst.push(res[1])
}

var deviceThird = null;
if (matchThird) {
	deviceThird = matchThird[1].split('%3D');
	deviceThird.shift();
}


// cookie 3rd exists in cookie 1st
if (devicesFirst && deviceThird && devicesFirst.indexOf(deviceThird) > -1)
	console.log('SUCCESS');
else
	console.log('ERROR');

console.log('*******cookies_are_similar************');
var cookies = phantom.cookies;
for (var i in cookies) {
    if (cookies[i].name == 'adsp_di')
    	console.log(cookies[i].domain + ':: ' + cookies[i].name + '=' + cookies[i].value);
}
console.log('*******cookies_are_similar************');


console.log('##############################');
console.log(devicesFirst);
console.log(deviceThird);
console.log(devicesFirst.indexOf(deviceThird));
console.log('##############################');

phantom.exit();
