import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper, SalaryMapper } from "./JobMapper"

async function createJob(newData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/add"

  await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => {
      const { status, data, message } = result

      rSuccess = status
      rData = status ? JobMapper(data) : null
      rMessage = message
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

async function updateJob(id, data) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/save"
  const bodyData = {
    id,
    ...data
  }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { status, data, message } = result

      rSuccess = status
      rData = status ? JobMapper(data) : null
      rMessage = message
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

async function deleteJob(id) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/remove"
  const bodyData = { id }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { status, message } = result

      rSuccess = status
      rMessage = message
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

function setActiveJob() {

}

async function getJobByID(id) {
  let rData = null, rMessage = null, rError = null
  const uri = `http://localhost:3333/api/job/view`
  const params = { id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { status, data, message } = result

      rData = status ? JobMapper(data) : null
      rMessage = message
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

async function getJobType() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/job-type"

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount } = result

      rData = data.map(value => JobTypeMapper(value))
      rItemCount = itemCount
      rMessage = message
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

async function getSalaryType() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/salary-type"

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount } = result

      rData = data.map(value => SalaryMapper(value))
      rItemCount = itemCount
      rMessage = message
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

async function getJobOfCompany(id) {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/company"
  const bodyData = { id }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message } = result

      rData = data.map(value => JobMapper(value))
      rItemCount = itemCount
      rMessage = message
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