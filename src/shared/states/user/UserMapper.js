import { isset } from "Shared/utils/string"

function UserMapper(data) {
  return {
    id: isset(data.user_id),
    code: isset(data.user_code),
    type: isset(data.user_type),
    email: isset(data.email),
    studentCode: isset(data.student_code),
    personNumber: isset(data.person_no),
    active: isset(data.active),
    notifyEmail: isset(data.notify_email),
    notifySMS: isset(data.notify_sms),
    bindingFacebook: isset(data.binding_facebook),
    bindingGoogle: isset(data.binding_google),
    createdAt: isset(data.created_at),
    updatedAt: isset(data.updated_at),
    lastestLoginAt: isset(data.lastest_login_at)
  }
}

export default UserMapper