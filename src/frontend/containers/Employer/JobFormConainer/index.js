import React, { useState } from "react"
import { Row, Col, Button, Form, FormGroup, Input, Label } from "reactstrap"
import { Link } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import CheckboxTag from "Frontend/components/CheckboxTag"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import {
  SPECIFIC_TYPE,
  STRUCTURAL_TYPE,
  BETWEEN_TYPE,
  REQUEST_TYPE
} from "Frontend/constants/salary-type"
import day from "Frontend/constants/day"
import "./index.css"

function JobFormContainer() {
  const [valSalarySelected, setValSalarySelected] = useState(null)

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
              <div className="seperator">ถึง</div>
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
    <Content className="content-jobform">
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
      <ContentBody>
        <Form className="distance form-input">
          <FormGroup>
            <Label htmlFor="job-name">ชื่อตำแหน่งงาน</Label>
            <Input type="text" name="job-name" />
            <p className="input-desc">ระบุชื่อตำแหน่งงาน</p>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-desc">รายละเอียดงาน</Label>
            <Input type="textarea" rows={3} />
            <p className="input-desc">ระบุรายละเอียดของงานที่ผู้สมัครงานต้องรับผิดชอบ</p>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-desc">ขอบเขตงาน</Label>
            <Input type="textarea" rows={3} />
            <p className="input-desc">ระบุขอบเขตหน้าที่ความรับผิดชอบของงาน</p>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <Label htmlFor="job-salary">อัตราเงินเดือน</Label>
                <Input type="select" name="job-salary" onChange={e => setValSalarySelected(e.target.value)} defaultValue={valSalarySelected}>
                  <option>--- เลือก ---</option>
                  <option value={SPECIFIC_TYPE.value}>{SPECIFIC_TYPE.label}</option>
                  <option value={BETWEEN_TYPE.value}>{BETWEEN_TYPE.label}</option>
                  <option value={STRUCTURAL_TYPE.value}>{STRUCTURAL_TYPE.label}</option>
                  <option value={REQUEST_TYPE.value}>{REQUEST_TYPE.label}</option>
                </Input>
                <p className="input-desc">เลือกประเภทของอัตราเงินเดือน</p>
              </Col>
              <Col lg={6} md={6} sm={12}>
                {
                  renderSalaryInput(valSalarySelected)
                }
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label>วันทำงาน</Label>
            <div className="group-work-day">
              {
                day.map((value, index) => (
                  <CheckboxTag key={index} className="checkbox-day" text={value.text} value={value.value} />
                ))
              }
            </div>
          </FormGroup>
          <FormGroup>
            <Label>เวลาทำงาน</Label>
            <div className="time-range">
              <div className="input-time start">
                <Label>เริ่ม</Label>
                <Input className="control" type="select">
                  <option>-</option>
                </Input>
              </div>
              <div className="seperator">ถึง</div>
              <div className="input-time end">
                <Label>สิ้นสุด</Label>
                <Input className="control" type="select">
                  <option>-</option>
                </Input>
              </div>
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-desc">สวัสดิการ</Label>
            <Input type="textarea" rows={3} />
            <p className="input-desc">ระบุสวัสดิการที่ผู้เข้าทำงานจะได้รับ</p>
          </FormGroup>
        </Form>
      </ContentBody>
    </Content>
  )
}
export default JobFormContainer