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
import {
  SALARY_NO_TYPE,
  SALARY_RANGE_TYPE,
  SALARY_REQUEST_TYPE,
  SALARY_SPECIFIC_TYPE,
  SALARY_STRUCTURAL_TYPE,
} from "Shared/constants/salary-type";
import { toMoney } from "Shared/utils/money";
import "./index.css"

export default function JobTagInfo({ location, salaryTypeAsso, salaryMin, salaryMax, amount, jobCategoryName }) {

  const renderSalaryValue = (type, min, max) => {
    switch (type.id) {
      case SALARY_SPECIFIC_TYPE.value:
        return toMoney(min) + " บาท";
      case SALARY_RANGE_TYPE.value:
        return toMoney(min) + " - " + toMoney(max) + " บาท";
      case SALARY_STRUCTURAL_TYPE.value:
      case SALARY_REQUEST_TYPE.value:
      case SALARY_NO_TYPE.value:
        return type.name;
      default:
        return "-";
    }
  };

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
            value={renderSalaryValue(salaryTypeAsso, salaryMin, salaryMax)}
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