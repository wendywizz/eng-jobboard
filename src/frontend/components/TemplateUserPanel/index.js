import React from "react"
import { Link, useLocation } from "react-router-dom"
import { Breadcrumb, BreadcrumbItem } from "reactstrap"
import className from "classnames"
import Template from "../Template"
import "./index.css"

function TemplateUserPanel({ navConfig, sidebarTitle, children }) {
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
            <h3>{sidebarTitle}</h3>
          </div>
          <div className="up-sidebar-body">
            {renderMenuItems()}
          </div>
        </div>
        <div className="template-content">
          {renderBreadcrumb()}
          <div className="inner-content">
            {children}
          </div>
        </div>
      </div>
    </Template>
  )
}
export default TemplateUserPanel