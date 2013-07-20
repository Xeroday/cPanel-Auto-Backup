//https://server1.hostlatte.com:2083/cpsess5771243819/frontend/x3/index.html

$("#form").on("submit", function(e) {
  e.preventDefault();
});

function process() {
	init($('#form').serializeArray());

	var secure = false;
	var theme = 'x3'

	if (url.indexOf("https://") == 0) { //Check SSL
		secure = true;
	}

	if (url.indexOf("frontend/" + theme + "/") == -1) { //Get theme if not x3
		theme = url.substring(url.indexOf('frontend/') + 9, url.indexOf('/index'));
	}

	var domain = url.substring(url.indexOf('://') + 3, url.indexOf(':208')); //Only works if cPanel is on port 208x

	var header = [ //Build header
		'$auth = base64_encode("' + username + ':' + password + '");',
		'\t\t$domain = "' + domain + '";',
		'\t\t$theme = "' + theme + '";',
		'\t\t$secure = ' + secure + ';',
		'\t\t$params = "submit=Generate Backup' + '' + '";',
	].join('\n');

	code = code.replace('{{header}}', header);
	console.log(code);

	$('#result').val(code);

}

function init(data) {
	for (var i = 0; i < data.length; i++) {
		window[data[i].name] = data[i].value;
	}
}
