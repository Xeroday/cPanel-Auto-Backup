$("#form").on("submit", function(e) {
  e.preventDefault();
});

function process() {
	init($('#form').serializeArray());

	var secure = false;
	var ftp = false;
	var theme = 'x3'

	if (url.indexOf("https://") == 0) { //Check SSL
		secure = true;
	}

	if (url.indexOf("frontend/" + theme + "/") == -1) { //Get theme if not x3
		theme = url.substring(url.indexOf('frontend/') + 9, url.indexOf('/index'));
	}

	var domain = url.substring(url.indexOf('://') + 3, url.indexOf(':208')); //Only works if cPanel is on port 208x

	if (ftpserver.length > 0) {
		ftp = true;
	}

	var header = [ //Build header
		'$auth = base64_encode("' + username + ':' + password + '");',
		'$domain = "' + domain + '";',
		'$theme = "' + theme + '";',
		'$secure = ' + secure + ';',
		'$ftp = ' + ftp + ';',
		'$ftpserver = "' + ftpserver + '";',
		'$ftpusername = "' + ftpusername + '";',
		'$ftppassword = "' + ftppassword + '";',
		'$ftpport = "' + ftpport + '";',
		'$ftpdirectory = "' + ftpdirectory + '";'
	].join('\n');

	code = code.replace('{{header}}', header);

	$('#result').val(code);
	document.location.href="#result";
}

function init(data) {
	for (var i = 0; i < data.length; i++) {
		window[data[i].name] = data[i].value;
	}
}
