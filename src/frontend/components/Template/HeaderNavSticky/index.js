import React from "react"
import { HOME_PATH } from "Frontend/configs/paths"
import navLogo from "Frontend/assets/img/nav-logo-inverse.png";
import "./index.css"

function HeaderNavSticky() {
  return (
    <div className="header-nav-sticky">
      <div className="header-nav-inner">
        <div className="site-logo">
          <a href={HOME_PATH}>
            <img className="nav-logo" src={navLogo} alt="site logo" />
          </a>
        </div>
        <div className="header-menu">
        </div>
      </div>
    </div>
  )
}
export default HeaderNavSticky