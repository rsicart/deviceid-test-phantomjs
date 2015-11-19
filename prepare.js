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
	},
	'user_accepts_only_first': {
		'all_is_empty': {
			'first': '',
			'third': '',
		},
		'cookie_third_is_empty': {
			'first': 'ls=1447859209770|v=1|di=1447859209.5be2fe18-5554-4378-42d2-7488f6ed93e1',
			'third': '',
		},
	},
	'user_accepts_only_third': {
		'all_is_empty': {
			'first': '',
			'third': '',
		},
		'cookie_first_is_empty': {
			'first': '',
			'third': 'ls%3D1447859209000%7Cv%3D1%7Cdi%3D1447859209.69696969-6969-6969-6969-696969696969',
		},
	},
}

// setup cookies
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
