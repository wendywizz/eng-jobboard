import { sendGet } from "Shared/utils/request"

async function getProvince() {
  const uri = "http://localhost:3333/api/area/province"
  return await sendGet(uri)
    .then(res => res.json())
    .then(data => data)
}

async function getDistrictByProvince(id) {
  const uri = `http://localhost:3333/api/area/district?id=${id}`
  return await sendGet(uri)
    .then(res => res.json())
    .then(data => data)
}

export {
  getProvince,
  getDistrictByProvince
}