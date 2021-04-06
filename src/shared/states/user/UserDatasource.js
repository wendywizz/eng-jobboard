import { sendPost, sendGet } from "Shared/utils/request"

async function createApplicant(uid, email, studentCode, personNo) {
  const uri = "http://localhost:3333/api/register/applicant/email"
  const userType = 1
  const body = {
    email,
    user_type: userType,
    std_code: studentCode,
    person_no: personNo
  }
  return await createUser(uri, uid, body)
}

async function createEmployer(uid, email) {
  const uri = "http://localhost:3333/api/register/employer/email"
  const userType = 2
  const body = {
    email,
    user_type: userType
  }
  return await createUser(uri, uid, body)
}

async function createUser(uri, uid, data) {
  const bodyData = {
    user_code: uid,
    ...data
  }
  return await sendPost(uri, bodyData).then(res => res.json())
}

async function identifyStudent(studentCode, personNo) {
  const uri = "http://localhost:3333/api/register/identify-student"
  const bodyData = {
    std_code: studentCode,
    person_no: personNo
  }
  return await sendPost(uri, bodyData).then(res => res.json())
}

async function getUserType(code) {
  const uri = "http://localhost:3333/api/authen/user-type"
  const params = { code }

  return await sendGet(uri, params).then(res => res.json())
}

export {
  createEmployer,
  createApplicant,
  getUserType,
  identifyStudent
}