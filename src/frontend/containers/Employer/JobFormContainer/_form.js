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
} from "Shared/constants/salary-type"
import {
  WORK_TIME_OPTION
} from "Shared/constants/time"
import day from "Shared/constants/day"
import "./index.css"
import { getJobType, getJobCategory, getSalaryType } from "Shared/states/job/JobDatasource"
import { getProvince, getDistrictByProvince } from "Shared/states/area/AreaDatasource"

const JobForm = forwardRef(({ editing = false, id, position, jobType, jobCategory, duty, performance, salaryType, salaryMax, salaryMin, workDays, workTimeStart, workTimeEnd, welfare, province, district, amount, owner, companyOwner, onSubmit }, ref) => {
  const [ready, setReady] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const refSubmit = useRef(null)

  const [jobTypeData, setJobTypeData] = useState([])
  const [jobCategoryData, setJobCategoryData] = useState([])
  const [salaryTypeData, setSalaryTypeData] = useState([])
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])

  const [selectedSalaryType, setSelectedSalaryType] = useState(salaryType)
  const [selectedProvince, setSelectedProvince] = useState(province)
  const [selectedDistrict, setSelectedDistrict] = useState(district)

  useEffect(() => {
    if (!ready) {
      async function fetchJobType() {
        const { data } = await getJobType()
        const jobTypeData = data.map(item => ({
          text: item.name,
          value: item.id
        }))

        setJobTypeData(jobTypeData)
      }
      async function fetchJobCategory() {
        const { data } = await getJobCategory()
        const jobCategoryData = data.map(item => ({
          text: item.name,
          value: item.id
        }))

        setJobCategoryData(jobCategoryData)
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
      fetchJobCategory()
      fetchSalaryType()
      fetchProvince()

      setReady(true)
    }
  }, [editing, ready])

  useEffect(() => {
    // Watch on district change
    async function fetchDistrict(provinceId) {
      const { data } = await getDistrictByProvince(provinceId)
      const districtData = data.map(item => ({
        text: item.nameTh,
        value: item.id
      }))

      setDistrictData(districtData)
    }

    fetchDistrict(selectedProvince)
  }, [editing, selectedProvince])

  useImperativeHandle(ref, () => ({
    submit() {
      refSubmit.current.click()
    }
  }))

  const _handleSalaryTypeChanged = (e) => {
    const salaryTypeId = e.target.value
    setSelectedSalaryType(salaryTypeId)
  }

  const _handleProvinceChanged = (e) => {
    const provinceId = e.target.value
    setSelectedProvince(provinceId)
  }

  const _handleDistrictChanged = (e) => {
    const districtId = e.target.value
    setSelectedDistrict(districtId)
  }

  const _handleSubmit = (values) => {
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

    const bodyData = {}
    bodyData.position = values.position
    bodyData.job_type = values.job_type
    bodyData.category = values.category
    bodyData.amount = values.amount
    bodyData.duty = values.duty
    bodyData.welfare = values.welfare
    bodyData.performance = values.performance
    bodyData.salary_type = values.salary_type
    bodyData.salary_min = salary_min
    bodyData.salary_max = salary_max
    bodyData.work_days = JSON.stringify(workdaysSelect)
    bodyData.work_timestart = values.time_start
    bodyData.work_timeend = values.time_end
    bodyData.province = values.province
    bodyData.district = values.district

    if (!editing) {
      bodyData.company_owner = companyOwner
      bodyData.created_by = owner
    } else {
      bodyData.id = id
    }
    onSubmit(bodyData)
  }

  const renderSalaryInput = () => {
    if (selectedSalaryType) {
      switch (selectedSalaryType.toString()) {
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
                defaultValue={salaryMin}
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
                    defaultValue={salaryMin}
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
                    defaultValue={salaryMax}
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
  }

  return (
    <>
      {
        ready && (
          <Suspense fallback={"loading..."}>
            <Form className="distance form-input" onSubmit={handleSubmit(_handleSubmit)}>
              <button ref={refSubmit} type="submit" style={{ display: "none" }}></button>
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
                <Label htmlFor="category">หมวดหมู่</Label>
                <div className="group-category">
                  <Row>
                    {
                      jobCategoryData.map((item, index) => {
                        return (
                          <Col lg={4} md={4} sm={12} key={index}>
                            <RadioTag
                              name="category"
                              id={`category_${index}`}
                              text={item.text}
                              value={item.value}
                              ref={register({
                                required: true
                              })}
                              checked={jobCategory === item.value}
                            />
                          </Col>
                        )
                      })
                    }
                  </Row>
                </div>
                {errors.category?.type === "required" && <p className="validate-message">Please select one of them</p>}
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
                      onChange={_handleSalaryTypeChanged}
                      value={selectedSalaryType}
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
                      renderSalaryInput()
                    }
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="province">พื้นที่</Label>
                <Row>
                  <Col lg={3} md={4} sm={12}>
                    <select
                      id="province"
                      name="province"
                      className={"form-control " + (errors.province?.type && "is-invalid")}
                      onChange={_handleProvinceChanged}
                      ref={register({
                        validate: {
                          noSelected: value => value !== "-1"
                        }
                      })}
                      value={selectedProvince}
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
                      selectedProvince !== "-1" && (
                        <select
                          id="district"
                          name="district"
                          className={"form-control " + (errors.district?.type && "is-invalid")}
                          ref={register({
                            validate: {
                              noSelected: value => value !== "-1"
                            }
                          })}
                          onChange={_handleDistrictChanged}
                          value={selectedDistrict}
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
                  (errors.province?.type === "noSelected" || errors.district?.type === "noSelected")
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
                        if (workDays) {
                          const wdJSON = JSON.parse(workDays)
                          isChecked = wdJSON[item.value] ? true : false
                        }
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
      }
    </>
  )
})
export default JobForm