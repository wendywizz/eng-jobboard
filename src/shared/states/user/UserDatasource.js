import { sendPost } from "Shared/utils/request"
import { apiEndpoint } from "Frontend/configs/uri"

async function registerApplicant(email, password, studentCode, personNo) {
  const uri = `${apiEndpoint}register/applicant-email`  
  const body = {
    email,
    password,    
    std_code: studentCode,
    person_no: personNo
  }
  return await sendRegisterRequest(uri, body)
}

async function registerEmployer(email, password, companyName) {
  const uri = `${apiEndpoint}register/employer-email`  
  const body = {
    email,
    password,
    company_name: companyName
  }
  return await sendRegisterRequest(uri, body)
}

async function sendRegisterRequest(uri, data) {
  const bodyData = {
    ...data
  }
  return await sendPost(uri, bodyData).then(res => res.json())
}

async function identifyStudent(studentCode, personNo) {
  const uri = `${apiEndpoint}register/identify-student`
  const bodyData = {
    std_code: studentCode,
    person_no: personNo
  }
  return await sendPost(uri, bodyData).then(res => res.json())
}

export {
  registerApplicant,
  registerEmployer,
  identifyStudent
}
