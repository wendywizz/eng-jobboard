
import HomeContainer from "containers/HomeContainer"
import ResultContainer from "containers/ResultContainer"
import DetailContainer from "containers/DetailContainer"
import RegisterContainer from "containers/RegisterContainer"
import TestContainer from "containers/TestContainer"
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