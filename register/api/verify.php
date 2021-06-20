<?php
  include_once "./config.php";
  $studentId = isset($_GET['id']) ? $_GET['id'] : null;

  if (!empty($studentId)) {
    header("Content-Type: Application/json");
    $conn = mysqli_connect($config->host, $config->username, $config->password, $config->database);

    if (mysqli_connect_errno()) {
      echo json_encode(array(
        'err_no'=>503,
        'message'=>'Failed to connect',
      ));
      exit();
    }
    $sql = 'SELECT * FROM R_STUDENT WHERE STUD_ID = "'.$studentId.'" LIMIT 1';    
    $result = $conn->query($sql);

    if ($conn->error) {      
      echo json_encode(array(
        'err_no'=>500,
        'message'=>$conn->error
      ));
      exit();
    }

    $resData = array();
    while ($row = $result->fetch_assoc()) {
      $resData['id'] = $row['STUD_ID'];
      $resData['first_name'] = iconv('tis-620', 'utf-8', $row['STU_NAME']);
      $resData['last_name'] = iconv('tis-620', 'utf-8', $row['STU_SNAME']);
    }

    echo json_encode(array(
      'item_count'=>1,
      'data'=>$resData
    ));

    $conn->close();  
  } else {
    echo json_encode(array(
      'err_no'=>400,
      'message'=>'Require parameter @id'
    ));
  }