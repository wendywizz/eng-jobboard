const { sendPost } = require("Shared/utils/request")

async function saveInfo(data, id) {
  const uri = "http://localhost:3333/api/company/save"
  const bodyData = {
    id,
    ...data
  }

  return await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(data => data)
}

async function getJobOfOwner(id) {
  const uri = "http://localhost:3333/api/company/job"
  const bodyData = { id }

  return await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(data => data)
}

export {
  saveInfo, 
  getJobOfOwner
}