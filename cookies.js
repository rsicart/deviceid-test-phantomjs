
var system = require('system');
var webPage = require('webpage');
var page = webPage.create();

phantom.cookiesEnabled=true;
console.log(phantom.cookiesEnabled);

var targetUrl = 'http://publisher.localhost/publisher.html';
if (system.args.length > 1)
	targetUrl = system.args[1];

// do da http shit
page.open(targetUrl, function (status) {
  //var cookies = phantom.cookies;
  //console.log('Listing 1st and 3rd party cookies:');
  //for(var i in cookies) {
  //  if (cookies[i].name == 'adsp_di')
  //  	console.log(cookies[i].domain + ':: ' + cookies[i].name + '=' + cookies[i].value);
  //}
  phantom.exit();
});
