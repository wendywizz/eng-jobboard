import React from "react"
import { Row, Col } from "reactstrap"
import JobDetailTag from "Frontend/components/JobDetailTag";
import {
  faMapMarker,
  faMoneyBill,
  faThLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./index.css"

export default function JobTagInfo({ location, salary, amount, jobCategoryName }) {
  return (
    <div className="detail-tag">
    <Row>
      <Col>
        <JobDetailTag
          icon={<FontAwesomeIcon icon={faMapMarker} />}
          label={"สถานที่ปฎิบัติงาน"}
          value={location}
        />
      </Col>
      <Col>
        <JobDetailTag
          icon={<FontAwesomeIcon icon={faMoneyBill} />}
          label={"อัตราเงินเดือน"}
          value={salary}
        />
      </Col>
    </Row>
    <Row>
      <Col>
        <JobDetailTag
          icon={<FontAwesomeIcon icon={faUser} />}
          label={"จำนวนรับสมัคร"}
          value={amount + " ตำแหน่ง"}
        />
      </Col>
      <Col>
        <JobDetailTag
          icon={<FontAwesomeIcon icon={faThLarge} />}
          label={"กลุ่มงาน"}
          value={jobCategoryName}
        />
      </Col>
    </Row>
  </div>
  )
}