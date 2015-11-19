
var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

/*
* parse arguments
*/

if (system.args.length != 6) {
	console.log('Bad arguments.')
	console.log('Arguments: script targetUrl action subaction firstDomain thirdDomain')
	phantom.exit(1);
}

var targetUrl = 'http://publisher.localhost/publisher.html';
if (system.args.length > 1)
	targetUrl = system.args[1];


// setup action
var action = 'user_accepts_all';
if (system.args.length > 2)
	action = system.args[2];

// setup subaction
var subaction = 'all_is_empty';
if (system.args.length > 3)
	subaction = system.args[3];

// setup domains with default values
var firstDomain = 'publisher.localhost';
var thirdDomain = '.adsp.localhost';
if (system.args.length > 4)
	firstDomain = system.args[4];
if (system.args.length > 5)
	thirdDomain = system.args[5];


// prepare environment
phantom.cookiesEnabled=true;
phantom.clearCookies();
var wasSuccessful = phantom.injectJs('prepare.js');

// do da http shit
page.open(targetUrl, function (status) {
  //var cookies = phantom.cookies;
  //console.log('Listing 1st and 3rd party cookies:');
  //for(var i in cookies) {
  //  if (cookies[i].name == 'adsp_di')
  //  	console.log(cookies[i].domain + ':: ' + cookies[i].name + '=' + cookies[i].value);
  //}

	var wasSuccessful = phantom.injectJs('process-cookies.js');
	var wasSuccessful = phantom.injectJs('assert.js');
	var wasSuccessful = phantom.injectJs('print-result.js');

	phantom.exit();
});
