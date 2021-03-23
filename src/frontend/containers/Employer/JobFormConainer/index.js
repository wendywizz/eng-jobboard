import React, { useState, useRef, useEffect } from "react"
import { Row, Col, Button, Form, FormGroup, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import CheckboxTag from "Frontend/components/CheckboxTag"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import {
  SPECIFIC_TYPE,
  STRUCTURAL_TYPE,
  RANGE_TYPE,
  REQUEST_TYPE,
  SALARY_TYPE_OPTION
} from "Frontend/constants/salary-type"
import {
  WORK_TIME_OPTION
} from "Frontend/constants/time"
import day from "Frontend/constants/day"
import "./index.css"

function JobFormContainer() {
  const refForm = useRef()
  const { register, handleSubmit, errors } = useForm()
  const [valSalarySelected, setValSalarySelected] = useState(null)

  useEffect(() => {

  })

  const _handleSubmit = async (values) => {    
    console.log(values)
  }

  const renderSalaryInput = (value) => {
    const numberVal = value ? Number(value) : null

    switch (numberVal) {
      case SPECIFIC_TYPE.value:
        return (
          <FormGroup>
            <Label htmlFor="salary-value">ระบุเงินเดือน</Label>
            <input
              type="number"
              name="salary_value"
              id="salary-value"
              className="form-control"
              placeholder="ระบุเงินเดือน"
              ref={register({
                required: true
              })}
            />
            {errors.sslary_value?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
        )
      case RANGE_TYPE.value:
        return (
          <FormGroup>
            <Label htmlFor="salary-range">ระบุช่วงเงินเดือน</Label>
            <div className="group-range-salary" id="salary-range">
              <div className="min input">
                <input
                  type="number"
                  name="salary_min"
                  className="form-control"
                  placeholder="เริ่มต้น"
                  ref={register({
                    required: true
                  })}
                />                
              </div>
              <div className="seperator">ถึง</div>
              <div className="max input">
                <input
                  type="number"
                  name="salary_max"
                  className="form-control"
                  placeholder="สูงสุด"
                  ref={register({
                    required: true
                  })}
                />                
              </div>
            </div>
            {
              (errors.salary_min?.type === "required" && errors.salary_max?.type === "required")
              && <p className="validate-message">Field is required</p>
            }
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
            <Button color="primary" onClick={handleSubmit(_handleSubmit)}>สร้าง</Button>
            <Button color="danger">ยกเลิก</Button>
          </Col>
        </Row>
      </ContentHeader>
      <ContentBody>
        <Form className="distance form-input" ref={refForm}>
          <FormGroup>
            <Label htmlFor="job-name">ชื่อตำแหน่งงาน</Label>
            <input
              type="text"
              id="job-name"
              name="job_name"
              className={"form-control " + (errors.job_name?.type && "is-invalid")}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุชื่อตำแหน่งงาน</p>
            {errors.job_name?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-position">รายละเอียดงาน</Label>
            <textarea
              id="job-position"
              name="job_position"
              className={"form-control " + (errors.job_position?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุรายละเอียดของงานที่ผู้สมัครงานต้องรับผิดชอบ</p>
            {errors.job_position?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-duty">ขอบเขตงาน</Label>
            <textarea
              id="job-duty"
              name="job_duty"
              className={"form-control " + (errors.job_duty?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุขอบเขตหน้าที่ความรับผิดชอบของงาน</p>
            {errors.job_duty?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Label htmlFor="job-salary_type">อัตราเงินเดือน</Label>
                <select
                  id="job-salary_type"
                  name="job_salary_type"
                  className={"form-control " + (errors.job_salary_type?.type && "is-invalid")}
                  onChange={e => setValSalarySelected(e.target.value)}
                  ref={register({
                    required: true
                  })}
                >
                  <option></option>
                  {
                    SALARY_TYPE_OPTION.map((item, index) => (
                      <option key={index} value={item.value}>{item.label}</option>
                    ))
                  }
                </select>
                <p className="input-desc">เลือกประเภทของอัตราเงินเดือน</p>
                {errors.job_salary_type?.type === "required" && <p className="validate-message">Field is required</p>}
              </Col>
              <Col lg={4} md={6} sm={12}>
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
                day.map((value, index) => {
                  const isChecked = index < 5 ? true : false
                  return (
                    <CheckboxTag key={index} className="checkbox-day" text={value.text} value={value.value} checked={isChecked} />
                  )
                })
              }
            </div>
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Label>เวลาทำงาน</Label>
                <div className="time-range">
                  <div className="control start">
                    <Label htmlFor="time-start">เริ่ม</Label>
                    <select
                      className={"form-control control " + (errors.time_start?.type && "is-invalid")}
                      name="time_start"
                      id="time-start"
                      ref={register({
                        required: true
                      })}
                    >
                      <option></option>
                      {
                        WORK_TIME_OPTION.map((value, index) => (
                          <option key={index} value={value}>{value}</option>
                        ))
                      }
                    </select>
                  </div>
                  <div className="seperator">ถึง</div>
                  <div className="control end">
                    <Label htmlFor="time-end">สิ้นสุด</Label>
                    <select
                      className={"form-control control " + (errors.time_end?.type && "is-invalid")}
                      name="time_end"
                      id="time-end"
                      ref={register({
                        required: true
                      })}
                    >
                      <option></option>
                      {
                        WORK_TIME_OPTION.map((value, index) => (
                          <option key={index} value={value}>{value}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
                {
                  (errors.time_start?.type === "required" || errors.time_end?.type === "required")
                  && <p className="validate-message">Field is required</p>
                }
              </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-welfare">สวัสดิการ</Label>
            <textarea
              id="job-welfare"
              name="job_welfare"
              className={"form-control " + (errors.job_welfare?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุสวัสดิการที่ผู้เข้าทำงานจะได้รับ</p>
            {errors.job_welfare?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
        </Form>
      </ContentBody>
    </Content>
  )
}
export default JobFormContainer