import React, { useState } from "react";
import { Form, FormGroup, Input, Label, Button, Alert } from "reactstrap";
import {
  faExclamationTriangle,
  faSpinner,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { identifyStudent } from "Shared/states/user/UserDatasource";
import Section from "Frontend/components/Section";
import "./index.css";

function PanelCodeChecking({ onCallback }) {
  const [submitting, setSubmitting] = useState(false);
  const [studentCode, setStudentCode] = useState(6310130019);
  const [personNo, setPersonNo] = useState(1749900201835);
  const [message, setMessage] = useState(null);

  const _handleSubmit = (e) => {
    e.preventDefault();

    setSubmitting(true);
    setTimeout(async () => {
      const { success, message } = await identifyStudent(studentCode, personNo);

      if (success) {
        onCallback(true, { studentCode, personNo });
      } else {
        setMessage(message);
      }
      setSubmitting(false);
    }, 1000);
  };

  return (
    <Section
      className="section-panel"
      title={"ตรวจสอบรหัสนักศึกษา"}
      titleDesc={
        "บริการนี้รองรับเฉพาะนักศึกษาและศิษย์เก่าคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์เท่านั้น"
      }
      centeredTitle={false}
    >
      <Form onSubmit={_handleSubmit}>
        <div className="input-inner">
          <FormGroup>
            <Label>รหัสนักศึกษา</Label>
            <Input
              placeholder="ระบุรหัสนักศึกษา"
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
            />
          </FormGroup>
          <FormGroup>
            <Label>รหัสประจำตัวประชาชน</Label>
            <Input
              placeholder="ระบุตัวเลข 13 หลัก Ex. xxxxxxxxxxxxx"
              value={personNo}
              onChange={(e) => setPersonNo(e.target.value)}
            />
          </FormGroup>
        </div>
        <div className="panel-action">
          <Button color="danger" disabled={submitting}>
            {submitting ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {" ตรวจสอบ"}
          </Button>
        </div>
        {message && (
          <Alert color="danger">
            <b>
              <FontAwesomeIcon icon={faExclamationTriangle} /> Error
            </b>
            <p>{message}</p>
          </Alert>
        )}
      </Form>
    </Section>
  );
}
export default PanelCodeChecking;