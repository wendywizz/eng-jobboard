import React from "react"
import { Link } from "react-router-dom"
import Section from "Frontend/components/Section"
import { LOGIN_PATH, REGISTER_PATH } from "Frontend/configs/paths"
import imgSuccess from "Frontend/assets/img/img-success.png"
import imgFailed from "Frontend/assets/img/img-failed.png"
import "./index.css"

function ContentSuccess() {
  return (
    <div className="panel-final">
      <img className="image" src={imgSuccess} alt="final-result" />
      <p className="desc">สมัครใช้งานเรียบร้อย ล็อกอินเข้าใช้งานได้ตามลิงค์ข้างใต้นี้</p>      
      <Link to={LOGIN_PATH} className="btn btn-success">ไปยังหน้าล็อกอิน</Link>      
    </div>
  )
}

function ContentFailed() {
  return (
    <div className="panel-final">
      <img className="image" src={imgFailed} alt="final-result" />
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