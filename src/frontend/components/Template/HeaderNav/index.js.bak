import React from "react"
import { Link } from "react-router-dom"
import ModalLogin from "Frontend/components/ModalLogin"

import "./index.css"

function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="/employer/usr/123/profile">บริษัท</a></li>
          <li className="nav-item"><a className="nav-link" href="/applicant/usr/123/profile">ผู้หางาน</a></li>
        </ul>
      </div>
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/register" className="nav-Link btn btn-primary btn-sm">สมัครใช้งาน</Link></li>
          <li className="nav-item"><ModalLogin /></li>
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;
