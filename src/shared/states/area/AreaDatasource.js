import { sendGet } from "Shared/utils/request"
import { ProvinceMapper, DistrictMapper } from "./AreaMapper"

async function getProvince() {
  const uri = "http://localhost:3333/api/area/province"
  return await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount } = result
      let returnData = []

      if (itemCount > 0) {
        returnData = data.map(value => ProvinceMapper(value))
      }
      return {
        data: returnData,
        itemCount
      }
    })
}

async function getDistrictByProvince(id) {
  const uri = `http://localhost:3333/api/area/district?id=${id}`
  return await sendGet(uri)
    .then(res => res.json())
    .then(result => {
      const { data, itemCount } = result
      let returnData = []

      if (itemCount > 0) {
        returnData = data.map(value => DistrictMapper(value))
      }
      return {
        data: returnData,
        itemCount
      }
    })
}

export {
  getProvince,
  getDistrictByProvince
}