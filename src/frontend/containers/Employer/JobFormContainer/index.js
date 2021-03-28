import React, { useEffect, useReducer, useRef } from "react"
import { Row, Col, Button, Spinner } from "reactstrap"
import { Link, useParams, useRouteMatch } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import FormJob from "./form"
import "./index.css"

import { createJob, getJobByID } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED,
  READ_JOB_SUCCESS,
  READ_JOB_FAILED,
  SEND_REQUEST,
  STOP_REQUEST,
} from "Shared/states/job/JobType"

let INIT_DATA = {
  loading: false,
  status: false,
  data: null,
  message: null
}
function JobFormContainer() {
  const refForm = useRef()
  const match = useRouteMatch(EMPLOYER_JOB_EDIT_PATH)
  const { id } = useParams()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

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

      dispatch({ type: SEND_REQUEST })
      if (state.loading) {
        setTimeout(() => {
          fetchJobData(id)
        }, 1000)
      }
    }
  })

  const _handleCallback = async (data) => {
    //dispatch({ type: WAITING_JOB_OPERATION })

    /*const { status, result, message } = await createJob(bodyData)
    console.log(status, result, message)*/
    console.log(data)
  }

  const renderForm = () => {
    if (state.data) {
      return (<FormJob
        ref={refForm}
        position={state.data.position}
        duty={state.data.duty}
        salaryType={state.data.salaryType}
        amount={state.data.amount}
        workTimeStart={state.data.workTimeStart}
        workTimeEnd={state.data.workTimeEnd}
        welfare={state.data.welfare}
        province={state.data.province}
        district={state.data.district}
        onSubmit={_handleCallback}
      />)
    } else {
      return (
        <FormJob
          onSubmit={_handleCallback}
        />
      )
    }
  }

  return (
    <Content className="content-jobform">
      {
        state.loading
          ? <Spinner />
          : (
            state.error
              ? <p>{state.error}</p>
              : (
                <>
                  <ContentHeader>
                    <Row>
                      <Col>
                        <Link className="btn btn-secondary" to={EMPLOYER_JOB_PATH}>ย้อนกลับ</Link>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        <Button color="primary" onClick={() => refForm.current.submit()}>สร้าง</Button>
                        <Button color="danger">ยกเลิก</Button>
                      </Col>
                    </Row>
                  </ContentHeader>
                  <ContentBody>
                    {renderForm()}
                  </ContentBody>
                </>
              )
          )
      }
    </Content>
  )
}
export default JobFormContainer