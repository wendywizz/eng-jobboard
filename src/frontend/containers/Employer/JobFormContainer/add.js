import React, { useReducer, useRef, useState } from "react"
import { Row, Col, Button, Alert, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import FormJob from "./_form"
import "./index.css"

import { createJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED,
  SEND_REQUEST
} from "Shared/states/job/JobType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const INIT_DATA = {
  loading: false,
  status: false,
  data: null,
  message: null
}
function JobFormAddContainer() {
  const refForm = useRef()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const [showResponse, setShowResponse] = useState(false)

  const _handleCallback = (bodyData) => {
    dispatch({ type: SEND_REQUEST })

    setTimeout(async () => {
      const { status, data, message, error } = await createJob(bodyData)

      if (status) {
        const payload = { message, data }
        dispatch({ type: ADD_JOB_SUCCESS, payload })
      } else {
        const payload = { message, error }
        dispatch({ type: ADD_JOB_FAILED, payload })
      }

      // Show response message      
      setShowResponse(true)      

      if (status) {
        setTimeout(() => {
          setShowResponse(false)
        }, 5000)
      }
    }, 2000)
  }

  const renderResponseMessage = () => {
    let alertType = "secondary", icon, title
    if (state.status) {
      title = "Save success"
      icon = <FontAwesomeIcon icon={faCheckCircle} />
      alertType = "success"
    } else {
      title = "Save failed"
      icon = <FontAwesomeIcon icon={faTimesCircle} />
      alertType = "danger"
    }

    return (
      <Alert color={alertType}>
        <b>{icon} {title}</b>
        <p>{state.message}</p>
      </Alert>
    )
  }

  return (
    <>
      {
        state.loading
          ? <Spinner />
          : (
            <Content className="content-jobform">
              <ContentHeader>
                <Row>
                  <Col>
                    <Link to={EMPLOYER_JOB_PATH}>
                      <Button color="secondary" disabled={state.loading}>ย้อนกลับ</Button>
                    </Link>
                  </Col>
                  <Col style={{ textAlign: "right" }}>
                    <Button color="primary" onClick={() => refForm.current.submit()} disabled={state.loading}>สร้าง</Button>
                  </Col>
                </Row>
              </ContentHeader>
              <ContentBody>
                {showResponse && renderResponseMessage()}
                <FormJob
                  ref={refForm}
                  editing={false}
                  position="HTET"
                  jobType={1}
                  duty={"TEST"}
                  performance={"TEST"}
                  salaryType={4}
                  amount={2}
                  workTimeStart="19:00"
                  workTimeEnd="22:00"
                  province={70}
                  district={928}
                  welfare={"ESTE"}
                  onSubmit={_handleCallback}
                />
              </ContentBody>
            </Content>
          )
      }
    </>
  )
}
export default JobFormAddContainer