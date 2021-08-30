import React from "react"
import { HOME_PATH } from "Frontend/configs/paths"
import navLogo from "Frontend/assets/img/nav-logo-inverse.png";
import UserMenu from "Frontend/components/Template/Header/UserMenu"
import "./index.css"

export default function NavHeader(props) {
  return (
    <div {...props} className={"nav-header" + (props.className ? " " + props.className : "")}>
      <div className="nav-inner">
        <div className="site-logo">
          <a href={HOME_PATH}>
            <img className="nav-logo" src={navLogo} alt="site logo" />
          </a>
        </div>
        <div className="right-panel">
          <UserMenu />
        </div>
      </div>
    </div>
  )
}