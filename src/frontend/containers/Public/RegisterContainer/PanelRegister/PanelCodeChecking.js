import React from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PanelCodeChecking({ onCallback }) {
  const _handleSubmit = (e) => {
    e.preventDefault()

    onCallback(true)
  }
  return (
    <div className="panel panel-code-checking">
      <Form onSubmit={_handleSubmit}>
        <FormGroup>
          <div className="input-inner">
            <Label>ตรวจสอบรหัสนักศึกษา</Label>
            <Input placeholder="ระบุรหัสนักศึกษา" />
          </div>
          <Button block color="primary">ตรวจสอบ</Button>
          <Alert color="info">
            <b><FontAwesomeIcon icon={faExclamationTriangle} /> หมายเหตุ</b>
            <p>สมัครใช้งานได้เฉพาะนักศึกษาคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่เท่านั้น</p>
          </Alert>
        </FormGroup>
      </Form>
    </div>
  )
}
export default PanelCodeChecking