import React, { useState } from "react"
import { Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { Editor, EditorState } from 'draft-js';
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import {
  SPECIFIC_TYPE,
  STRUCTURAL_TYPE,
  BETWEEN_TYPE,
  REQUEST_TYPE
} from "Frontend/constants/salary-type"
import "./index.css"
import "draft-js/dist/Draft.css";

function JobFormContainer({ ...props }) {
  const [valSalarySelected, setValSalarySelected] = useState(null)
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const renderSalaryInput = (value) => {
    const numberVal = value ? Number(value) : null

    switch (numberVal) {
      case SPECIFIC_TYPE.value:
        console.log(Number(value))
        return (
          <FormGroup>
            <Label>ระบุเงินเดือน</Label>
            <Input type="number" placeholder="ระบุเงินเดือน" />
          </FormGroup>
        )
      case BETWEEN_TYPE.value:
        return (
          <FormGroup>
            <Label>ระบุช่วงเงินเดือน</Label>
            <div className="group-range-salary">
              <div className="min input">
                <Input type="number" placeholder="ช่วงต่ำสุด" />
              </div>
              <div className="seperate">
                <span>ถึง</span>
              </div>
              <div className="max input">
                <Input type="number" placeholder="ช่วงสูงสุด" />
              </div>
            </div>
          </FormGroup>
        )
      case STRUCTURAL_TYPE.value: case REQUEST_TYPE.value: default:
        return (
          <div />
        )
    }
  }

  return (
    <Content>
      <ContentHeader>
        <Row>
          <Col>
            <Link className="btn btn-secondary" to={EMPLOYER_JOB_PATH(123)}>ย้อนกลับ</Link>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button color="primary">สร้าง</Button>
            <Button color="danger">ยกเลิก</Button>
          </Col>
        </Row>
      </ContentHeader>
      <ContentBody fill={true}>
        <Form className="distance">
          <FormGroup>
            <Label for="job-name">ชื่อตำแหน่งงาน</Label>
            <Input type="text" name="job-name" />
          </FormGroup>
          <FormGroup>
            <Label for="job-desc">รายละเอียดงาน</Label>
            <div
              className="input-element"
              onClick={focusEditor}
            >
              <Editor
                ref={editor}
                editorState={editorState}
                onChange={setEditorState}
                placeholder="Write something!"
              />
            </div>
          </FormGroup>
          <FormGroup>
            <Label for="job-scope">ขอบเขตงาน</Label>
            <Input type="textarea" name="job-scope" rows={4} />
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Label for="job-salary">อัตราเงินเดือน</Label>
                <Input type="select" name="job-salary" onChange={e => setValSalarySelected(e.target.value)} defaultValue={valSalarySelected}>
                  <option>--- เลือก ---</option>
                  <option value={SPECIFIC_TYPE.value}>{SPECIFIC_TYPE.label}</option>
                  <option value={BETWEEN_TYPE.value}>{BETWEEN_TYPE.label}</option>
                  <option value={STRUCTURAL_TYPE.value}>{STRUCTURAL_TYPE.label}</option>
                  <option value={REQUEST_TYPE.value}>{REQUEST_TYPE.label}</option>
                </Input>
              </Col>
              <Col lg={6} md={6} sm={12}>
                {
                  renderSalaryInput(valSalarySelected)
                }
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>สวัสดิการ</Label>
            <Input type="textarea" rows={4} />
          </FormGroup>
        </Form>
      </ContentBody>
    </Content>
  )
}
export default JobFormContainer