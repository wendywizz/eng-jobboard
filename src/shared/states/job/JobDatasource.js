import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper, SalaryMapper } from "./JobMapper"

async function createJob(newData) {
  const uri = "http://localhost:3333/api/job/add"

  return await sendPost(uri, newData)
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

async function updateJob(id, data) {
  const uri = "http://localhost:3333/api/job/save"
  const bodyData = {
    id,
    ...data
  }
  return await sendPost(uri, bodyData)
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

  return await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result
      
      return {
        data: data.map(value => JobTypeMapper(value)),
        message,
        error
      }
    })
}

async function getSalaryType() {
  const uri = "http://localhost:3333/api/job/salary-type"

  return await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      return {
        data: data.map(value => SalaryMapper(value)),
        message,
        error
      }
    })
}

async function getJobOfCompany(id) {
  const uri = "http://localhost:3333/api/job/company"
  const bodyData = { id }

  return await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount, message, error } = result

      return {
        data: data.map(value => JobMapper(value)),
        itemCount,
        message,
        error
      }
    })
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