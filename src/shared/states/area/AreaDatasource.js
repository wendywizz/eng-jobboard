import { sendGet } from "Shared/utils/request"
import { ProvinceMapper, DistrictMapper } from "./AreaMapper"

async function getProvince() {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = "http://localhost:3333/api/area/province"

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount } = result

      rData = data.map(value => ProvinceMapper(value))
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

async function getDistrictByProvince(id) {
  let rData = [], rItemCount = 0, rMessage = null, rError = null
  const uri = `http://localhost:3333/api/area/district?id=${id}`

  await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, message, itemCount } = result

      rData = data.map(value => DistrictMapper(value))
      rItemCount = itemCount
      rMessage = message
    })
    
  return {
    data: rData,
    itemCount: rItemCount,
    message: rMessage,
    error: rError
  }
}

export {
  getProvince,
  getDistrictByProvince
}