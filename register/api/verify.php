<?php
  include_once '../lib/function.php';

  header("Content-Type: Application/json");

  $studentCode = isset($_GET['code']) ? $_GET['code'] : null;
  if (!empty($studentCode)) {
    $data = verifyStudentCode($studentCode);
    echo json_encode($data);
  } else {
    echo json_encode(array('error_code' => 400, 'error_message' => 'Require parameter @code'));
  }
?>