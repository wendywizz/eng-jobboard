<?php include_once("../template/header.php") ?>

  <div class="row">
    <div class="col-lg-6">
      <div class="panel-desc">
        <h1 class="title">สมัครใช้งานสำหรับผู้หางาน</h1>
        <p class="sub-title">มีหลักฐานที่เป็นข้อเท็จจริงยืนยันมานานแล้ว ว่าเนื้อหาที่อ่านรู้เรื่องนั้นจะไปกวนสมาธิของคนอ่านให้เขวไปจากส่วนที้เป็น</p>
      </div>
    </div>
    <div class="col-lg-6">
      <form class="form-registration" action="./action.php" method="post" id="form-registration">
        <div class="form-group">
          <label for="email">รหัสนักศึกษา</label>
          <input type="text" class="form-control form-control-lg" name="email" id="id" placeholder="ระบุรหัสนักศึกษา" />          
          <small class="invalid-feedback" id="fb-email"></small>  
        </div>      
        <button type="submit" id="btn-submit" class="btn btn-primary">ตรวจสอบ</button>
      </form>
    </div>
  </div>

<script src="../node_modules/axios/dist/axios.min.js"></script>

<?php include_once("../template/footer.php") ?>