
var system = require('system');
phantom.cookiesEnabled=true;

if (system.args.length != 5) {
	console.log('Bad arguments.')
	console.log('Arguments: action subaction firstDomain thirdDomain')
	phantom.exit();
}

// setup action
var action = 'user_accepts_all';
if (system.args.length > 1)
	action = system.args[1];

// setup subaction
var subaction = 'all_is_empty';
if (system.args.length > 2)
	subaction = system.args[2];

// setup domains with default values
var firstDomain = 'publisher.localhost';
var thirdDomain = '.adsp.localhost';
if (system.args.length > 3)
	firstDomain = system.args[3];
if (system.args.length > 4)
	thirdDomain = system.args[4];


var actionMapping = {
	'user_accepts_all': {
		'all_is_empty': {
			'first': '',
			'third': '',
		},
		'cookie_third_is_empty': {
			'first': 'ls=1447859209770|v=1|di=1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
			'third': '',
		},
		'cookie_first_is_empty': {
			'first': '',
			'third': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
		},
		'cookies_contain_same_device_ids': {
			'first': 'ls=1447859209770|v=1|di=1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
			'third': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
		},
		'cookies_contain_different_device_ids': {
			'first': 'ls=1447859209770|v=1|di=1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
			'third': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D1447859209.69696969-6969-6969-6969-696969696969',
		},
	}
}

// setup cookies
phantom.clearCookies();
var cookieName = 'adsp_di';

if (actionMapping[action][subaction]['first']) {
	phantom.addCookie({
		'name': cookieName,
		'value': actionMapping[action][subaction]['first'],
		'domain': firstDomain,
	});
}

if (actionMapping[action][subaction]['third']) {
	phantom.addCookie({
		'name': cookieName,
		'value': actionMapping[action][subaction]['third'],
		'domain': thirdDomain,
	});
}

console.log('*******prepare************');
var cookies = phantom.cookies;
for (var i in cookies) {
    if (cookies[i].name == 'adsp_di')
    	console.log(cookies[i].domain + ':: ' + cookies[i].name + '=' + cookies[i].value);
}
console.log('*******prepare************');


phantom.exit();
