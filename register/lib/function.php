<?php
  function verifyStudentCode($code) {
    $conn = mysqli_connect('phoenix.eng.psu.ac.th', 'usrPloy', 'lesiy[Ploy', 'PloyLora');

    if (mysqli_connect_errno()) {        
      return array('error_code' => 503, 'error_message' => 'Failed to connect');
    }
    $sql = 'SELECT * FROM R_STUDENT WHERE STUD_ID = "'.$code.'" LIMIT 1';    
    $result = $conn->query($sql);

    if ($conn->error) {
      return array('error_code' => 500, 'error_message' => $conn->error);
    }

    $resData = array();
    while ($row = $result->fetch_assoc()) {
      $resData['code'] = $row['STUD_ID'];
      $resData['firstname'] = iconv('tis-620', 'utf-8', $row['STU_NAME']);
      $resData['lastname'] = iconv('tis-620', 'utf-8', $row['STU_SNAME']);
    }
    $conn->close();  

    return array('item_count'=>count($resData) > 1 ? 1 : 0, 'data'=>$resData);
  }
?>