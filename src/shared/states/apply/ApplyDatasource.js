import { sendPost } from "Shared/utils/request"
import { ApplyMapper } from "./ApplyMapper"
import { apiEndpoint } from "Frontend/configs/uri"

async function applyResume(newData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null

  const uri = `${apiEndpoint}apply/add`

  await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => {
      const { success, data, message, error } = result

      rSuccess = success
      rData = success ? ApplyMapper(data) : null
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
  applyResume
}