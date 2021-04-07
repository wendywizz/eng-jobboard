import React from "react"
import { Button } from "reactstrap"
import { Link } from "react-router-dom"
import ModalLogin from "Frontend/components/ModalLogin"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"
import blankUser from "Frontend/assets/img/blank-user.jpg"

function HeaderNav() {
  const { currentUser, logout } = useAuth()
  
  const _handleLogout = () => {
    logout()
  }
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left" />
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          {
            currentUser ? (
              <li className="dropdown user user-menu open">
                <a href="#" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
                  <img src={blankUser} className="user-image" alt="User Image" />
                  <span className="hidden-xs">{currentUser.email}</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-right">
                  <li className="user-header">
                    <img src={blankUser} className="img-circle" alt="User Image" />
                    <p>{currentUser.email}</p>
                  </li>
                  <li className="user-footer">
                    <div className="pull-right">
                      <Button color="danger" block onClick={_handleLogout}>Sign out</Button>
                    </div>
                  </li>
                </ul>
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
