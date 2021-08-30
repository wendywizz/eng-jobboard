import { isset } from "Shared/utils/string"

function ResumeMapper(data) {
  return {
    id: isset(data.id),
    name: isset(data.name),
    fileUrl: isset(data.file_url),    
    additional: isset(data.additional),
    createdAt: isset(data.created_at),
    deleted: isset(data.deleted),
    createdBy: isset(data.created_by)
  }
}

export {
  ResumeMapper
}