<?php include_once("../template/header.php") ?>

  <div class="row">
    <div class="col-lg-5">
      <?php include_once "./inc/register-desc.php"; ?>
    </div>
    <div class="col-lg-6 offset-lg-1">
      <form class="form-input form-verify" id="form-verify">     
        <h3 class="title">ตรวจสอบรหัสนักศึกษา</h3> 
        <hr class="line" />           
        <div class="form-group">        
          <label for="code">ระบุรหัสนักศึกษา</label>  
          <input type="text" class="form-control form-control-lg" id="code" placeholder="ระบุรหัสนักศึกษา" value="6410130007" />  
          <small class="invalid-feedback" id="fb-code"></small>  
        </div>      
        <br />
        <div class="d-grid gap-2" style="margin-bottom: 15px;">
          <button type="submit" id="btn-submit" class="btn btn-primary btn-block">ตรวจสอบ</button>
          <a class="btn btn-success hide" id="btn-next">ดำเนินการต่อ</a>
        </div>
        <div class="alert alert-danger hide" role="alert" id="alert-response" style="margin-bottom: 40px;"></div>        
        <div class="alert alert-info">
          <p><i class="fas fa-exclamation-triangle"></i> <b>หมายเหตุ</b> บริการนี้รองรับเฉพาะนักศึกษาและศิษย์เก่าคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่เท่านั้น</p>
        </div>
      </form>
    </div>
  </div>

  <script type="text/javascript">    
    var inputCode = $('#code')
    var fbCode = $('#fb-code')
    var alertRes = $('#alert-response')
    var buttonNext = $('#btn-next'), buttonSubmit = $('#btn-submit')    

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
      const url = '<?= baseUrl() ?>/api/verify.php'
      axios.get(url, { params: { code }})
        .then(function(res){
          var data = res.data

          buttonSubmit.attr('disabled', 'disabled')
          buttonSubmit.html('<i class="fas fa-circle-notch fa-spin"></i> กำลังตรวจสอบ')
          buttonNext.addClass('hide')

          setTimeout(function() {
            if (data.item_count <= 0) {
              alertRes.removeClass('hide').html('<i class="fas fa-exclamation-triangle"></i> ไม่พบรหัสนักศึกษา <b>' + code + '</b>')  
            } else {
              alertRes.addClass('hide').text('')
              buttonSubmit.addClass('hide')
              buttonNext.removeClass('hide')
              buttonNext.attr('href', '<?= baseUrl() ?>/candidate/filling.php?code='+code)            
            }

            buttonSubmit.removeAttr('disabled')
            buttonSubmit.html('ตรวจสอบ')
          }, 1500)
        })
    })

    $('#code').keypress(function(){
      buttonNext.addClass('hide')
      buttonNext.removeAttr('href')
      buttonSubmit.removeClass('hide')
    })
  </script>

<?php include_once("../template/footer.php") ?>