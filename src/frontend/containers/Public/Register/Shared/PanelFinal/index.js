import React from "react"
import { Link } from "react-router-dom"
import Section from "Frontend/components/Section"
import { LOGIN_PATH, REGISTER_PATH } from "Frontend/configs/paths"
import imageRegistSuccess from "Frontend/assets/img/regist-final-success.png"
import imageRegistFailed from "Frontend/assets/img/regist-final-failed.png"
import "./index.css"

function ContentSuccess() {
  return (
    <div class="panel-final">
      <img className="image" src={imageRegistSuccess} alt="final-result" />
      <p className="desc">สมัครใช้งานเรียบร้อย ล็อกอินเข้าใช้งานได้ตามลิงค์ข้างใต้นี้</p>      
      <Link to={LOGIN_PATH} className="btn btn-success">ไปยังหน้าล็อกอิน</Link>      
    </div>
  )
}

function ContentFailed() {
  return (
    <div class="panel-final">
      <img className="image" src={imageRegistFailed} alt="final-result" />
      <p className="desc">สมัครใช้งานล้มเหลว โปรดกรุณาลองใหม่อีกครั้ง</p>
      <Link to={REGISTER_PATH} className="btn btn-danger">
        ลองใหม่อีกครั้ง
      </Link>
    </div>
  )
}

function PanelFinish({ registSuccess }) {
  return (
    <Section className="section-final">
      {
        registSuccess
        ? <ContentSuccess />
        : <ContentFailed />
      }
    </Section>
  )
}
export default PanelFinish