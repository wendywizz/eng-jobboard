import { isset } from "Shared/utils/string"

function JobMapper(data) {
  return {
    id: isset(data.job_id),
    position: isset(data.job_position),
    jobType: isset(data.job_type),
    duty: isset(data.job_duty),
    performance: isset(data.job_performance),
    welfare: isset(data.job_welfare),
    salaryType: isset(data.salary_type),
    salaryMin: isset(data.salary_min),
    salaryMax: isset(data.salary_max),
    workDays: isset(data.work_days),
    workTimeStart: isset(data.work_time_start),
    workTimeEnd: isset(data.work_time_end),
    district: isset(data.district),
    province: isset(data.privince),
    region: isset(data.region),
    require: isset(data.require),
    active: isset(data.active),
    deleted: isset(data.deleted),
    createdAt: isset(data.created_at),
    updatedAt: isset(data.updated_at),
    expireAt: isset(data.expire_at),
    companyOwner: isset(data.company_owner),
    createdBy: isset(data.created_by)
  }
}
function JobTypeMapper(data) {
  return {
    id: isset(data.job_type_id),
    name: isset(data.job_type_name)
  }
}
export {
  JobMapper,
  JobTypeMapper
}