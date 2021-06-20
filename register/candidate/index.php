<?php include_once("../template/header.php") ?>

  <div class="row">
    <div class="col-lg-6">
      <div class="panel-desc">
        <h1 class="title">สมัครใช้งานสำหรับผู้หางาน</h1>
        <p class="sub-title">มีหลักฐานที่เป็นข้อเท็จจริงยืนยันมานานแล้ว ว่าเนื้อหาที่อ่านรู้เรื่องนั้นจะไปกวนสมาธิของคนอ่านให้เขวไปจากส่วนที้เป็น</p>
      </div>
    </div>
    <div class="col-lg-6">
      <form class="form-verify" id="form-verify">
        <div class="form-group">
          <label for="code">ตรวจสอบรหัสนักศึกษา</label>
          <input type="text" class="form-control form-control-lg" id="code" placeholder="ระบุรหัสนักศึกษา" value="6410130007" />  
          <small class="invalid-feedback" id="fb-code"></small>  
        </div>      
        <button type="submit" id="btn-submit" class="btn btn-primary">ตรวจสอบ</button>
        <a class="btn btn-success hide" id="btn-next">ดำเนินการต่อ</a>
        <div class="alert alert-danger hide" role="alert" id="alert-response">
          This is a primary alert—check it out!
        </div>
      </form>
    </div>
  </div>

  <script type="text/javascript">    
    var inputCode = $('#code')
    var fbCode = $('#fb-code')
    var alertRes = $('#alert-response')
    var buttonNext = $('#btn-next')

    $('#form-verify').submit(function(e){
      e.preventDefault()

      const code = inputCode.val()
      if (!code) {
        inputCode.addClass('is-invalid')
        fbCode.addClass('show').text('โปรดระบุรหัสนักศึกษา')
        return
      } else {
        inputCode.removeClass('is-invalid')
        fbCode.removeClass('show').text('')
      }

      const data = { code }
      const url = 'http://localhost/eng-jobboard/register/api/verify.php'
      axios.get(url, { params: { code }})
        .then(function(res){
          var data = res.data

          if (data.item_count <= 0) {
            alertRes.removeClass('hide').text('ไม่พบรหัสนักศึกษา ' + code)
            buttonNext.addClass('hide')
          } else {
            alertRes.addClass('hide').text('')
            buttonNext.removeClass('hide')
            buttonNext.attr('href', 'http://localhost/eng-jobboard/register/candidate/filling.php?code='+code)
          }
        })
    })
  </script>

<?php include_once("../template/footer.php") ?>