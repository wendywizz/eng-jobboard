import { sendGet, sendPost } from "Shared/utils/request"
import { JobMapper, JobTypeMapper, JobCategoryMapper, SalaryMapper } from "./JobMapper"

async function createJob(newData) {
  let rSuccess = false, rData = null, rMessage = null, rError = null

  const uri = "http://localhost:3333/api/job/add"

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
  const uri = "http://localhost:3333/api/job/save"
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
  const uri = "http://localhost:3333/api/job/remove"
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

async function searchJob(query) {
  let rData = null, rItemCount = null, rMessage = null, rError = null
  const uri = `http://localhost:3333/api/job/search`

  await sendGet(uri, query)
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
  const uri = `http://localhost:3333/api/job/view`
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

/*async function searchJob(params) {
  let rData = null, rItemCount = null, rMessage = null, rError = null

  const uri = `http://localhost:3333/api/job/search`
  let query = {}

  if (params) {
    const { keyword, category, type, area, salary } = params

    if (params.keyword) {
      query.keyword = keyword
    }
    if (params.category) {
      query.category = category
    }
    if (params.type) {
      query.type = type
    }
    if (params.area) {
      if (area.district) {
        query.district = area.district
      }
      if (area.province) {
        query.province = area.province
      }
    }
    if (params.salary) {
      if (salary.min) {
        query.salary_min = salary.min
      }
      if (salary.max) {
        query.salary_max = salary.max
      }
    }
  }

  await sendGet(uri, query)
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
}*/

async function getJobType() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/job-type"

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
  const uri = "http://localhost:3333/api/job/job-category"

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
  const uri = "http://localhost:3333/api/job/salary-type"

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

async function getJobOfCompany(id) {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/company"
  const bodyData = { id }

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

async function setActiveJob(id) {
  let rSuccess = false, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/job/active"
  const bodyData = { id }

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
}