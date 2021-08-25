import { sendGet, sendPost, formPost } from "Shared/utils/request"
import { CompanyMapper } from "./CompanyMapper"
import { apiEndpoint } from "Frontend/configs/uri"

async function getCompanyItem(id) {
  let rData = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}company/view`
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
  const uri = `${apiEndpoint}company/info-owner`
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
  const uri = `${apiEndpoint}company/save-owner`
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

async function uploadLogo(companyId, ownerId, logo) {
  const uri = `${apiEndpoint}company/upload-logo`
  const formData = new FormData()
  formData.append('imageLogo', logo)
  formData.append('company_id', companyId)
  formData.append('owner_id', ownerId)

  await formPost(uri, formData)
    .then(res => res.json())
    .then(result => {
      console.log(result)
    })
}

export {
  saveCompanyByOwner,
  getCompanyItem,
  getCompanyByOwner,
  uploadLogo
}