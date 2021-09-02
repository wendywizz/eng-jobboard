import { isset } from "Shared/utils/string"
import { ResumeMapper } from "../resume/ResumeMapper"
import { JobMapper } from "../job/JobMapper"

function ApplyMapper(data) {
  return {
    id: isset(data.apply_id),
    status: isset(data.apply_status),
    jobId: isset(data.job_id),
    jobAsso: isset(data.job_asso) && JobMapper(data.job_asso),
    resumeId: isset(data.resume_id),
    resumeAsso: isset(data.resume_asso) && ResumeMapper(data.resume_asso),
    createdBy: data.created_by,
    createdAt: isset(data.created_at)
  }
}
export {
  ApplyMapper
}