var expected = actionMapping[action][subaction]['expected'];

if (expected == 'equal') {
	// cookies are equal

	if (devicesFirst && deviceThird && String(devicesFirst) == String(deviceThird))
		console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
	else
		console.log('ERROR ON [' + action + '] AND [' + subaction + ']');

} else if (expected == 'cookie_third_in_cookie_first') {
	// cookie 1st contains cookie 3rd (cookie 1st can contain multiple device ids)

	if (devicesFirst && deviceThird && devicesFirst.indexOf(String(deviceThird)) > -1)
		console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
	else
		console.log('ERROR ON [' + action + '] AND [' + subaction + ']');

} else {

	// cookies are different
	if (devicesFirst && deviceThird && String(devicesFirst) != String(deviceThird))
		console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
	else if (devicesFirst && !deviceThird)
		console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
	else if (!devicesFirst && deviceThird)
		console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
	else
		console.log('ERROR ON [' + action + '] AND [' + subaction + ']');

}
