import { sendPost } from "Shared/utils/request"

async function createApplicant(uid, email, studentCode, personNo) {
  const userType = 1
  const body = {
    email,
    user_type: userType,
    student_code: studentCode,
    person_no: personNo
  }
  return await createUser(uid, body)
}

async function createEmployer(uid, email) {
  const userType = 2
  const body = {
    email,
    user_type: userType
  }
  return await createUser(uid, body)
}

async function createUser(uid, data) {
  const uri = "http://localhost:3333/api/register/applicant/email"
  const bodyData = {
    user_code: uid,
    ...data
  }
  return await sendPost(uri, bodyData)
}

async function identifyStudent(studentCode, personNo) {
  const uri = "http://localhost:3333/api/register/identify-student"
  const bodyData = {
    std_code: studentCode,
    person_no: personNo
  }
  return await sendPost(uri, bodyData)
}

export {
  createEmployer,
  createApplicant,
  identifyStudent
}