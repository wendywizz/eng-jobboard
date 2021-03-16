import { sendPost } from "shared/utils/request";

async function checkingStudent(studentCode, cardNo) {
  const uri = "http://localhost:3333/api/register/identify-student";
  const bodyData = {
    std_code: studentCode,
    card_no: cardNo
  }
  return await sendPost(uri, bodyData);
}

function registerWithEmailAndPassword(email, password) {
  createUser()
}

function registerWithFaebook() {
  createUser()
}

function registerWithGoogle() {
  createUser()
}

function createUser() {

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