import React from "react";
import TemplateUserPanel from "Frontend/components/TemplateUserPanel";
import {
  APPLICANT_APPLYING_PATH,
  APPLICANT_PROFILE_PATH,
  APPLICANT_RESUME_PATH,
  /*APPLICANT_RESUME_PATH,*/ APPLICANT_SETTING_PATH,
} from "Frontend/configs/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faFileAlt, faRedo, faUser } from "@fortawesome/free-solid-svg-icons";
import { StudentProvider } from "Shared/context/StudentContext";

function TemplateApplicant({ children }) {
  function setNavConfig() {
    return [
      {
        text: "ข้อมูลส่วนตัว",
        link: APPLICANT_PROFILE_PATH,
        icon: <FontAwesomeIcon icon={faUser} />,
      },
      {
        text: "ใบสมัครงาน",
        link: APPLICANT_RESUME_PATH,
        icon: <FontAwesomeIcon icon={faFileAlt} />
      },
      {
        text: "งานที่กำลังสมัคร",
        link: APPLICANT_APPLYING_PATH,
        icon: <FontAwesomeIcon icon={faRedo} />
      },
      {
        text: "ตั้งค่า",
        link: APPLICANT_SETTING_PATH,
        icon: <FontAwesomeIcon icon={faCog} />,
      },
    ];
  }

  return (
    <TemplateUserPanel navConfig={setNavConfig()} sidebarTitle="Applicant Menu">
      <StudentProvider>{children}</StudentProvider>
    </TemplateUserPanel>
  );
}
export default TemplateApplicant;
