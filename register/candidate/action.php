<?php
  include "../../wp-includes/user.php";

  $action = $_POST['action'];

  switch ($action) {
    case "insert":
      print_r($_POST);
    break;
    default:
      echo "test";
    break;
  }
?>