import { sendGet, sendPost } from "Shared/utils/request"
import { apiEndpoint } from "Frontend/configs/uri"
import { ApplyMapper } from "./ApplyMapper"

async function listApplyingByUser(userId, status, length, start) {
  let rData = null, rItemCount = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}apply/list-by-user`

  const query = {
    user: userId,
    status,
    length,
    start
  }
  await sendGet(uri, query)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message, error } = result

      rData = itemCount > 0 ? data.map(value => ApplyMapper(value)) : []
      rItemCount = itemCount
      rMessage = message
      rError = error
    })
    .catch(e => {
      rError = e.message
    })
    
  return {
    data: rData,
    itemCount: rItemCount,
    message: rMessage,
    error: rError
  }
}

async function applyResume(newData) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = `${apiEndpoint}apply/add`

  await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => {
      const { success, message, error } = result

      rSuccess = success
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

async function checkCanApplyJobByUser(jobId, userId) {
  const uri = `${apiEndpoint}apply/check-applied`
  const params = { job: jobId, user: userId }

  return await sendGet(uri, params)
    .then(res => res.json())
    .then(result => result.applied ? false : true)

}

export {
  applyResume,
  checkCanApplyJobByUser,
  listApplyingByUser
}