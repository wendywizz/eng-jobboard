import { isset } from "Shared/utils/string"

function JobTypeMapper(data) {
  return {
    id: isset(data.id),
    name: isset(data.name)
  }
}

function SalaryMapper(data) {
  return {
    id: isset(data.id),
    name: isset(data.name)
  }
}

function JobMapper(data) {  
  const workDays = JSON.parse(JSON.stringify(data.work_days))

  return {
    id: isset(data.job_id),
    position: isset(data.job_position),
    jobType: isset(data.job_type),
    jobTypeAsso: isset(data.job_type_asso) && JobTypeMapper(data.job_type_asso),
    duty: isset(data.job_duty),
    performance: isset(data.job_performance),
    welfare: isset(data.job_welfare),
    salaryType: isset(data.salary_type),
    salaryTypeAsso: isset(data.salary_type_asso) && SalaryMapper(data.salary_type_asso),
    salaryMin: isset(data.salary_min),
    salaryMax: isset(data.salary_max),
    workDays: workDays ? workDays : {mon:0,tue:0,wed:0,thu:0,fri:0,sat:0,sun:0},
    workTimeStart: isset(data.work_time_start),
    workTimeEnd: isset(data.work_time_end),
    district: isset(data.district),
    province: isset(data.province),    
    region: isset(data.region),
    amount: isset(data.amount),
    active: isset(data.active),
    deleted: isset(data.deleted),
    createdAt: isset(data.created_at),
    updatedAt: isset(data.updated_at),
    expireAt: isset(data.expire_at),
    companyOwner: isset(data.company_owner),
    createdBy: isset(data.created_by)
  }
}
export {
  JobMapper,
  JobTypeMapper,
  SalaryMapper
}