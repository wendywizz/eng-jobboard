<?php include_once("../template/header.php") ?>
<div class="container">
  <div class="row">
    <div class="col-lg-6">
      <div class="panel-desc">
        <h1 class="title">สมัครใช้งานสำหรับผู้หางาน</h1>
        <p class="sub-title">มีหลักฐานที่เป็นข้อเท็จจริงยืนยันมานานแล้ว ว่าเนื้อหาที่อ่านรู้เรื่องนั้นจะไปกวนสมาธิของคนอ่านให้เขวไปจากส่วนที้เป็น</p>
      </div>
    </div>
    <div class="col-lg-6">
      <form class="form-registration" id="form-register">
        <div class="form-group">
          <label for="email">อีเมลแอดเดรส</label>
          <input type="email" class="form-control form-control-lg" id="email" placeholder="example@mail.com">          
          <small class="invalid-feedback" id="fb-email"></small>  
        </div>
        <div class="form-group">
          <label for="password">รหัสผ่าน</label>
          <input type="password" class="form-control form-control-lg" id="password">
          <small class="invalid-feedback" id="fb-password"></small>  
        </div>
        <div class="form-group">
          <label for="cpassword">ยืนยันรหัสผ่าน</label>
          <input type="password" class="form-control form-control-lg" id="cpassword">
          <small class="invalid-feedback" id="fb-cpassword"></small>  
        </div>
        <button type="submit" id="btn-submit" class="btn btn-primary">สมัครใช้งาน</button>
      </form>
    </div>
  </div>
</div>
<script type="text/javascript">    
  var inputEmail = $('#email'), inputPassword = $('#password'), inputCpassword = $('#cpassword')
  var fbEmail = $('#fb-email'), fbPassword = $('#fb-password'), fbCpassword = $('#fb-cpassword')

  function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
  function validatePassword(value) {
    return value.match(/^([a-zA-Z0-9]{8,})$/) ? true : false
  }

  $('#form-register').submit(function(e) {
    e.preventDefault()
    var email = inputEmail.val()
    var password = inputPassword.val()    
    var cpassword = inputCpassword.val()
    
    // Validate email
    if (!validateEmail(email)) {
      inputEmail.addClass('is-invalid')
      fbEmail.addClass('show').text('รูปแบบอีเมลไม่ถูกต้อง')
      return
    } else {
      inputEmail.removeClass('is-invalid')
      fbEmail.removeClass('show').text('')
    }

    // Validate password
    if (!validatePassword(password)) {
      inputPassword.addClass('is-invalid')
      fbPassword.addClass('show').text('รหัสผ่านควรประกอบไปด้วยอักขระ A-Z a-z และ 0-9 อย่างน้อย 8 อักขระ')
      return
    } else {
      inputPassword.removeClass('is-invalid')
      fbPassword.removeClass('show').text('')
    }

    // Validate confirm password
    if (password !== cpassword) {
      inputCpassword.addClass('is-invalid')
      fbCpassword.addClass('show').text('รหัสผ่านยืนยันไม่ตรงกับรหัสผ่าน')
      return
    } else {
      inputCpassword.removeClass('is-invalid')
      fbCpassword.removeClass('show').text('')
    }
  })
  
  $('#form-register .form-control').focus(function(){
    inputPassword.removeClass('is-invalid')
    inputCpassword.removeClass('is-invalid')
    fbPassword.removeClass('show').text('')
    fbCpassword.removeClass('show').text('')
  })
</script>
<?php include_once("../template/footer.php") ?>