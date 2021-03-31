import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper, SalaryMapper } from "./JobMapper"

async function createJob(newData) {
  const uri = "http://localhost:3333/api/job/add"
console.log("NEW DATA", newData)
  return await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => {
      const { status, data, message, error } = result
console.log("RETURN", data)
      return {
        status,
        data: status ? JobMapper(data) : null,
        message,
        error
      }
    })
}

async function updateJob(id, data) {
  const uri = "http://localhost:3333/api/job/save"
  const bodyData = {
    id,
    ...data
  }
  return await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { status, message, error } = result

      return {
        status,
        message,
        error
      }
    })
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

  return await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { status, data, message, error } = result
      
      return {
        status,
        data: status ? JobMapper(data) : null,
        message,
        error
      }
    })
}

async function getJobType() {
  const uri = "http://localhost:3333/api/job/job-type"
  let returnData = [], returnMessage = null, returnError = null

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
      returnError = error
    })

  return {
    data: returnData,
    message: returnMessage,
    error: returnError
  }
}

async function getSalaryType() {
  const uri = "http://localhost:3333/api/job/salary-type"
  let returnData = [], returnMessage = null, returnError = null

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message } = result

      if (itemCount > 0) {
        returnData = data.map(value => SalaryMapper(value))
        returnMessage = message
      }
    })
    .catch(error => {
      returnError = error
    })

  return {
    data: returnData,
    message: returnMessage,
    error: returnError
  }
}

async function getJobOfCompany(id) {
  const uri = "http://localhost:3333/api/job/company"
  const bodyData = { id }
  let returnData = [], returnMessage = null, returnError = null

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
      returnError = error 
    })
    
  return {
    data: returnData,
    message: returnMessage,
    error: returnError
  }
}

export {
  createJob,
  updateJob,
  deleteJob,
  setActiveJob,
  getJobByID,
  getJobOfCompany,
  getJobType,
  getSalaryType
}