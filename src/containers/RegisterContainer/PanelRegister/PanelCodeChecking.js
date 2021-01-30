import React from "react"
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap"
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function PanelCodeChecking() {
  return (
    <Form>
      <FormGroup>
        <div className="input-inner">
          <Label>รหัสนักศึกษา</Label>
          <Input placeholder="xxxxxxxxxx" />
        </div>
        <Button block color="primary">ตรวจสอบ</Button>
        <Alert color="info">
          <b><FontAwesomeIcon icon={faExclamationTriangle} /> หมายเหตุ</b>
          <p>สมัครใช้งานได้เฉพาะนักศึกษาคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์ วิทยาเขตหาดใหญ่เท่านั้น</p>
        </Alert>
      </FormGroup>
    </Form>
  )
}
export default PanelCodeChecking