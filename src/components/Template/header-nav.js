import React from "react"
import { Link } from "react-router-dom"

function HeaderNav() {
  return (
    <div id="header-nav">
      <div clasName="header-nav-left">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="#">รับสมัครงาน</a></li>
          <li className="nav-item"><a className="nav-link" href="#">หางาน</a></li>
        </ul>
      </div>
      <div className="header-nav-right">
        <ul className="navbar-nav">
          <li className="nav-item"><Link className="nav-Link btn btn-primary btn-sm rounded">สมัครใช้งาน</Link></li>
          <li className="nav-item"><Link className="nav-Link btn btn-secondary btn-sm rounded">ล็อกอิน</Link></li>
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;
