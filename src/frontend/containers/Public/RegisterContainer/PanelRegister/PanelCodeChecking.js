import React, { useState } from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import { faExclamationTriangle, faSpinner } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { identifyStudent } from "Shared/states/user/UserDatasource"

function PanelCodeChecking({ onCallback }) {
  const [loading, setLoading] = useState(false)
  const [studentCode, setStudentCode] = useState(6310130019);
  const [personNo, setPersonNo] = useState(1749900201835);
  const [message, setMessage] = useState(null);

  const _handleSubmit = (e) => {
    e.preventDefault()

    setLoading(true)
    setTimeout(async () => {
      const { success, message } = await identifyStudent(studentCode, personNo)
      
      if (success) {
        onCallback(true, { studentCode, personNo })
      } else {
        setMessage(message)
      }
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="panel panel-code-checking">
      <Form onSubmit={_handleSubmit}>
        <div className="input-inner">
          <FormGroup>
            <Label>ตรวจสอบรหัสนักศึกษา</Label>
            <Input placeholder="ระบุรหัสนักศึกษา" value={studentCode} onChange={(e) => setStudentCode(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>รหัสประจำตัวประชาชน</Label>
            <Input placeholder="ระบุตัวเลข 13 หลัก Ex. xxxxxxxxxxxxx" value={personNo} onChange={(e) => setPersonNo(e.target.value)} />
          </FormGroup>
        </div>
        <Button block color="primary" disabled={loading}>
          {loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>ตรวจสอบ</span>}
        </Button>
        {
          message && (
            <Alert color="danger">
              <b><FontAwesomeIcon icon={faExclamationTriangle} /> Error</b>
              <p>{message}</p>
            </Alert>
          )
        }
      </Form>
    </div>
  )
}
export default PanelCodeChecking