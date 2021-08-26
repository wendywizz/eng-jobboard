import { isset } from "Shared/utils/string"
import { DistrictMapper, ProvinceMapper } from "../area/AreaMapper"
import UserMapper from "../user/UserMapper"

function StudentMapper(data) {
  return {
    id: isset(data.student_id),
    studentCode: isset(data.student_code),
    firstName: isset(data.first_name),
    lastName: isset(data.last_name),
    address: isset(data.address),
    province: isset(data.province),
    provinceAsso: isset(data.province_asso) && ProvinceMapper(data.province_asso),
    district: isset(data.district),
    districtAsso: isset(data.district_asso) && DistrictMapper(data.district_asso),
    postCode: isset(data.postcode),    
    phone: isset(data.phone),
    email: isset(data.email),    
    facebook: isset(data.facebook),
    createdAt: isset(data.created_at),
    updatedAt: isset(data.updated_at),
    createdBy: isset(data.user_asso) && UserMapper(data.user_asso)
  }
}

export {
  StudentMapper
}