import React, { useState } from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { checkingStudent } from "shared/datasources/user"

function PanelCodeChecking({ onCallback }) {
  const [studentCode, setStudentCode] = useState(null);
  const [cardNo, setCardNo] = useState(null);

  const _handleSubmit = async(e) => {
    e.preventDefault()

    const result = await checkingStudent(studentCode, cardNo);
    if (result.success) {
      onCallback(true)
    }
  }

  return (
    <div className="panel panel-code-checking">
      <Form onSubmit={_handleSubmit}>
        <div className="input-inner">
          <FormGroup>
            <Label>ตรวจสอบรหัสนักศึกษา</Label>
            <Input placeholder="ระบุรหัสนักศึกษา" onChange={(e) => setStudentCode(e.target.value)} />
          </FormGroup>
          <FormGroup>
            <Label>รหัสประจำตัวประชาชน</Label>
            <Input placeholder="ระบุตัวเลข 13 หลัก Ex. xxxxxxxxxxxxx" onChange={(e) => setCardNo(e.target.value)} />
          </FormGroup>
        </div>
        <Button block color="primary">ตรวจสอบ</Button>
        <Alert color="info">
          <b><FontAwesomeIcon icon={faExclamationTriangle} /> หมายเหตุ</b>
          <p>สมัครใช้งานได้เฉพาะนักศึกษาคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่เท่านั้น</p>
        </Alert>
      </Form>
    </div>
  )
}
export default PanelCodeChecking