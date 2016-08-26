<?php
/*
cPanel Backup Script
https://github.com/Xeroday/cPanel-Auto-Backup
*/

$auth = base64_encode("username:password");
$domain = "https://example.com:2083";
$theme = "paper_lantern";
$ftp = false;
$ftp_server = "";
$ftp_username = "";
$ftp_password = "";
$ftp_port = "21";
$ftp_directory = "/";

// Do not change below
$url = $domain . "/frontend/" . $theme . "/backup/dofullbackup.html";
$data = array();
if ($ftp) {
  $data["dest"] = "ftp";
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

echo $result;
?>
