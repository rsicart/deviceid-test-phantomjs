// cookie 3rd exists in cookie 1st
if (devicesFirst && deviceThird && devicesFirst.indexOf(String(deviceThird)) > -1)
	console.log('SUCCESS ON [' + action + '] AND [' + subaction + ']');
else
	console.log('ERROR ON [' + action + '] AND [' + subaction + ']');
