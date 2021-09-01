import React from "react"
import { faClock, faExclamationTriangle, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react/cjs/react.development";
import { Card, CardBody, Alert } from "reactstrap"
import { diffToday } from "Shared/utils/datetime";
import "./index.css"
import { Link } from "react-router-dom";
import { APPLY_JOB_PATH } from "Frontend/configs/paths";

export default function ApplyJobSection({ jobId, expireDate }) {
  const [day, setDay] = useState(0)

  useEffect(() => {
    const diffDay = diffToday(expireDate)
    setDay(diffDay)
  }, [expireDate])

  const applyContent = () => {
    return (
      <Card inverse>
        <CardBody>
          <Link className="btn btn-success btn-lg btn-block btn-apply" to={`${APPLY_JOB_PATH}/${jobId}`}>
            <FontAwesomeIcon icon={faSignInAlt} />
            {" "}สมัครงานนี้
          </Link>
          <Alert className="alert-day" color="danger">
            <FontAwesomeIcon icon={faClock} />
            {" "}เหลือเวลาเปิดรับสมัคร <b>{day} วัน</b>
          </Alert>
        </CardBody>
      </Card>
    )
  }

  const expiredContent = () => {
    return (
      <Card inverse color="danger">
        <CardBody>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          {" "}ปิดรับสมัครแล้ว
        </CardBody>
      </Card>
    )
  }

  return (
    <div className="section-apply-job">
      {
        day > 0
          ? applyContent()
          : expiredContent()
      }
    </div>
  );
}
