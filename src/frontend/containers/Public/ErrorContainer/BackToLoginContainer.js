import React from 'react'
import Template from "Frontend/components/Template"
import { Link } from 'react-router-dom'
import { LOGIN_PATH } from 'Frontend/configs/paths'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import "./index.css"

export default function BackToLoginContainer() {
  return (
    <Template>
      <div className="page-error page-goto-login">        
        <h1 className="page-title"><FontAwesomeIcon icon={faExclamationTriangle} /> Session expired</h1>
        <p className="page-desc">กรุณาเข้าสู่ระบบใหม่อีกครั้ง</p>
        <Link className="btn btn-primary" to={LOGIN_PATH}>เข้าสู่ระบบ</Link>
      </div>
    </Template>
  )
}