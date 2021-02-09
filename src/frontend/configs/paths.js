const HOME_PATH = "/"
const RESULT_PATH = "/result"
const DETAIL_PATH = "/view"
const REGISTER_PATH = "/register"
const TEST_PATH = "/test"
const EMPLOYER_PATH = "/employer"

function EMPLOYER_JOB_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/job"
}
function EMPLOYER_RESUME_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/resume"
}
function EMPLOYER_SETTING_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/setting"
}

export {
  HOME_PATH,
  RESULT_PATH,
  DETAIL_PATH,
  REGISTER_PATH,
  TEST_PATH,
  EMPLOYER_PATH,
  EMPLOYER_JOB_PATH,
  EMPLOYER_RESUME_PATH,
  EMPLOYER_SETTING_PATH,
}