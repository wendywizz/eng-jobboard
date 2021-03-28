import TestContainer from "Frontend/containers/TestContainer"
import {
  HomeContainer,
  ResultContainer,
  DetailContainer,
  RegisterContainer,
} from "Frontend/containers/Public"
import {
  EmprProfileContainer,
  EmprJobDetailContainer,
  EmprJobFormContainer,
  EmprJobListContainer,
  EmprResumeContainer,
  EmprSettingContainer
} from "Frontend/containers/Employer"
import {
  ApcProfileContainer,
  ApcResumeContainer,
  ApcSettingContainer
} from "Frontend/containers/Applicant"

import {
  HOME_PATH,  
  RESULT_PATH,
  DETAIL_PATH,
  REGISTER_PATH,
  EMPLOYER_PATH,
  TEST_PATH,
  APPLICANT_PATH,
  EMPLOYER_PROFILE_PATH,
  EMPLOYER_JOB_PATH,
  EMPLOYER_JOB_ADD_PATH,
  EMPLOYER_JOB_EDIT_PATH,
  EMPLOYER_RESUME_PATH,
  EMPLOYER_SETTING_PATH,
  APPLICANT_PROFILE_PATH,
  APPLICANT_RESUME_PATH,
  APPLICANT_SETTING_PATH,
} from "./paths"

const routes = [
  { name: "Homepage", path: HOME_PATH, component: HomeContainer, exact: true },
  { name: "Register Page", path: REGISTER_PATH, component: RegisterContainer, exact: true },
  { name: "Result Page", path: RESULT_PATH, component: ResultContainer },
  { name: "Detail Page", path: DETAIL_PATH, component: DetailContainer },
  { name: "Employer", basePath: EMPLOYER_PATH, children: [
    { name: "Profile", path: EMPLOYER_PROFILE_PATH, component: EmprProfileContainer },
    { name: "Job Add", path: EMPLOYER_JOB_ADD_PATH, component: EmprJobFormContainer },
    { name: "Job Edit", path: EMPLOYER_JOB_EDIT_PATH + "/:id", component: EmprJobFormContainer },
    { name: "Job Detail", path: EMPLOYER_JOB_PATH + "/:id", component: EmprJobDetailContainer },    
    { name: "Job List", path: EMPLOYER_JOB_PATH, component: EmprJobListContainer },        
    { name: "Resume", path: EMPLOYER_RESUME_PATH, component: EmprResumeContainer },
    { name: "Setting", path: EMPLOYER_SETTING_PATH, component: EmprSettingContainer },
  ]},
  { name: "Applicant", basePath: APPLICANT_PATH, children: [
    { name: "Profile", path: APPLICANT_PROFILE_PATH, component: ApcProfileContainer },
    { name: "Resume", path: APPLICANT_RESUME_PATH, component: ApcResumeContainer },
    { name: "Setting", path: APPLICANT_SETTING_PATH, component: ApcSettingContainer },
  ]},
  { name: "Test", path: TEST_PATH, component: TestContainer, exact: true },
]
export default routes