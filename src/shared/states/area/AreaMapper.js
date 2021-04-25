import { isset } from "Shared/utils/string"

function ProvinceMapper(data) {
  return {
    id: isset(data.id),
    code: isset(data.code),
    name: isset(data.name_th),
    region: isset(data.region)
  }
}

function DistrictMapper(data) {
  return {
    id: isset(data.id),
    code: isset(data.code),
    name: isset(data.name_th),
    province: isset(data.province)
  }
}

function RegionMapper(data) {
  return {
    id: isset(data.id),
    name: isset(data.name)
  }
}

export {
  ProvinceMapper,
  DistrictMapper,
  RegionMapper
}