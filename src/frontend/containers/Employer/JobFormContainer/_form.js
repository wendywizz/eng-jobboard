import React, { forwardRef, Suspense, useEffect, useRef, useState, useImperativeHandle } from "react"
import { useForm } from "react-hook-form"
import { Row, Col, Form, FormGroup, Label } from "reactstrap"
import CheckboxTag from "Frontend/components/CheckboxTag"
import RadioTag from "Frontend/components/RadioTag"
import _ from "lodash"
import {
  SPECIFIC_TYPE,
  STRUCTURAL_TYPE,
  RANGE_TYPE,
  REQUEST_TYPE,
  NO_TYPE
} from "Frontend/constants/salary-type"
import {
  WORK_TIME_OPTION
} from "Frontend/constants/time"
import day from "Frontend/constants/day"
import "./index.css"
import { getJobType, getSalaryType } from "Shared/states/job/JobDatasource"
import { getProvince, getDistrictByProvince } from "Shared/states/area/AreaDatasource"

const JobForm = forwardRef(({ editing = false, position, jobType, duty, performance, salaryType, workDays, workTimeStart, workTimeEnd, welfare, province, district, amount, onSubmit }, ref) => {
  const { register, handleSubmit, watch, errors } = useForm()
  const refForm = useRef()
  const refSubmit = useRef()
  const selectedProvince = useRef({}), selectedSalaryType = useRef({})
  selectedProvince.current = watch("area_province", "")
  selectedSalaryType.current = watch("salary_type", "")

  const [jobTypeData, setJobTypeData] = useState([])
  const [salaryTypeData, setSalaryTypeData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])

  useEffect(() => {
    async function fetchJobType() {
      const { data } = await getJobType()
      const jobTypeData = data.map(item => ({
        text: item.name,
        value: item.id
      }))

      setJobTypeData(jobTypeData)
    }
    async function fetchSalaryType() {
      const { data } = await getSalaryType()
      
      const salaryTypeData = data.map(item => ({
        text: item.name,
        value: item.id
      }))
      
      setSalaryTypeData(salaryTypeData)
    }
    async function fetchProvince() {
      const { data } = await getProvince()
      const provinceData = data.map(item => ({
        text: item.nameTh,
        value: item.id
      }))

      setProvinceData(provinceData)
    }

    fetchJobType()
    fetchSalaryType()
    fetchProvince()

    if (editing) {
      fetchDistrict(province)
    }
  }, [editing, province])

  const fetchDistrict = async (id) => {
    const { data } = await getDistrictByProvince(id)
    const districtData = data.map(item => ({
      text: item.nameTh,
      value: item.id
    }))

    setDistrictData(districtData)
  }

  const _handleProvinceChanged = (e) => {
    const id = e.target.value
    fetchDistrict(id)
  }

  useImperativeHandle(ref, () => ({
    submit() {
      //refForm.current.dispatchEvent(new Event('submit', { cancelable: true }))
      //refForm.current.dispatchEvent(new Event("submit"))    
      refSubmit.current.dispatchEvent(new Event("click", { cancelable: true }))
    }
  }))

  const _handleSubmit = (values) => {
    console.log("VALUES", values)
    let salary_min = 0, salary_max = 0
    let workdaysSelect = {}

    switch (values.salary_type) {
      case SPECIFIC_TYPE.value:
        salary_min = values.salary_value
        salary_max = values.salary_value
        break
      case RANGE_TYPE.value:
        salary_min = values.salary_min
        salary_max = values.salary_max
        break
      default:
        break
    }

    const workdays = values.workdays
    if (workdays) {
      workdaysSelect.mon = _.includes(workdays, "mon") ? 1 : 0
      workdaysSelect.tue = _.includes(workdays, "tue") ? 1 : 0
      workdaysSelect.wed = _.includes(workdays, "wed") ? 1 : 0
      workdaysSelect.thu = _.includes(workdays, "thu") ? 1 : 0
      workdaysSelect.fri = _.includes(workdays, "fri") ? 1 : 0
      workdaysSelect.sat = _.includes(workdays, "sat") ? 1 : 0
      workdaysSelect.sun = _.includes(workdays, "sun") ? 1 : 0
    }

    const bodyData = {
      position: values.position,
      job_type: values.job_type,
      amount: values.amount,
      duty: values.duty,
      welfare: values.welfare,
      performance: values.performance,
      salary_type: values.salary_type,
      salary_min,
      salary_max,
      work_days: JSON.stringify(workdaysSelect),
      work_timestart: values.time_start,
      work_timeend: values.time_end,
      area_pid: values.area_province,
      area_did: values.area_district,
      cid: 42,
      uid: 32
    }
    onSubmit(bodyData)
  }

  const renderSalaryInput = (value) => {
    switch (value) {
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
      case STRUCTURAL_TYPE.value: case REQUEST_TYPE.value: case NO_TYPE.value: default:
        return (
          <div />
        )
    }
  }

  return (
    <Suspense fallback={"loading..."}>
      <Form className="distance form-input" ref={refForm} onSubmit={handleSubmit(_handleSubmit)}>
        <button ref={refSubmit} type="submit">ss</button>
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
            defaultValue={position}
          />
          <p className="input-desc">ระบุชื่อตำแหน่งงาน</p>
          {errors.position?.type === "required" && <p className="validate-message">Field is required</p>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="job-type">ประเภทงาน</Label>
          <div className="group-work-day horizontal">
            {
              jobTypeData.map((item, index) => {
                return (
                  <RadioTag
                    key={index}
                    name="job_type"
                    id={`job_type_${index}`}
                    text={item.text}
                    value={item.value}
                    ref={register({
                      required: true,
                    })}
                    checked={jobType === item.value}
                  />
                )
              })
            }
          </div>
          {errors.job_type?.type === "required" && <p className="validate-message">Please select one of them</p>}
        </FormGroup>
        <FormGroup>
          <Row>
            <Col lg={3} md={3} sm={12}>
              <Label htmlFor="amount">จำนวนรับสมัคร</Label>
              <input
                type="number"
                id="amount"
                name="amount"
                className={"form-control " + (errors.amount?.type && "is-invalid")}
                ref={register({
                  required: true,
                  validate: {
                    onlyPositive: value => parseInt(value, 10) > 0
                  }
                })}
                min={1}
                defaultValue={amount}
              />
              <p className="input-desc">ระบุจำนวนรับสมัคร</p>
              {errors.amount?.type === "required" && <p className="validate-message">Field is required</p>}
              {errors.amount?.type === "onlyPositive" && <p className="validate-message">Value must greater than 0</p>}
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="duty">รายละเอียดงาน</Label>
          <textarea
            id="duty"
            name="duty"
            className={"form-control " + (errors.duty?.type && "is-invalid")}
            rows={3}
            ref={register({
              required: true
            })}
            defaultValue={duty}
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
            defaultValue={performance}
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
                ref={register({
                  validate: {
                    noSelected: value => value !== "-1"
                  }
                })}
                value={salaryType ? salaryType : "-1"}
                onChange={() => console.log("selected salary")}
              >
                <option value="-1">เลือกเงินเดือน</option>
                {
                  salaryTypeData.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>                    
                  ))
                }
              </select>
              <p className="input-desc">เลือกประเภทของอัตราเงินเดือน</p>
              {errors.salary_type?.type === "required" && <p className="validate-message">Field is required</p>}
            </Col>
            <Col lg={4} md={6} sm={12}>
              {
                renderSalaryInput(selectedSalaryType.current)
              }
            </Col>
          </Row>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="area-province">พื้นที่</Label>
          <Row>
            <Col lg={3} md={4} sm={12}>
              <select
                id="area-province"
                name="area_province"
                className={"form-control " + (errors.area_province?.type && "is-invalid")}
                onChange={_handleProvinceChanged}
                ref={register({
                  validate: {
                    noSelected: value => value !== "-1"
                  }
                })}
                value={province ? province : "-1"}
              >
                <option value="-1">เลือกจังหวัด</option>
                {
                  provinceData.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                  ))
                }
              </select>
            </Col>
            <Col lg={3} md={4} sm={12}>
              {
                selectedProvince.current !== "-1" && (
                  <select
                    id="area-district"
                    name="area_district"
                    className={"form-control " + (errors.area_district?.type && "is-invalid")}
                    ref={register({
                      validate: {
                        noSelected: value => value !== "-1"
                      }
                    })}
                    defaultValue={district ? district : "-1"}
                  >
                    <option value="-1">เลือกอำเภอ/เขต</option>
                    {
                      districtData.map((item, index) => (
                        <option key={index} value={item.value}>{item.text}</option>
                      ))
                    }
                  </select>
                )
              }
            </Col>
          </Row>
          <p className="input-desc">เลือกพื้นที่ผู้สมัครงานปฎิบัติงาน</p>
          {
            (errors.area_province?.type === "noSelected" || errors.area_district?.type === "noSelected")
            && <p className="validate-message">Field is required</p>
          }
        </FormGroup>
        <FormGroup>
          <Label>วันทำงาน</Label>
          <div className="group-work-day horizontal">
            {
              day.map((item, index) => {
                let isChecked = 0
                if (editing) {
                  const wdJSON = JSON.parse(workDays)
                  isChecked = wdJSON[item.value] ? true : false
                } else {
                  isChecked = index < 5 ? true : false
                }

                return (
                  <CheckboxTag
                    key={index}
                    name="workdays"
                    text={item.text}
                    value={item.value}
                    checked={isChecked}
                    ref={register({
                      required: true
                    })}
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
                    defaultValue={workTimeStart}
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
                    defaultValue={workTimeEnd}
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
            defaultValue={welfare}
          />
          <p className="input-desc">ระบุสวัสดิการที่ผู้เข้าทำงานจะได้รับ</p>
          {errors.welfare?.type === "required" && <p className="validate-message">Field is required</p>}
        </FormGroup>
      </Form>
    </Suspense>
  )
})
export default JobForm