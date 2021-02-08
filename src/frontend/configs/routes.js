import TestContainer from "Frontend/containers/TestContainer"
import {
  HomeContainer,
  ResultContainer,
  DetailContainer,
  RegisterContainer,
} from "Frontend/containers/Public"
import {
  EmprJobDetailContainer,
  EmprJobListContainer,
  EmprResumeContainer,
  EmprSettingContainer
} from "Frontend/containers/Employer"

import {
  HOME_PATH,  
  RESULT_PATH,
  DETAIL_PATH,
  REGISTER_PATH,
  EMPLOYER_PATH,
  EMPLOYER_JOB_PATH,
  EMPLOYER_RESUME_PATH,
  EMPLOYER_SETTING_PATH,
  TEST_PATH,
}  from "./paths"

const routes = [
  { name: "Homepage", path: HOME_PATH, component: HomeContainer, exact: true },
  { name: "Register Page", path: REGISTER_PATH, component: RegisterContainer, exact: true },
  { name: "Result Page", path: RESULT_PATH, component: ResultContainer },
  { name: "Detail Page", path: DETAIL_PATH, component: DetailContainer },
  { name: "Employer", basePath: EMPLOYER_PATH, children: [
    { name: "Job List", path: EMPLOYER_JOB_PATH, component: EmprJobListContainer },
    { name: "Job Detail", path: EMPLOYER_JOB_PATH + ":id", component: EmprJobDetailContainer },
    { name: "Resume", path: EMPLOYER_RESUME_PATH, component: EmprResumeContainer },
    { name: "Setting", path: EMPLOYER_SETTING_PATH, component: EmprSettingContainer },
  ]},
  { name: "Test", path: TEST_PATH, component: TestContainer, exact: true },
]
export default routes