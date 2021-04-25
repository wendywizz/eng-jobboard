import React from "react"
import { Badge, Button } from "reactstrap"
import { JOB_TYPE_COOP, JOB_TYPE_FULLTIME, JOB_TYPE_INTERNSHIP, JOB_TYPE_PARTTIME } from "Shared/constants/job-type"
import { RANGE_TYPE, SPECIFIC_TYPE } from "Shared/constants/salary-type"
import "./index.css"

export default function BoxJobInfo({ jobTypeId, jobTypeName, jobCategory, area, salaryTypeId, salaryTypeName, salaryMin, salaryMax, amount }) {
  const renderJobType = () => {
    let type = "default"
    
    switch (jobTypeId.toString()) {
      case JOB_TYPE_FULLTIME:
        type = "primary"
        break
      case JOB_TYPE_PARTTIME:
        type = "secondary"
        break
      case JOB_TYPE_INTERNSHIP:
        type = "warning"
        break
      case JOB_TYPE_COOP:
        type = "success"
        break
      default:
        type = "default"
        break
    }

    return (<Badge className="badge-jobtype" color={type}>{jobTypeName}</Badge>)
  }
  const renderSalary = () => {
    switch (salaryTypeId) {
      case SPECIFIC_TYPE:
        return salaryMin
      case RANGE_TYPE:
        return salaryMin + " - " + salaryMax
      default:
        return salaryTypeName
    }
  }
  return (
    <div className="box-jobinfo">
      <h4 className="title">รายละเอียดงาน</h4>
      <ul className="list-detail">
        <li>
          <div className="detail">
            <div className="label">ประเภทงาน</div>
            <div className="value">{renderJobType()}</div>
          </div>
        </li>
        <li>
          <div className="detail">
            <div className="label">หมวดหมู่</div>
            <div className="value">{jobCategory}</div>
          </div>
        </li>
        <li>
          <div className="detail">
            <div className="label">พื้นที่ปฎิบัติงาน</div>
            <div className="value">{area}</div>
          </div>
        </li>
        <li>
          <div className="detail">
            <div className="label">เงินเดือน</div>
            <div className="value">{renderSalary()}</div>
          </div>
        </li>
        <li>
          <div className="detail">
            <div className="label">จำนวนรับสมัคร</div>
            <div className="value">{amount + " ตำแหน่ง"}</div>
          </div>
        </li>
      </ul>
      <div className="apply">
        <Button size="lg" color="primary" block>สมัครงานนี้</Button>
      </div>
    </div>
  )
}