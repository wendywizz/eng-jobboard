import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper, JobCategoryMapper, SalaryMapper } from "./JobMapper"
import { ACTIVE, INACTIVE } from "Shared/constants/employer-job-status"
import { apiEndpoint } from "Frontend/configs/uri"

async function createJob(newData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null

  const uri = `${apiEndpoint}job/add`

  await sendPost(uri, newData)
    .then(res => res.json())
    .then(result => {
      const { success, data, message, error } = result

      rSuccess = success
      rData = success ? JobMapper(data) : null
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

async function updateJob(id, data) {
  let rSuccess = false, rData = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/save`
  const bodyData = {
    id,
    ...data
  }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { success, data, message, error } = result

      rSuccess = success
      rData = success ? JobMapper(data) : null
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

async function deleteJob(id) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/remove`
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

async function searchJob(query, length, start) {
  let rData = null, rItemCount = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/search`

  let extendQuery = {}
  if (length) {
    extendQuery.length = length
  }
  if (start) {
    extendQuery.start = start
  }
  const sendQuery = {...query, ...extendQuery}

  await sendGet(uri, sendQuery)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message, error } = result

      rData = itemCount > 0 ? data.map(value => JobMapper(value)) : []
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

async function getJobByID(id) {
  let rData = null, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/view`
  const params = { id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      rData = data ? JobMapper(data) : null
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

async function getJobType() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/job-type`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount, error } = result

      rData = data.map(value => JobTypeMapper(value))
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

async function getJobCategory() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/job-category`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount, error } = result

      rData = data.map(value => JobCategoryMapper(value))
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

async function getSalaryType() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/salary-type`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount, error } = result

      rData = data.map(value => SalaryMapper(value))
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

async function getJobOfCompany(id, length, start, status) {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/company`

  let extendQuery = {}
  if (length) {
    extendQuery.length = length
  }
  if (start) {
    extendQuery.start = start
  }
  if (status === ACTIVE) {
    extendQuery.status = true
  } else if (status === INACTIVE) {
    extendQuery.status = false
  }
  const bodyData = { id, ...extendQuery }

  await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message, error } = result

      rData = data.map(value => JobMapper(value))
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

async function setActiveJob(id, isActive) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = `${apiEndpoint}job/set-active`
  const bodyData = { id, active: isActive }

  await sendPost(uri, bodyData)
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


async function countAllActiveJob() {
  let rItemCount = 0, rError = null
  const uri = `${apiEndpoint}job/countall-active-job`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { itemCount, error } = result

      rItemCount = itemCount
      rError = error
    })
    .catch(e => {
      rError = e.message
    })

  return {
    itemCount: rItemCount,
    error: rError
  }
}

export {
  createJob,
  updateJob,
  deleteJob,
  searchJob,
  getJobByID,
  getJobOfCompany,
  getJobType,
  getJobCategory,
  getSalaryType,
  setActiveJob,
  countAllActiveJob
}