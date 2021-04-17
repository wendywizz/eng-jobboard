import React from "react"
import { Link, useHistory } from "react-router-dom"
import { AuthProvider, useAuth } from "Shared/context/AuthContext"
import "./index.css"
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user"
import { ApplicantMenu, EmployerMenu } from "../UserMenu"
import { HOME_PATH, LOGIN_PATH, REGISTER_PATH } from "Frontend/configs/paths"

function HeaderNavInner() {
  const { authUser, authType, signout } = useAuth()
  const history = useHistory()

  const _handleLogout = () => {
    signout()
    history.push(HOME_PATH)
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
    <>
      {
        authUser ? (
          renderUserMenu()
        ) : (
          <>
            <li className="nav-item"><Link to={REGISTER_PATH} className="nav-link btn btn-primary btn-sm">สมัครใช้งาน</Link></li>
            <li className="nav-item"><Link to={LOGIN_PATH} className="nav-link btn btn-secondary btm-sm">ล็อกอิน</Link></li>
          </>
        )
      }
    </>
  )
}
function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left" />
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          <AuthProvider>
            <HeaderNavInner />
          </AuthProvider>
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;
