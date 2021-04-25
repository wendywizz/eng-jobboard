import React, { useEffect, useState, useReducer } from "react"
import { useParams } from "react-router-dom"
import { Row, Col, Button, Badge, Spinner } from "reactstrap"
import Template from "Frontend/components/Template"
import BoxJobInfo from "./BoxJobInfo"
import JobReducer from "Shared/states/job/JobReducer"
import { getJobByID } from "Shared/states/job/JobDatasource"
import { READ_FAILED, READ_SUCCESS } from "Shared/states/job/JobType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

import { faEnvelope, faMapMarkerAlt, faPhone } from "@fortawesome/free-solid-svg-icons"
import "./index.css";

const INIT_DATA = {
  data: null,
  message: null
}
function DetailContainer() {
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

  useEffect(() => {
    async function fetchData(jobId) {
      const { data, error } = await getJobByID(jobId)
      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } })
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data } })
      }
      setLoading(false)
    }

    if (id) {
      if (loading) {
        fetchData(id)
      }
    }
  })

  const renderAddress = (data) => {
    return (
      <div className="address">
        <FontAwesomeIcon icon={faMapMarkerAlt} />{" "}
        {data.address + " " + data.districtAsso.name + " " + data.provinceAsso.name}
      </div>
    )
  }

  const renderContact = (data) => {
    return (
      <div className="contact">
        <div className="item">
          <FontAwesomeIcon icon={faPhone} />{" "}
          {data.phone}
        </div>
        <div className="item">
          <FontAwesomeIcon icon={faEnvelope} />{" "}
          {data.email}
        </div>
      </div>
    )
  }
  
  return (
    <Template>
      {
        state.loading
          ? <Spinner />
          : (
            state.error
              ? <p>{state.error}</p>
              : (
                state.data && (
                  <>
                    <div className="section-header">
                      <div className="bg-cover">
                        <Row>
                          <Col>
                            <div className="info-company">
                              <img className="company-logo" src={state.data.companyOwnerAsso.logoPath} />
                              <div className="company-detail">
                                <h1 className="name">{state.data.companyOwnerAsso.name}</h1>
                                <div className="row-contact">{renderAddress(state.data.companyOwnerAsso)}</div>
                                <div className="row-contact">{renderContact(state.data.companyOwnerAsso)}</div>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            <div className="section-apply">
                              <Button size="lg" color="primary">สมัครงานนี้</Button>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                    <div className="section-content">
                      <Row>
                        <Col lg={7} md={6} sm={12}>
                          <div className="section-desc">
                            <h4 className="title">ลักษณะงาน</h4>
                            <p className="content">{state.data.duty}</p>
                          </div>
                          <div className="section-desc">
                            <h4 className="title">คุณสมบัติผู้สมัคร</h4>
                            <p className="content">{state.data.performance}</p>
                          </div>
                          <div className="section-desc">
                            <h4 className="title">สวัสดิการ</h4>
                            <p className="content">{state.data.welfare}</p>
                          </div>
                        </Col>
                        <Col lg={5} md={6} sm={12}>
                          <BoxJobInfo 
                            jobTypeId={state.data.jobTypeAsso.id}
                            jobTypeName={state.data.jobTypeAsso.name}
                            jobCategory={state.data.jobCategoryAsso.name}
                            area={state.data.districtAsso.name + " " +state.data.provinceAsso.name}
                            salaryTypeId={state.data.salaryType}
                            salaryTypeName={state.data.salaryTypeAsso.name}
                            salaryMin={state.data.salaryMin}
                            salaryMax={state.data.salaryMax}
                            amount={state.data.amount}
                          />
                        </Col>
                      </Row>
                    </div>
                  </>
                )
              )
          )
      }
    </Template>
  );
}
export default DetailContainer
