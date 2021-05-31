import { isset } from "Shared/utils/string"
import { DistrictMapper, ProvinceMapper } from "../area/AreaMapper"

function CompanyMapper(data) {
  return {
    id: isset(data.company_id),
    name: isset(data.company_name),
    logoFile: isset(data.logo_file),    
    logoUrl: isset(data.logo_url),
    about: isset(data.about),
    address: isset(data.address),
    province: isset(data.province),
    provinceAsso: isset(data.province_asso) && ProvinceMapper(data.province_asso),
    district: isset(data.district),
    districtAsso: isset(data.district_asso) && DistrictMapper(data.district_asso),
    postCode: isset(data.postcode),
    country: isset(data.country),
    phone: isset(data.phone),
    email: isset(data.email),
    website: isset(data.website),
    facebook: isset(data.facebook),
    createdAt: isset(data.created_at),
    updatedAt: isset(data.updated_at),
    createdBy: isset(data.created_by)
  }
}

export {
  CompanyMapper
}