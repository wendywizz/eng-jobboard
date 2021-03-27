import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper } from "./JobMapper"

async function createJob(data) {
  const uri = "http://localhost:3333/api/job/add"
  return await sendPost(uri, data)
    .then(res => res.json())
    .then(data => data)
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

function getJobs() {

}

function getJobByID(id) {

}

async function getJobType() {
  const uri = "http://localhost:3333/api/job/gettype"
  
  return await sendGet(uri)
    .then(res => res.json())
    .then(data => data.map(value => JobTypeMapper(value)))
}

async function getJobOfOwner(id) {
  const uri = "http://localhost:3333/api/company/job"
  const bodyData = { id }

  return await sendPost(uri, bodyData)
    .then(res => res.json())
    .then(data => {
      const { status, result, itemCount } = data
      let returnData = []

      if (status) {
        returnData = result.map(value => JobMapper(value))
      }
      return {
        data: returnData,
        itemCount
      }
    })
}

export {
  createJob,
  updateJob,
  deleteJob,
  setActiveJob,
  getJobs,
  getJobByID,
  getJobOfOwner,
  getJobType
}