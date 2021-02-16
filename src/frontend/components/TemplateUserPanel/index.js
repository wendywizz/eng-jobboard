import React from "react"
import { Link } from "react-router-dom"
import Template from "../Template"
import "./index.css"

function TemplateUserPanel({ navConfig, sidebarTitle, children }) {
  return (
    <Template>
      <div className="container-main">
        <div className="up-sidebar">
          <div className="up-sidebar-header">
            <h3>{sidebarTitle}</h3>
          </div>
          <div className="up-sidebar-body">
            <ul>
            {
              navConfig && navConfig.map((value, index) => {
                if (value.children && (value.children.length > 0)) {
                  return (
                    <li key={index} className="group">
                      <ul>
                        {
                          value.children.map((cValue, cIndex) => (
                            <li key={cIndex}>
                              <Link to={cValue.link}>{cValue.text}</Link>
                            </li>
                          ))
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