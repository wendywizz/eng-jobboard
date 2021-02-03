
import HomeContainer from "Frontend/containers/Public/HomeContainer"
import ResultContainer from "Frontend/containers/Public/ResultContainer"
import DetailContainer from "Frontend/containers/Public/DetailContainer"
import RegisterContainer from "Frontend/containers/Public/RegisterContainer"
import TestContainer from "Frontend/containers/TestContainer"
import {
  HOME_PATH,  
  RESULT_PATH,
  DETAIL_PATH,
  REGISTER_PATH,
  TEST_PATH,
}  from "./paths"

const routes = [
  { name: "Homepage", path: HOME_PATH, component: HomeContainer, exact: true },
  { name: "Register Page", path: REGISTER_PATH, component: RegisterContainer, exact: true },
  { name: "Result Page", path: RESULT_PATH, component: ResultContainer },
  { name: "Detail Page", path: DETAIL_PATH, component: DetailContainer },
  { name: "Test Page", path: TEST_PATH, component: TestContainer },
]
export default routes