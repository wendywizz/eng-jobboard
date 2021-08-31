import { sendPost, sendGet, formPost } from "Shared/utils/request"
import { apiEndpoint } from "Frontend/configs/uri"
import { ResumeMapper } from "./ResumeMapper"

async function listResumeOfUserId(id) {
  let rData = [], rMessage = null, rError = null
  const uri = `${apiEndpoint}resume/list-by-user`
  const params = { id }
  
  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result      

      rData = data.map(value => ResumeMapper(value))      
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

async function createResume(userId, name, file, additional) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = `${apiEndpoint}resume/add`

  const formData = new FormData()
  formData.append('name', name)
  formData.append('file', file)
  formData.append('additional', additional)
  formData.append('user_id', userId)

  await formPost(uri, formData)
    .then(res => res.json())
    .then(result => {
      const { success, message, error } = result

      rSuccess = success
      rMessage = message
      rError = error
    })

  return {
    success: rSuccess,
    message: rMessage,
    error: rError
  }

}

async function deleteResumeById(id) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = `${apiEndpoint}resume/remove`
  const bodyData = { id }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { sucess, message, error } = result

      rSuccess = sucess
      rMessage = message
      rError = error
    })
    .catch(e => {
      rError = e.message
    })

  return {
    success: rSuccess,
    message: rMessage,
    error: rError
  }
}

export {
  listResumeOfUserId,
  createResume,
  deleteResumeById
}