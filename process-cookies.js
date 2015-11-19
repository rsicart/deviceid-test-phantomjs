var cookies = phantom.cookies;
var cookies_by_domain = [];

for(var i in cookies) {
  if (cookies[i].name == 'adsp_di') {
	cookies_by_domain[cookies[i].domain] = cookies[i].value;	
  }
}

var reFirst = /[0-9lsv|=]*(di=[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/g;
var reThird = /.*(di%3D[0-9]+\.[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})+/;

// can have multiple device ids
var devicesFirst = [];
var matchFirst = reFirst.exec(cookies_by_domain[firstDomain])
while (matchFirst) {
	res = matchFirst[1].split('=');
	devicesFirst.push(res[1]);
	matchFirst = reFirst.exec(cookies_by_domain[firstDomain])
}

// can have only one device id
var deviceThird = null;
var matchThird = reThird.exec(cookies_by_domain[thirdDomain])
if (matchThird) {
	deviceThird = matchThird[1].split('%3D');
	deviceThird.shift();
}


// delete 3rd, keep 1st
if (action == 'user_accepts_only_first') {
	deviceThird = null;
}

// delete 1st, keep 3rd
if (action == 'user_accepts_only_third') {
	devicesFirst = null;
}
