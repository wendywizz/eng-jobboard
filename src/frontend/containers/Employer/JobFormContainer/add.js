import React, { useReducer, useRef } from "react"
import { Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import FormJob from "./_form"
import "./index.css"

import { createJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  ADD_JOB_SUCCESS,
  ADD_JOB_FAILED
} from "Shared/states/job/JobType"

const INIT_DATA = {
  loading: false,
  status: false,
  data: null,
  message: null
}
function JobFormAddContainer() {
  const refForm = useRef()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

  const _handleCallback = async (data) => {
    //dispatch({ type: WAITING_JOB_OPERATION })

    /*const { status, result, message } = await createJob(bodyData)
    console.log(status, result, message)*/
    console.log(data)
  }

  return (
    <Content className="content-jobform">
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
        <FormJob
          ref={refForm}
          editing={false}
          onSubmit={_handleCallback}
        />
      </ContentBody>
    </Content>
  )
}
export default JobFormAddContainer