$("#form").on("submit", function(e) {
  e.preventDefault();
});

function process() {
	init($('#form').serializeArray());

	var theme = url.substring(url.indexOf('frontend/') + 9, url.indexOf('/index.html'));
	var domain = url.substring(0, url.indexOf(':208') + 5); // Only works while cPanel runs on 208x
  var ftp = (ftpserver.length > 0);

	var header = [ //Build header
		'$auth = base64_encode("' + username + ':' + password + '");',
		'$domain = "' + domain + '";',
		'$theme = "' + theme + '";',
		'$ftp = ' + ftp + ';',
		'$ftp_server = "' + ftpserver + '";',
		'$ftp_username = "' + ftpusername + '";',
		'$ftp_password = "' + ftppassword + '";',
		'$ftp_port = "' + ftpport + '";',
		'$ftp_directory = "' + ftpdirectory + '";'
	].join('\n');

	code = code.replace('{{header}}', header);

	$('#result').val(code);
	document.location.href="#submitButton";
}

function init(data) {
	for (var i = 0; i < data.length; i++) {
		window[data[i].name] = data[i].value;
	}
}
