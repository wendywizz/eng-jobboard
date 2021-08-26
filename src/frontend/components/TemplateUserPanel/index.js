import React from "react"
import { Link, useHistory } from "react-router-dom"
import Template from "../Template"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import { HOME_PATH } from "Frontend/configs/paths"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPowerOff } from "@fortawesome/free-solid-svg-icons"

function TemplateUserPanel({ navConfig, showLogoutMenu = true, children }) {
  const { authUser, authType, signout } = useAuth()
  const history = useHistory()

  const _handleSignout = () => {
    signout()

    history.push(HOME_PATH)
  }

  const renderMenuItems = () => {
    return (
      <ul>
        {
          navConfig && navConfig.map((value, index) => {
            return (
              <li key={index}>
                <Link to={value.link} className="nav-link">
                  <div className="item">
                    <div className="icon">
                      {value.icon}
                    </div>
                    {value.text}
                  </div>
                </Link>
              </li>
            )
          })
        }
        {
          showLogoutMenu && (
            <li>
              <span onClick={_handleSignout} className="nav-link">
                <div className="item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faPowerOff} />
                  </div>
                  ออกจากระบบ
                </div>
              </span>
            </li>
          )
        }
      </ul>
    )
  }

  return (
    <Template>
      <div className="container-main">
        <div className="up-sidebar">
          <div className="up-sidebar-header">
            <div className="up-info">
              <div className="detail">
                <div className="position">
                  {
                    authType === EMPLOYER_TYPE ? "ผู้จัดหางาน" : "ผู้สมัครงาน"
                  }
                </div>
                <div className="name">Login as: {authUser ? authUser.email : "n/a"}</div>
              </div>
            </div>
          </div>
          <div className="up-sidebar-body">
            {renderMenuItems()}
          </div>
        </div>
        <div className="template-content">
          <div className="inner-content">
            {children}
          </div>
        </div>
      </div>
    </Template>
  )
}
export default TemplateUserPanel