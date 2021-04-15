import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import className from "classnames"
import Template from "../Template"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"

import defaultAvatar from "Frontend/assets/img/default-logo.jpg"
import { EMPLOYER_TYPE } from "Shared/constants/user"

function TemplateUserPanel({ navConfig, children }) {
  const { currentCompany, currentUser, authType } = useAuth()
  const { pathname } = useLocation()

  const renderMenuItems = () => {
    return (
      <ul>
        {
          navConfig && navConfig.map((value, index) => {
            if (value.children && (value.children.length > 0)) {
              return (
                <li key={index} className="group">
                  <ul>
                    {
                      value.children.map((cValue, cIndex) => {
                        const classes = className({
                          "active": cValue.link === pathname ? true : false
                        })
                        return (
                          <li key={cIndex} className={classes}>
                            <Link to={cValue.link}>{cValue.text}</Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </li>
              )
            } else {
              return (
                <li key={index}>
                  <Link to={value.link}>{value.text}</Link>
                </li>
              )
            }
          })

        }
      </ul>
    )
  }

  const renderBreadcrumb = () => {
    return (
      <Breadcrumb>
        <BreadcrumbItem active>Home</BreadcrumbItem>
      </Breadcrumb>
    )
  }

  return (
    <Template>
      <div className="container-main">
        <div className="up-sidebar">
          <div className="up-sidebar-header">
            <div className="up-info">
              <div className="image">
                <img className="img-thumbnail" src={defaultAvatar} alt="user-avatar" />
              </div>
              <div className="detail">
                <div className="name">{currentUser ? currentUser.email : "n/a"}</div>
                <div className="position">
                  {
                    authType === EMPLOYER_TYPE ? "ผู้จัดหางาน" : "ผู้สมัครงาน"
                  }
                </div>
              </div>
            </div>
          </div>
          <div className="up-sidebar-body">
            {renderMenuItems()}
          </div>
        </div>
        <div className="template-content">
          {renderBreadcrumb()}
          <div className="inner-content">            
            { React.cloneElement(children, { 
                userId: currentUser && currentUser.localId, 
                companyId: currentCompany && currentCompany.id 
              }) 
            }
          </div>
        </div>
      </div>
    </Template>
  )
}
export default TemplateUserPanel