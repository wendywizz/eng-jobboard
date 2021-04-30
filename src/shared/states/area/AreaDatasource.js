import { sendGet } from "Shared/utils/request"
import { ProvinceMapper, DistrictMapper } from "./AreaMapper"

async function listProvince() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/area/list_province"

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount, error } = result

      rData = data.map(value => ProvinceMapper(value))
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

async function listDistrictByProvince(id) {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `http://localhost:3333/api/area/list_district?id=${id}`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount, error } = result

      rData = data.map(value => DistrictMapper(value))
      rItemCount = itemCount
      rMessage = message
      rError = error
    })
    
  return {
    data: rData,
    itemCount: rItemCount,
    message: rMessage,
    error: rError
  }
}

async function getProvince(id) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/area/province"
  const params = { id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      rData = data ? ProvinceMapper(data) : null
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

async function getDistrict(id) {
  let rData = null, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/area/district"
  const params = { id }

  await sendGet(uri, params)
    .then(res => res.json())
    .then(result => {
      const { data, message, error } = result

      rData = data ? DistrictMapper(data) : null
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

export {
  listProvince,
  listDistrictByProvince,
  getProvince,
  getDistrict
}