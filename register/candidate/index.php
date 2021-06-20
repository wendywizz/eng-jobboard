<?php
  $action = isset($_GET['action']) ? $_GET['action'] : null;

  switch ($action) {
    case 'verify': default:
      include_once 'verify.php';
      break;
    case 'filling':
      include_once 'filling.php';
      break;
  }
?>