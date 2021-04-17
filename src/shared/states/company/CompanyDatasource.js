import { sendGet, sendPost } from "Shared/utils/request"
import { CompanyMapper } from "./CompanyMapper"

async function getCompanyItem(id) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/company/view"
  const params = { id: id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result
      
      rData = data ? CompanyMapper(data) : null
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

async function getCompanyByOwner(ownerId) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/company/info-owner"
  const params = { owner: ownerId }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result
      
      rData = data ? CompanyMapper(data) : null
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

async function saveCompanyByOwner(ownerId, saveData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/company/save-owner"
  const bodyData = {
    owner: ownerId,
    ...saveData
  }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { success, data, message, error } = result

      rSuccess = success
      rData = success ? CompanyMapper(data) : null
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
  saveCompanyByOwner,
  getCompanyItem,
  getCompanyByOwner
}