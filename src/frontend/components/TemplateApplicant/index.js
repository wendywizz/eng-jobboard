import React from "react"
import TemplateUserPanel from "Frontend/components/TemplateUserPanel"
import { APPLICANT_PROFILE_PATH, /*APPLICANT_RESUME_PATH,*/ APPLICANT_SETTING_PATH } from "Frontend/configs/paths"

function TemplateApplicant({ children }) {
  
  function setNavConfig() {
    return [
      { text: "ข้อมูลส่วนตัว", link: APPLICANT_PROFILE_PATH },
      { text: "ตั้งค่า", link: APPLICANT_SETTING_PATH },
      { text: "ออกจากระบบ", link: "#" }
    ]
  }

  return (
    <TemplateUserPanel navConfig={setNavConfig()} sidebarTitle="Applicant Menu">
      {children}
    </TemplateUserPanel>
  )
}
export default TemplateApplicant