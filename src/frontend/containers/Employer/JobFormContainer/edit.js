import React, { useEffect, useReducer, useRef, useState } from "react"
import { Row, Col, Button, Spinner, Alert } from "reactstrap"
import { Link, useParams, useRouteMatch } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import FormJob from "./_form"
import "./index.css"

import { getJobByID, updateJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  READ_JOB_SUCCESS,
  READ_JOB_FAILED,
  SEND_REQUEST,
  SAVE_JOB_FAILED,
  SAVE_JOB_SUCCESS
} from "Shared/states/job/JobType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheckCircle, faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const INIT_DATA = {
  loading: true,
  status: false,
  data: null,
  message: null
}
function JobFormEditContainer() {
  const { id } = useParams()
  const refForm = useRef()
  const match = useRouteMatch(EMPLOYER_JOB_EDIT_PATH)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const [showResponse, setShowResponse] = useState(false)

  useEffect(() => {
    if (match) {
      async function fetchJobData(id) {
        const { data, error } = await getJobByID(id)

        if (error) {
          dispatch({ type: READ_JOB_FAILED, payload: { error } })
        } else {
          dispatch({ type: READ_JOB_SUCCESS, payload: { data } })
        }
      }

      if (state.loading) {
        setTimeout(() => {
          fetchJobData(id)
        }, 1000)
      }
    }
  })

  const _handleCallback = async (bodyData) => {
    dispatch({ type: SEND_REQUEST })

    setTimeout(async () => {
      const { status, data, message, error } = await updateJob(id, bodyData)

      if (status) {        
        const payload = { data, message }
        dispatch({ type: SAVE_JOB_SUCCESS, payload })
      } else {
        const payload = { message, error }
        dispatch({ type: SAVE_JOB_FAILED, payload })
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
            state.error
              ? <p>{state.error.message}</p>
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
                        <Button color="primary" onClick={() => refForm.current.submit()} disabled={state.loading}>บันทึก</Button>                        
                      </Col>
                    </Row>
                  </ContentHeader>
                  <ContentBody>
                    {showResponse && renderResponseMessage()}
                    <FormJob
                      ref={refForm}                      
                      editing={true}
                      id={state.data.id}
                      position={state.data.position}
                      jobType={state.data.jobType}
                      duty={state.data.duty}
                      performance={state.data.performance}
                      salaryType={state.data.salaryType}
                      amount={state.data.amount}
                      workDays={state.data.workDays}
                      workTimeStart={state.data.workTimeStart}
                      workTimeEnd={state.data.workTimeEnd}
                      welfare={state.data.welfare}
                      province={state.data.province}
                      district={state.data.district}
                      onSubmit={_handleCallback}
                    />
                  </ContentBody>
                </Content>
              )
          )
      }
    </>
  )
}
export default JobFormEditContainer