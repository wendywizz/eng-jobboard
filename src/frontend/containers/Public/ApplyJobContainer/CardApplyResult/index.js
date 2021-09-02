import React from "react"
import { Card, CardBody } from "reactstrap"
import imgSuccess from "Frontend/assets/img/img-success.png"
import imgFailed from "Frontend/assets/img/img-failed.png"
import "./index.css"
import { Link } from "react-router-dom"
import { RESULT_PATH } from "Frontend/configs/paths"

export default function CardApplyResult({ success, message }) {
  return (
    <Card className="card-apply-result">
      <CardBody>
        {
          success ? (
            <>
              <img className="image" src={imgSuccess} alt="success" />
              <h1 className="title">{message}</h1>
              <p className="desc">ทางบริษัทได้รับข้อมูลของท่านแล้ว และจะดำเนินการติดต่อแจ้งผลการสมัครให้ท่านรวดเร็วที่สุด</p>              
            </>
          ) : (
            <>
              <img className="image" src={imgFailed} alt="failed" />
              <h1 className="title">เกิดข้อผิดพลาด</h1>  
              <p className="desc">{message}</p>              
            </>
          )
        }
        <Link to={RESULT_PATH} className="btn btn-primary btn-lg">ค้นหางานต่อ</Link>
      </CardBody>
    </Card>
  )
}