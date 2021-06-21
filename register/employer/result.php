<?php include_once("../template/header.php") ?>
<?php
$status = isset($_GET['status']) ? $_GET['status'] : 0;
?>
<div class="row">
  <div class="col-lg-5">
    <?php include_once "./inc/register-desc.php"; ?>
  </div>
  <div class="col-lg-6 offset-lg-1">
    <div class="panel-result">
      <?php if ($status === '1') : ?>
        <img class="image" src="<?= baseUrl() ?>assets/img/regist-successed.png" />
        <h3 class="title">ลงทะเบียนใช้งานเรียบร้อย</h3>
        <p class="desc">ท่านสามารถล็อกอินเข้าใช้งานได้ที่</p>
      <?php elseif ($status === '2') : ?>
        <img class="image" src="<?= baseUrl() ?>assets/img/regist-failed.png" />
        <h3 class="title">ลงทะเบียนใช้งานล้มเหลว</h3>
        <p class="desc">อีเมล <?= $_GET['email'] ?> ได้ถูกลงทะเบียนใช้งานไปแล้ว</p>
        <a class="btn btn-primary" href="<?= baseUrl() ?>employer"><i class="fas fa-chevron-left"></i> ย้อนกลับ</a>
      <?php else : ?>
        <img class="image" src="<?= baseUrl() ?>assets/img/regist-failed.png" />
        <h3 class="title">ลงทะเบียนใช้งานล้มเหลว</h3>
        <p class="desc">เกิดข้อผิดพลาดในการลงทะเบียน</p>
        <a class="btn btn-primary" href="<?= baseUrl() ?>employer"><i class="fas fa-redo"></i> ลองอีกครั้ง</a>
      <?php endif; ?>
    </div>
  </div>
</div>
<?php include_once("../template/footer.php") ?>