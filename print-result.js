console.log('Contents:');
console.log('-> Cookie 1st contains: ' + devicesFirst);
console.log('-> Cookie 3rd contains: ' + deviceThird);
console.log('');
/*
var cookies = phantom.cookies;
for (var i in cookies) {
    if (cookies[i].name == 'adsp_di')
    	console.log(cookies[i].domain + ':: ' + cookies[i].name + '=' + cookies[i].value);
}
*/
phantom.exit();
