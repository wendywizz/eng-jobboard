<?php 
  include_once("../template/header.php") ?>

  <?php
    $code = isset($_GET['code']) ? $_GET['code'] : null;
    $student = null;
    if (!$code) {
      header('location: http://localhost/eng-jobboard/register/candidate');
      exit();
    } else {
      include_once("../lib/function.php");

      $data = verifyStudentCode($code);
      if ($data['item_count'] > 0) {
        $student = $data['data'];
      } else {
        header('location: http://localhost/eng-jobboard/register/candidate');
        exit();
      }
    }
  ?>
  <div class="row">
    <div class="col-lg-6">
      <div class="panel-desc">
        <h1 class="title">สมัครใช้งานสำหรับผู้หางาน</h1>
        <p class="sub-title">มีหลักฐานที่เป็นข้อเท็จจริงยืนยันมานานแล้ว ว่าเนื้อหาที่อ่านรู้เรื่องนั้นจะไปกวนสมาธิของคนอ่านให้เขวไปจากส่วนที้เป็น</p>
      </div>
    </div>
    <div class="col-lg-6">
      <form class="form-registration" id="form-registration">      
        <input type="hidden" id="code" value="<?= $code ?>" />  
        <div class="row">
          <div class="col-lg-6">
            <div class="form-group">
              <label for="firstname">ชื่อ</label>
              <input type="text" class="form-control form-control-lg" id="firstname" value="<?= $student['firstname'] ?>" />  
              <small class="invalid-feedback" id="fb-firstname"></small>  
            </div>
          </div>
          <div class="col-lg-6">
            <div class="form-group">
              <label for="lastname">นามสกุล</label>
              <input type="text" class="form-control form-control-lg" id="lastname" value="<?= $student['lastname'] ?>" />  
              <small class="invalid-feedback" id="fb-lastname"></small>  
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="email">อีเมล</label>
          <input type="email" class="form-control form-control-lg" name="email" id="email" placeholder="example@mail.com" value="example@gmail1.com">          
          <small class="invalid-feedback" id="fb-email"></small>  
        </div>
        <div class="form-group">
          <label for="password">รหัสผ่าน</label>
          <input type="password" class="form-control form-control-lg" name="password" id="password" value="T1212312121">
          <small class="invalid-feedback" id="fb-password"></small>  
        </div>
        <div class="form-group">
          <label for="cpassword">ยืนยันรหัสผ่าน</label>
          <input type="password" class="form-control form-control-lg" id="cpassword" value="T1212312121">
          <small class="invalid-feedback" id="fb-cpassword"></small>  
        </div>
        <button type="submit" id="btn-submit" class="btn btn-primary">สมัครใช้งาน</button>
      </form>
    </div>
  </div>

  <script type="text/javascript">      
    var inputFirstname = $('#firstname'), inputLastname = $('#lastname'), inputEmail = $('#email'), inputPassword = $('#password'), inputCpassword = $('#cpassword'), inputCode = $('#code')
    var fbFirstname = $('#fb-firstname'), fbLastname = $('#fb-lastname'), fbEmail = $('#fb-email'), fbPassword = $('#fb-password'), fbCpassword = $('#fb-cpassword')

    function validateEmail(email) {
      const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    }
    function validatePassword(value) {
      return value.match(/^([a-zA-Z0-9]{8,})$/) ? true : false
    }
    function validateIsEmpty(o, fb, message) {    
      var value = o.val()    
      if (!value) {
        o.addClass('is-invalid')
        fb.addClass('show').text(message)
        return false
      } else {
        o.removeClass('is-invalid')
        fb.removeClass('show').text('')
        return TextTrackCue
      }
    }

    $('#form-registration').submit(function(e) {
      e.preventDefault()
      $('#btn-submit').attr('disabled', 'disabled')

      var email = inputEmail.val()
      var password = inputPassword.val()    
      var cpassword = inputCpassword.val()

      // Validate Firstname and Lastname
      if (!validateIsEmpty(inputFirstname, fbFirstname, 'โปรดระบุชื่อ')) {
        return false
      }
      if (!validateIsEmpty(inputLastname, fbLastname, 'โปรดระบุนามสกุล')) {
        return false
      }
      
      // Validate email
      if (!validateEmail(email)) {
        inputEmail.addClass('is-invalid')
        fbEmail.addClass('show').text('รูปแบบอีเมลไม่ถูกต้อง')
        return false
      } else {
        inputEmail.removeClass('is-invalid')
        fbEmail.removeClass('show').text('')
      }

      // Validate password
      if (!validatePassword(password)) {
        inputPassword.addClass('is-invalid')
        fbPassword.addClass('show').text('รหัสผ่านควรประกอบไปด้วยอักขระ A-Z a-z และ 0-9 อย่างน้อย 8 อักขระ')
        return false
      } else {
        inputPassword.removeClass('is-invalid')
        fbPassword.removeClass('show').text('')
      }

      // Validate confirm password
      if (password !== cpassword) {
        inputCpassword.addClass('is-invalid')
        fbCpassword.addClass('show').text('รหัสผ่านยืนยันไม่ตรงกับรหัสผ่าน')
        return false
      } else {
        inputCpassword.removeClass('is-invalid')
        fbCpassword.removeClass('show').text('')
      }        
      
      const data = {
        username: inputCode.val(),
        email: inputEmail.val(),
        password: inputPassword.val(),  
        role: 'jobsearch_candidate',
        meta: {
          first_name: inputFirstname.val(),
          last_name: inputLastname.val()
        }
      }
      createUser(data)
    })

    function createUser(data) {
      const url = 'http://localhost/eng-jobboard/wp-json/wp/v2/users/register'
      axios.post(url, data)
        .then(function(res){
          alert('ลงทะเบียนเรียบร้อย') 
        })
        .catch(function(error){
          const data = error.response.data
          switch (data.code) {
            case 406:
              alert('รหัสนักศึกษา ' + inputCode.val() + ' ได้ลงทะเบียนแล้ว')
            break
            default:
              alert(data.message)
            break
          }
        })
    }
    
    $('#form-registration .form-control').focus(function(){
      inputPassword.removeClass('is-invalid')
      inputCpassword.removeClass('is-invalid')
      fbPassword.removeClass('show').text('')
      fbCpassword.removeClass('show').text('')
    })
  </script>
<?php include_once("../template/footer.php") ?>