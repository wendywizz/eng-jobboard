import React from "react"
import { Link } from "react-router-dom"
import ModalLogin from "Frontend/components/ModalLogin"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user"
import { ApplicantMenu, EmployerMenu } from "../UserMenu"

function HeaderNav() {
  const { authUser, authType, signout } = useAuth()
  
  const _handleLogout = () => {
    signout()
  }  

  const renderUserMenu = () => {
    switch (authType) {
      case APPLICANT_TYPE:
        return <ApplicantMenu onLogout={_handleLogout} displayName={authUser.email} />
      case EMPLOYER_TYPE:
        return <EmployerMenu onLogout={_handleLogout} displayName={authUser.email} />
      default:
        return <div />
    }
  }
  
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left" />
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          {
            authUser ? (
              renderUserMenu()
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
