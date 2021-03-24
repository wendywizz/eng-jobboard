import React, { useState, useRef, useEffect, useReducer } from "react"
import { Row, Col, Button, Form, FormGroup, Label } from "reactstrap"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import CheckboxTag from "Frontend/components/CheckboxTag"
import RadioTag from "Frontend/components/RadioTag"
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

import { createJob, getJobType } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { ADD_SUCCESS, ADD_FAILED, READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType"

let INIT_DATA = {
  loading: true,
  stauts: false,
  result: null,
  message: null
}
function JobFormContainer() {
  const refForm = useRef()
  const { register, handleSubmit, errors } = useForm()
  const [jobType, setJobType] = useState([])
  const [valSalarySelected, setValSalarySelected] = useState(null)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

  useEffect(async () => {
    async function fetchJobType() {
      const data = await getJobType()
        .then(res => res.json())
        .then(res => {
          let data = []

          if (res.status) {
            res.result.map(item => (
              data.push({
                text: item.job_type_name,
                value: item.job_type_id
              })
            ))
          }
          return data
        })
      setJobType(data)
    }

    fetchJobType()
  })

  const _handleSubmit = async (values) => {
    let salary_min = 0, salary_max = 0
    if (values.salary_type === SPECIFIC_TYPE) {
      salary_min = values.salary_value
      salary_max = values.salary_value
    }
    const bodyData = {
      position: values.position,
      duty: values.duty,
      welfare: values.welfare,
      performance: values.performance,
      salary_type: values.salary_type,
      salary_min,
      salary_max,
      workdays: values.workdays,
      work_timestart: values.time_start,
      work_timeend: values.time_end
    }
    console.log(bodyData)

    /*await createJob(bodyData)
      .then(res => res.json())
      .then(res => {
        if (res.status) {
          dispatch({ type: ADD_SUCCESS })
        } else {
          dispatch({ type: ADD_FAILED })
        }
        console.log(res)
      })
      .catch(() => {
        dispatch({ type: ADD_FAILED })
      })*/
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
              className={"form-control " + (errors.salary_value?.type && "is-invalid")}
              placeholder="ระบุเงินเดือน"
              ref={register({
                required: true
              })}
            />
            {errors.salary_value?.type === "required" && <p className="validate-message">Field is required</p>}
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
                  className={"form-control " + (errors.salary_min?.type && "is-invalid")}
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
                  className={"form-control " + (errors.salary_max?.type && "is-invalid")}
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
            <Label htmlFor="position">ชื่อตำแหน่งงาน</Label>
            <input
              type="text"
              id="position"
              name="position"
              className={"form-control " + (errors.position?.type && "is-invalid")}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุชื่อตำแหน่งงาน</p>
            {errors.position?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="job-type">ประเภทงาน</Label>
            <div className="group-work-day horizontal">
              {
                jobType.map((value, index) => {
                  return (
                    <RadioTag
                      key={index}
                      name="job_type"
                      text={value.text}
                      value={value.value}
                    />
                  )
                })
              }
            </div>
          </FormGroup>
          <FormGroup>
            <Label htmlFor="position">รายละเอียดงาน</Label>
            <textarea
              id="position"
              name="position"
              className={"form-control " + (errors.position?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุรายละเอียดของงานที่ผู้สมัครงานต้องรับผิดชอบ</p>
            {errors.position?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="duty">ขอบเขตงาน</Label>
            <textarea
              id="duty"
              name="duty"
              className={"form-control " + (errors.duty?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุขอบเขตหน้าที่ความรับผิดชอบของงาน</p>
            {errors.duty?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label htmlFor="performance">คุณสมบัติผู้สมัคร</Label>
            <textarea
              id="performance"
              name="performance"
              className={"form-control " + (errors.performance?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุคุณสมบัติผู้สมัคร</p>
            {errors.performance?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Row>
              <Col lg={3} md={6} sm={12}>
                <Label htmlFor="salary_type">อัตราเงินเดือน</Label>
                <select
                  id="salary_type"
                  name="salary_type"
                  className={"form-control " + (errors.salary_type?.type && "is-invalid")}
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
                {errors.salary_type?.type === "required" && <p className="validate-message">Field is required</p>}
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
            <div className="group-work-day horizontal">
              {
                day.map((value, index) => {
                  const isChecked = index < 5 ? true : false
                  return (
                    <CheckboxTag
                      key={index}
                      name="work_days"
                      text={value.text}
                      value={value.value}
                      checked={isChecked}
                    />
                  )
                })
              }
            </div>
            {errors.work_days?.type === "required" && <p className="validate-message">Field is required</p>}
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
            <Label htmlFor="welfare">สวัสดิการ</Label>
            <textarea
              id="welfare"
              name="welfare"
              className={"form-control " + (errors.welfare?.type && "is-invalid")}
              rows={3}
              ref={register({
                required: true
              })}
              defaultValue="Test"
            />
            <p className="input-desc">ระบุสวัสดิการที่ผู้เข้าทำงานจะได้รับ</p>
            {errors.welfare?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
        </Form>
      </ContentBody>
    </Content>
  )
}
export default JobFormContainer