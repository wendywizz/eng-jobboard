import React, { useState } from "react"
import { Link } from "react-router-dom"
import ModalLogin from "Frontend/components/ModalLogin"
import "./index.css"

function HeaderNav() {
  const [loggedIn, setLoggedIn] = useState(false)
  
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left" />
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          {
            loggedIn ? (
              <li className="nav-item dropdown">
                <span className="nav-link btn btn-transparent dropdown-toggle" role="button" data-toggle="dropdown">
                  Stevie                  
                </span>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="http://www.google.co.th">Action</a>
                </div>
              </li>
            ) : (
              <>
                <li className="nav-item"><Link to="/register" className="nav-Link btn btn-primary btn-sm">สมัครใช้งาน</Link></li>
                <li className="nav-item"><ModalLogin /></li>
              </>
            )
          }
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;
