import React from "react";
import TemplateUserPanel from "Frontend/components/TemplateUserPanel";
import {
  EMPLOYER_JOB_PATH,
  EMPLOYER_PROFILE_PATH,
  /*EMPLOYER_RESUME_PATH,*/ EMPLOYER_SETTING_PATH,
} from "Frontend/configs/paths";
import { CompanyProvider } from "Shared/context/CompanyContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faInfoCircle,
  faListAlt,
} from "@fortawesome/free-solid-svg-icons";

function TemplateEmployer({ children }) {
  function setNavConfig() {
    return [
      {
        text: "ข้อมูลบริษัท",
        link: EMPLOYER_PROFILE_PATH,
        icon: <FontAwesomeIcon icon={faInfoCircle} />,
      },
      {
        text: "งานของฉัน",
        link: EMPLOYER_JOB_PATH,
        icon: <FontAwesomeIcon icon={faListAlt} />,
      },
      {
        text: "ตั้งค่า",
        link: EMPLOYER_SETTING_PATH,
        icon: <FontAwesomeIcon icon={faCog} />,
      },
    ];
  }

  return (
    <TemplateUserPanel navConfig={setNavConfig()} sidebarTitle="Employer Menu">
      <CompanyProvider>{children}</CompanyProvider>
    </TemplateUserPanel>
  );
}
export default TemplateEmployer;
