import React from "react"
import { Link } from "react-router-dom"
import Template from "../Template"
import { EMPLOYER_JOB_PATH, EMPLOYER_RESUME_PATH, EMPLOYER_SETTING_PATH } from "Frontend/configs/paths"
import "./index.css"

function TemplateEmployer({ children }) {
  return (
    <Template>
      <div className="container-main">
        <div className="sidebar">
          <div className="sidebar-header">
            <h3>Employer Zone</h3>
          </div>
          <div className="sidebar-body">
            <ul>
              <li className="group">
                <ul>
                  <li><Link to={EMPLOYER_JOB_PATH(123)}>จัดการงาน</Link></li>
                  <li><Link to={EMPLOYER_RESUME_PATH(123)}>ใบสมัครงาน</Link></li>
                </ul>
              </li>
              <li className="group">
                <ul>
                  <li><Link to={EMPLOYER_SETTING_PATH(123)}>การตั้งค่า</Link></li>
                </ul>
              </li>
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
export default TemplateEmployer