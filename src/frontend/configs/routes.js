import TestContainer from "Frontend/containers/TestContainer"
import {
  HomeContainer,
  ResultContainer,
  DetailContainer,
  RegisterContainer,
} from "Frontend/containers/Public"
import {
  EmprJobDetailContainer,
  EmprJobFormContainer,
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
  TEST_PATH,
}  from "./paths"

const routes = [
  { name: "Homepage", path: HOME_PATH, component: HomeContainer, exact: true },
  { name: "Register Page", path: REGISTER_PATH, component: RegisterContainer, exact: true },
  { name: "Result Page", path: RESULT_PATH, component: ResultContainer },
  { name: "Detail Page", path: DETAIL_PATH, component: DetailContainer },
  { name: "Employer", basePath: EMPLOYER_PATH, children: [
    { name: "Job Add", path: "/usr/:id/job/add", component: EmprJobFormContainer },
    { name: "Job Edit", path: "/usr/:id/job/edit/:id", component: EmprJobFormContainer },
    { name: "Job Detail", path: "/usr/:id/job/:id", component: EmprJobDetailContainer },
    { name: "Job List", path: "/usr/:id/job", component: EmprJobListContainer },
    { name: "Resume", path: "/usr/:id/resume", component: EmprResumeContainer },
    { name: "Setting", path: "/usr/:id/setting", component: EmprSettingContainer },
  ]},
  { name: "Test", path: TEST_PATH, component: TestContainer, exact: true },
]
export default routes