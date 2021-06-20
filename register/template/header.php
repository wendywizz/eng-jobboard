<?php
  function base_url(){
    if(isset($_SERVER['HTTPS'])){
        $protocol = ($_SERVER['HTTPS'] && $_SERVER['HTTPS'] != "off") ? "https" : "http";
    } else {
        $protocol = 'http';
    }

    return $protocol . "://" . $_SERVER['HTTP_HOST'] . "/eng-jobboard/register/";
  }
?>
<html>
  <head>    
    <link rel="stylesheet" href="<?= base_url(); ?>node_modules/bootstrap/dist/css/bootstrap.min.css" type="text/css" />
    <link rel="stylesheet" href="<?= base_url(); ?>node_modules/@fortawesome/fontawesome-free/css/all.min.css" type="text/css" />
    <link rel="stylesheet" href="<?= base_url(); ?>template/assets/font.css" type="text/css" />
    <link rel="stylesheet" href="<?= base_url(); ?>template/assets/style.css" type="text/css" />
    
    <script src="<?= base_url() ?>node_modules/jquery/dist/jquery.min.js" type="text/javascript"></script>
    <script src="<?= base_url() ?>node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" type="text/javascript"></script>
    <script src="<?= base_url() ?>node_modules/@fortawesome/fontawesome-free/js/all.min.js" type="text/javascript"></script>
    <script src="<?= base_url() ?>node_modules/axios/dist/axios.min.js" type="text/javascript"></script>
  </head>
  <body>