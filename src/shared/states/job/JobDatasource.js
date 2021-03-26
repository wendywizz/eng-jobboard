import { sendGet, sendPost } from "Shared/utils/request"

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
    .then(data => data)
}

export {
  createJob,
  updateJob,
  deleteJob,
  setActiveJob,
  getJobs,
  getJobByID,
  getJobType
}