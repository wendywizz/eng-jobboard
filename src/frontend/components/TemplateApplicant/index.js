import React, { useState } from "react"
import { Spinner } from "reactstrap"
import TemplateUserPanel from "Frontend/components/TemplateUserPanel"
import { APPLICANT_PROFILE_PATH, /*APPLICANT_RESUME_PATH,*/ APPLICANT_SETTING_PATH } from "Frontend/configs/paths"

function TemplateApplicant({ children }) {
  const [ready] = useState(true)

  function setNavConfig() {
    return [
      {
        text: "", children: [
          { text: "โปรไฟล์ส่วนตัว", link: APPLICANT_PROFILE_PATH },
          //{ text: "การสมัครงาน", link: APPLICANT_RESUME_PATH },
        ]
      },
      {
        text: "", children: [
          { text: "ตั้งค่า", link: APPLICANT_SETTING_PATH }
        ]
      }
    ]
  }

  return (
    !ready ? <Spinner /> : (
      <TemplateUserPanel navConfig={setNavConfig()} sidebarTitle="Applicant Menu">
        {children}
      </TemplateUserPanel>
    )
  )
}
export default TemplateApplicant