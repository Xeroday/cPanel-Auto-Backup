<?php
/*
cPanel Backup Script
https://github.com/Xeroday/cPanel-Auto-Backup
*/

$auth = base64_encode("username:password");
$domain = "https://example.com:2083";
$theme = "paper_lantern";
$ftp = false; # true - if you want to send by FTP
$email_radio = "0"; # 1 - receive notification after backup
$email = ""; # your email if you decide to receive notifications
$ftp_dest = "ftp"; # passiveftp - recommended for shared hosting
$ftp_server = "";
$ftp_username = "";
$ftp_password = "";
$ftp_port = "21";
$ftp_directory = "/";

// Do not change below
$url = $domain . "/frontend/" . $theme . "/backup/dofullbackup.html";
$data = array();
if ($ftp) {
  $data["email_radio"] = $email_radio;
  $data["email"] = $email;
  $data["dest"] = $ftp_dest;
  $data["server"] = $ftp_server;
  $data["user"] = $ftp_username;
  $data["pass"] = $ftp_password;
  $data["port"] = $ftp_port;
  $data["rdir"] = $ftp_directory;
}

$options = array(
  'http' => array(
    'header'  => "Content-type: application/x-www-form-urlencoded\r\nAuthorization: Basic $auth\r\n",
    'method'  => 'POST',
    'content' => http_build_query($data)
  ),
  'ssl' => array(
    'verify_peer' => false,
    'verify_peer_name' => false,
    'allow_self_signed' => true
  )
);

$context = stream_context_create($options);
$result = file_get_contents($url, false, $context);
if ($result === FALSE) {
  exit("Error backing up server.");
}

preg_match_all('/<div id=\"backupSuccessMsg(.+?)<\/div>/s', $result, $content);
$show = $content[0][0];
$filter = array('<div id="backupSuccessMsg" class="alert-message">
','<div>','</div>', '  ', '
');
$show = str_replace($filter, '', $show);
$show = str_replace('...', '... ', $show);
$show = str_replace('…', '... ', $show);
echo $show;