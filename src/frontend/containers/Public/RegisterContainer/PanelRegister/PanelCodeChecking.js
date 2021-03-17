import React, { useState } from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkingStudent } from "shared/datasources/user"

function PanelCodeChecking({ onCallback }) {
  const [studentCode, setStudentCode] = useState(6310130019);
  const [cardNo, setCardNo] = useState(1749900201835);
  const [respMessage, setRespMessage] = useState(null);

  const _handleSubmit = async (e) => {
    e.preventDefault()

    const result = await checkingStudent(studentCode, cardNo);

    if (result.success) {
      onCallback(true)
    } else {
      setRespMessage(result.message)
    }
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
            <Input placeholder="ระบุตัวเลข 13 หลัก Ex. xxxxxxxxxxxxx" value={cardNo} onChange={(e) => setCardNo(e.target.value)} />
          </FormGroup>
        </div>
        <Button block color="primary">ตรวจสอบ</Button>
        {
          respMessage && (
            <Alert color="danger">
              <b><FontAwesomeIcon icon={faExclamationTriangle} /> Error</b>
              <p>{respMessage}</p>
            </Alert>
          )
        }
      </Form>
    </div>
  )
}
export default PanelCodeChecking