import { sendPost } from "Shared/utils/request"
import { apiEndpoint } from "Frontend/configs/uri"

async function createApplicant(email, password, studentCode, personNo) {
  const uri = `${apiEndpoint}register/applicant/email`
  const userType = 1
  const body = {
    email,
    password,
    user_type: userType,
    std_code: studentCode,
    person_no: personNo
  }
  return await createUser(uri, body)
}

async function createEmployer(email, password) {
  const uri = `${apiEndpoint}register/employer/email`
  const userType = 2
  const body = {
    email,
    password,
    user_type: userType
  }
  return await createUser(uri, body)
}

async function createUser(uri, data) {
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
  createEmployer,
  createApplicant,
  identifyStudent
}

/*async function getUserByCode(code) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/user/user-by-code"
  const params = { code }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      rData = data ? UserMapper(data) : null
      rMessage = message
      rError = error
    })

  return {
    data: rData,
    message: rMessage,
    error: rError
  }
}

async function getUserType(code) {
  const uri = "http://localhost:3333/api/user/type-by-code"
  const params = { code }

  return sendGet(uri, params).then(res => res.json())
}*/