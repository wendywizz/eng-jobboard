import React, { useReducer, useState, useRef } from "react"
import { Row, Col, Button } from "reactstrap"
import { Link } from "react-router-dom"
import Content, { ContentHeader, ContentBody } from "Frontend/components/Content"
import { EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import { useToasts } from 'react-toast-notifications'
import FormJob from "./_form"
import { createJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  ADD_SUCCESS,
  ADD_FAILED
} from "Shared/states/job/JobType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import "./index.css"

const INIT_DATA = {
  success: false,
  data: null,
  message: null
}
function JobFormAddContainer() {
  const [saving, setSaving] = useState(false)
  const refForm = useRef()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const { addToast } = useToasts()

  const _handleCallback = (bodyData) => {
    setSaving(true)
    setTimeout(async () => {
      const { success, data, message, error } = await createJob(bodyData)

      if (success) {
        dispatch({ type: ADD_SUCCESS, payload: { data, message } })
      } else {
        dispatch({ type: ADD_FAILED, payload: { message, error } })
      }
      setSaving(false)
      responseMessage(success, message)
    }, 2000)
  }

  const responseMessage = (success, message) => {
    let type
    if (success) {
      type = "success"
    } else {
      type = "error"
    }

    addToast(message, { appearance: type })
  }

  return (

    <Content className="content-jobform">
      <ContentHeader>
        <Row>
          <Col>
            <Link to={EMPLOYER_JOB_PATH}>
              <Button color="secondary" disabled={saving}>ย้อนกลับ</Button>
            </Link>
          </Col>
          <Col style={{ textAlign: "right" }}>
            <Button color="primary" onClick={() => refForm.current.submit()} disabled={saving}>
              {
                saving ? (
                  <>
                    <FontAwesomeIcon icon={faCircleNotch} spin />
                    <span>{" "}กำลังบันทึก</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faSave} />
                    <span>{" "}สร้าง</span>
                  </>
                )
              }
            </Button>
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