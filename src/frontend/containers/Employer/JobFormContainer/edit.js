import React, { useEffect, useState, useReducer, useRef } from "react"
import { Row, Col, Button } from "reactstrap"
import { Link, useParams, useRouteMatch } from "react-router-dom"
import Content, { ContentHeader, ContentBody, ContentFooter } from "Frontend/components/Content"
import { EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import { useToasts } from 'react-toast-notifications'
import FormJob from "./_form"
import { getJobByID, updateJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import {
  READ_SUCCESS,
  READ_FAILED,
  SAVE_FAILED,
  SAVE_SUCCESS
} from "Shared/states/job/JobType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"
import { useCompany } from "Shared/context/CompanyContext"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"
import LoadingPage from "Frontend/components/LoadingPage"

const INIT_DATA = {
  success: false,
  data: null,
  message: null
}
function JobFormEditContainer() {
  const { id } = useParams()
  const { companyId } = useCompany()
  const { authUser } = useAuth()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const refForm = useRef()
  const match = useRouteMatch(EMPLOYER_JOB_EDIT_PATH)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const { addToast } = useToasts()

  useEffect(() => {
    if (match) {
      async function fetchJobData(id) {
        const { data, error } = await getJobByID(id)

        if (error) {
          dispatch({ type: READ_FAILED, payload: { error } })
        } else {
          dispatch({ type: READ_SUCCESS, payload: { data } })
        }
        setLoading(false)
      }

      if (loading) {
        setTimeout(() => {
          fetchJobData(id)
        }, 1000)
      }
    }
  }, [id, loading, match, state.data])

  const _handleCallback = async (bodyData) => {
    setSaving(true)
    setTimeout(async () => {
      const { success, data, message, error } = await updateJob(id, bodyData)

      if (success) {
        dispatch({ type: SAVE_SUCCESS, payload: { data, message } })
      } else {
        dispatch({ type: SAVE_FAILED, payload: { message, error } })
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

  const controlPanel = () => {
    return (
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
                  <span>{" "}บันทึก</span>
                </>
              )
            }
          </Button>
        </Col>
      </Row>
    )
  }

  return (
    <>
      {
        loading
          ? <LoadingPage />
          : (
            state.error
              ? <p>{state.error.message}</p>
              : (
                <Content className="content-jobform">
                  <ContentHeader>
                    {controlPanel()}
                  </ContentHeader>
                  <ContentBody>
                    {
                      state.data && (
                        <FormJob
                          ref={refForm}
                          editing={true}
                          id={state.data.id}
                          position={state.data.position}
                          jobType={state.data.jobType}
                          jobCategory={state.data.jobCategory}
                          duty={state.data.duty}
                          performance={state.data.performance}
                          salaryType={state.data.salaryType}
                          salaryMin={state.data.salaryMin}
                          salaryMax={state.data.salaryMax}
                          amount={state.data.amount}
                          workDays={state.data.workDays}
                          workTimeStart={state.data.workTimeStart}
                          workTimeEnd={state.data.workTimeEnd}
                          welfare={state.data.welfare}
                          province={state.data.province}
                          district={state.data.district}
                          companyId={companyId}
                          userId={authUser.localId}
                          onSubmit={_handleCallback}
                        />
                      )
                    }
                  </ContentBody>
                  <ContentFooter>
                    {controlPanel()}
                  </ContentFooter>
                </Content>
              )
          )
      }
    </>
  )
}
export default JobFormEditContainer