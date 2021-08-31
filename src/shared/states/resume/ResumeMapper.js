import { isset } from "Shared/utils/string"

function ResumeMapper(data) {
  return {
    id: isset(data.id),
    name: isset(data.name),
    resumeFile: isset(data.resume_file),    
    additional: isset(data.additional),
    createdAt: isset(data.created_at),
    deleted: isset(data.deleted),
    createdBy: isset(data.created_by)
  }
}

export {
  ResumeMapper
}