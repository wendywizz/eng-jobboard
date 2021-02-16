const HOME_PATH = "/"
const RESULT_PATH = "/result"
const DETAIL_PATH = "/view"
const REGISTER_PATH = "/register"
const TEST_PATH = "/test"
const EMPLOYER_PATH = "/employer"
const APPLICANT_PATH = "/applicant"

function EMPLOYER_JOB_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/job"
}
function EMPLOYER_JOB_ADD_PATH(id) {
  return EMPLOYER_JOB_PATH(id) + "/add"
}
function EMPLOYER_JOB_EDIT_PATH(id) {
  return EMPLOYER_JOB_PATH(id) + "/edit"
}
function EMPLOYER_RESUME_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/resume"
}
function EMPLOYER_SETTING_PATH(id) {
  return EMPLOYER_PATH + "/usr/" + id + "/setting"
}

function APPLICANT_PROFILE_PATH(id) {
  return APPLICANT_PATH + "/usr/" + id + "/profile"
}
function APPLICANT_RESUME_PATH(id) {
  return APPLICANT_PATH + "/usr/" + id + "/resume"
}
function APPLICANT_SETTING_PATH(id) {
  return APPLICANT_PATH + "/usr/" + id + "/setting"
}

export {
  HOME_PATH,
  RESULT_PATH,
  DETAIL_PATH,
  REGISTER_PATH,
  TEST_PATH,
  EMPLOYER_PATH,
  APPLICANT_PATH,
  EMPLOYER_JOB_PATH,
  EMPLOYER_JOB_ADD_PATH,
  EMPLOYER_JOB_EDIT_PATH,
  EMPLOYER_RESUME_PATH,
  EMPLOYER_SETTING_PATH,
  APPLICANT_PROFILE_PATH,
  APPLICANT_RESUME_PATH,
  APPLICANT_SETTING_PATH
}