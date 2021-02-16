import React, { useEffect, useState } from "react"
import { Spinner } from "reactstrap"
import TemplateUserPanel from "Frontend/components/TemplateUserPanel"
import { APPLICANT_PROFILE_PATH, APPLICANT_RESUME_PATH, APPLICANT_SETTING_PATH } from "Frontend/configs/paths"

function TemplateApplicant({ children }) {
  const [ready, setReady] = useState(false)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    setUserId(123)
    setReady(true)
  })

  function setNavConfig() {
    return [
      {
        text: "", children: [
          { text: "โปรไฟล์", link: APPLICANT_PROFILE_PATH(userId) },
          { text: "การสมัครงาน", link: APPLICANT_RESUME_PATH(userId) },
        ]
      },
      {
        text: "", children: [
          { text: "ตั้งค่า", link: APPLICANT_SETTING_PATH(userId) }
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