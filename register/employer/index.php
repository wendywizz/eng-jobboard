<?php
include_once("../lib/function.php");
include_once("../template/header.php");
?>
<div class="row">
  <div class="col-lg-5">
    <?php include_once "./inc/register-desc.php"; ?>
  </div>
  <div class="col-lg-6 offset-lg-1">
    <form class="form-input form-registration" id="form-registration">
      <h3 class="title">ระบุข้อมูลเข้าใช้งาน</h3>
      <hr class="line" />
      <input type="hidden" id="code" value="<?= $code ?>" />
      <div class="form-group">
        <label for="company">ชื่อบริษัท</label>
        <input type="text" class="form-control form-control-lg" id="company" value="บริษัท ฮัลโหลวันหยุด จำกัด" />
        <small class="invalid-feedback" id="fb-company"></small>
      </div>
      <div class="form-group">
        <label for="email">อีเมล</label>
        <input type="email" class="form-control form-control-lg" id="email" placeholder="example@mail.com" value="company1@webmail.com">
        <small class="invalid-feedback" id="fb-email"></small>
      </div>
      <div class="form-group">
        <label for="password">รหัสผ่าน</label>
        <input type="password" class="form-control form-control-lg" id="password" value="T1212312121">
        <small class="invalid-feedback" id="fb-password"></small>
      </div>
      <div class="form-group">
        <label for="cpassword">ยืนยันรหัสผ่าน</label>
        <input type="password" class="form-control form-control-lg" id="cpassword" value="T1212312121">
        <small class="invalid-feedback" id="fb-cpassword"></small>
      </div>
      <div class="d-grid gap-2">
        <button type="submit" id="btn-submit" class="btn btn-primary">สมัครใช้งาน</button>
      </div>
    </form>
  </div>
</div>

<script type="text/javascript">
  var inputCompany = $('#company')
    inputEmail = $('#email'),
    inputPassword = $('#password'),
    inputCpassword = $('#cpassword')
  var fbCompany = $('#fb-company')
    fbEmail = $('#fb-email'),
    fbPassword = $('#fb-password'),
    fbCpassword = $('#fb-cpassword')
  var buttonSubmit = $('#btn-submit')

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
      return true
    }
  }

  $('#form-registration').submit(function(e) {
    e.preventDefault()
    $('#btn-submit').attr('disabled', 'disabled')

    var email = inputEmail.val()
    var password = inputPassword.val()
    var cpassword = inputCpassword.val()

    // Validate Firstname and Lastname
    if (!validateIsEmpty(inputCompany, fbCompany, 'โปรดระบุชื่อบริษัท')) {
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

    buttonSubmit.attr('disabled', 'disabled')
    buttonSubmit.html('<i class="fas fa-circle-notch fa-spin"></i> Loading...')

    setTimeout(function() {
      const data = {
        username: inputEmail.val(),
        email: inputEmail.val(),
        password: inputPassword.val(),
        role: 'jobsearch_employer'
      }
      createUser(data)
    }, 1000)
  })

  async function createUser(data) {
    const url = '<?= hostname() ?>/wp-json/wp/v2/users/register'
    await axios.post(url, data)
      .then(function(res) {
        window.location = '<?= baseUrl() ?>employer/result.php?status=1'
      })
      .catch(function(error) {
        const data = error.response.data
        switch (data.code) {
          case 406:
            window.location = '<?= baseUrl() ?>employer/result.php?status=2&email=' + inputEmail.val()
            break
          default:
            window.location = '<?= baseUrl() ?>employer/result.php?status=0'
            break
        }

        buttonSubmit.removeAttr('disabled')
        buttonSubmit.html('สมัครใช้งาน')
      })
  }

  $('#form-registration .form-control').focus(function() {
    inputPassword.removeClass('is-invalid')
    inputCpassword.removeClass('is-invalid')
    fbPassword.removeClass('show').text('')
    fbCpassword.removeClass('show').text('')
  })
</script>
<?php include_once("../template/footer.php") ?>