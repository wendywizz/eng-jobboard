<?php
  include "../../wp-includes/user.php";

  $action = $_POST['action'];

  switch ($action) {
    case "insert":
      $email = $_POST['email'];
      $password = $_POST['password'];

      echo $email . ' ' .$password;
    break;
    default:
      echo "test";
    break;
  }
?>