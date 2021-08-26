import { sendGet, sendPost } from "Shared/utils/request"
import { apiEndpoint } from "Frontend/configs/uri"
import { StudentMapper } from "./StudentMapper"

async function getStudentByUserId(id) {
  let rData = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}user/student-info`
  const params = { id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      rData = data ? StudentMapper(data) : null
      rMessage = message
      rError = error
    })
    .catch(e => {
      rError = e.message
    })

  return {
    data: rData,
    message: rMessage,
    error: rError
  }
}

async function saveStudentByUserId(id, saveData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}user/student-info`
  const bodyData = {
    id,
    ...saveData
  }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { success, data, message, error } = result

      rSuccess = success
      rData = success ? StudentMapper(data) : null
      rMessage = message
      rError = error
    })
    .catch(e => {
      rError = e.message
    })

  return {
    success: rSuccess,
    data: rData,
    message: rMessage,
    error: rError
  }
}

export {
  saveStudentByUserId,  
  getStudentByUserId,  
}