import React from "react"
import { Link } from "react-router-dom"
import ModalLogin from "frontend/components/ModalLogin"

function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="#">รับสมัครงาน</a></li>
          <li className="nav-item"><a className="nav-link" href="#">หางาน</a></li>
        </ul>
      </div>
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/register" className="nav-Link btn btn-primary btn-sm rounded">สมัครใช้งาน</Link></li>
          <li className="nav-item"><ModalLogin /></li>
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;
