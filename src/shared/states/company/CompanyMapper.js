import { isset } from "Shared/utils/string"

function CompanyMapper(data) {
  return {
    id: isset(data.company_id),
    name: isset(data.company_name),
    logoPath: isset(data.logo_path),
    about: isset(data.about),
    address: isset(data.address),
    province: isset(data.province),
    district: isset(data.district),
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