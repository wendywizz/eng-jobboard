import React from "react"
import TemplateUserPanel from "Frontend/components/TemplateUserPanel"
import { EMPLOYER_JOB_PATH, EMPLOYER_PROFILE_PATH, /*EMPLOYER_RESUME_PATH,*/ EMPLOYER_SETTING_PATH } from "Frontend/configs/paths"
import { CompanyProvider } from "Shared/context/CompanyContext"

function TemplateEmployer({ children }) {

  function setNavConfig() {
    return [
      {
        text: "", children: [
          { text: "ข้อมูลบริษัท", link: EMPLOYER_PROFILE_PATH }
        ]
      },
      {
        text: "", children: [
          { text: "จัดการงาน", link: EMPLOYER_JOB_PATH },
          /*{ text: "รายการสมัครงาน", link: EMPLOYER_RESUME_PATH },*/
        ]
      },
      {
        text: "", children: [
          { text: "ตั้งค่า", link: EMPLOYER_SETTING_PATH }
        ]
      }
    ]
  }

  return (
    <TemplateUserPanel
      navConfig={setNavConfig()}
      sidebarTitle="Employer Menu"
    >
      <CompanyProvider>
        {children}
      </CompanyProvider>
    </TemplateUserPanel>
  )
}
export default TemplateEmployer