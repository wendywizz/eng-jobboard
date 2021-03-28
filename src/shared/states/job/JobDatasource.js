import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper } from "./JobMapper"

async function createJob(newData) {
  const uri = "http://localhost:3333/api/job/add"
  return await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => result)
}

async function updateJob(id, data) {
  const uri = "http://localhost:3333/api/job/save"
  const bodyData = {
    id,
    ...data
  }
  return await sendPost(uri, bodyData)
}

async function deleteJob(id) {
  const uri = "http://localhost:3333/api/job/remove"
  const bodyData = { id }
  return await sendPost(uri, bodyData)
}

function setActiveJob() {

}

async function getJobByID(id) {
  const uri = `http://localhost:3333/api/job/view`
  const params = { id }
  let returnData = null, returnMessage = null, error = null

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message } = result

      if (data) {
        returnData = JobMapper(data)
        returnMessage = message
      } 
    })
    .catch(error => {
      error = error.message
    })

  return {
    data: returnData,
    message: returnMessage,
    error
  }
}

async function getJobType() {
  const uri = "http://localhost:3333/api/job/gettype"
  let returnData = [], returnMessage = null, error = null

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message } = result

      if (itemCount > 0) {
        returnData = data.map(value => JobTypeMapper(value))
        returnMessage = message
      }
    })
    .catch(error => {
      error = error.message
    })

  return {
    data: returnData,
    message: returnMessage,
    error
  }
}

async function getJobOfCompany(id) {
  const uri = "http://localhost:3333/api/job/company"
  const bodyData = { id }
  let returnData = [], returnMessage = null, error = null

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message } = result

      if (itemCount > 0) {
        returnData = data.map(value => JobMapper(value))
        returnMessage = message
      }
    })
    .catch(error => {
      error = error.message
    })

  return {
    data: returnData,
    message: returnMessage,
    error
  }
}

export {
  createJob,
  updateJob,
  deleteJob,
  setActiveJob,
  getJobByID,
  getJobOfCompany,
  getJobType
}