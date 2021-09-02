import React from "react"
import { faClock, faExclamationTriangle, faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react/cjs/react.development";
import { Card, CardBody, Alert, Button } from "reactstrap"
import { diffToday } from "Shared/utils/datetime";
import { Link } from "react-router-dom";
import { APPLY_JOB_PATH } from "Frontend/configs/paths";
import { useAuth } from "Shared/context/AuthContext";
import { checkCanApplyJobByUser } from "Shared/states/apply/ApplyDatasource";
import SpinnerBlock from "Frontend/components/SpinnerBlock";
import "./index.css"

export default function CardApplyButton({ jobId, expireDate }) {
  const [ready, setReady] = useState(false)
  const [canApply, setCanApply] = useState(false)
  const [day, setDay] = useState(0)
  const { authUser } = useAuth()

  useEffect(() => {
    async function fetchData() {
      if (authUser) {
        const applied = await checkCanApplyJobByUser(jobId, authUser.id)
        setCanApply(applied)
      }
      setReady(true)
    }

    if (!ready) {
      setTimeout(() => {
        fetchData()
      }, 1000)
    }
  })

  useEffect(() => {
    const diffDay = diffToday(expireDate)
    setDay(diffDay)
  }, [expireDate])

  const renderApplyContent = () => {
    return (
      <Card>
        <CardBody>
          {
            !ready ? <SpinnerBlock size="sm" />
              : (
                <>
                  {
                    canApply ? (
                      <Link className="btn btn-success btn-lg btn-block btn-apply" to={`${APPLY_JOB_PATH}/${jobId}`}>
                        <FontAwesomeIcon icon={faSignInAlt} />
                        {" "}สมัครงานนี้
                      </Link>
                    ) : (
                      <Button className="btn-apply" color="danger" block disabled>
                        <FontAwesomeIcon icon={faExclamationTriangle} />
                        {" "}ท่านสมัครงานนี้แล้ว
                      </Button>
                    )
                  }

                  <Alert className="alert-day" color="danger">
                    <FontAwesomeIcon icon={faClock} />
                    {" "}เหลือเวลาเปิดรับสมัคร <b>{day} วัน</b>
                  </Alert>


                </>
              )
          }
        </CardBody>
      </Card>
    )
  }

  const renderExpiredContent = () => {
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
    <div className="card-apply-button">
      {
        day > 0
          ? renderApplyContent()
          : renderExpiredContent()
      }
    </div>
  );
}
