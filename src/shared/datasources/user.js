import { sendPost } from "shared/utils/request";

async function checkingStudent(studentCode, cardNo) {
  const uri = "http://localhost:3333/api/register/identify-student"
  const bodyData = {
    std_code: studentCode,
    card_no: cardNo
  }
  return await sendPost(uri, bodyData);
}

async function registerWithEmailAndPassword(email, password) {
  return await createUser(email, password)
}

function registerWithFaebook() {
  createUser()
}

function registerWithGoogle() {
  createUser()
}

async function createUser(email, password) {
  const uri = "http://localhost:3333/api/register/applicant/email"
  const bodyData = { email, password }

  return await sendPost(uri, bodyData)
}

function authenWithEmailAndPassword(email, password) {
  updateLatestLogin()
}

function authenWithThirdParty() {
  updateLatestLogin()
}

function updatePassword() {

}

function updateLatestLogin() {

}

export {
  checkingStudent,
  registerWithEmailAndPassword,
  registerWithFaebook,
  registerWithGoogle,  
  authenWithEmailAndPassword,
  authenWithThirdParty,
  updatePassword
}