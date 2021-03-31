import React, { useState, useEffect, useReducer } from "react"
import { Row, Col, Nav, NavItem, NavLink, ListGroup, ListGroupItem, Badge, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Content, { ContentHeader, ContentBody, ContentFooter } from "Frontend/components/Content"
import ToggleCheckbox from "Frontend/components/ToggleCheckbox"
import useQuery from "Frontend/utils/hook/useQuery"
import { EMPLOYER_JOB_ADD_PATH, EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import { ALL, ACTIVE, INACTIVE, FINISH } from "Frontend/constants/employer-job-status"
import "./index.css"

import { getJobOfCompany } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { READ_JOB_SUCCESS, READ_JOB_FAILED } from "Shared/states/job/JobType"

let INIT_DATA = {
  loading: true,
  stauts: false,
  result: null,
  message: null
}
function JobListContainer() {
  const query = useQuery()
  const [selectedStatus, setSelectedStatus] = useState()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

  useEffect(() => {
    const status = query.get("status")
    if (status) {
      setSelectedStatus(status)
    } else {
      setSelectedStatus(ALL)
    }
  }, [selectedStatus, query])

  useEffect(() => {
    // Load Job data
    async function fetchJob(id) {     
      const { data, error }= await getJobOfCompany(id)
      
      if (!error) {
        dispatch({ type: READ_JOB_SUCCESS, payload: { data } })
      } else {        
        dispatch({ type: READ_JOB_FAILED, payload: { error } })
      }
    }

    if (state.loading) {
      setTimeout(() => {
        fetchJob(42)
      }, 1500)      
    }

    return () => {
      INIT_DATA = {
        ...state
      }
    }
  })
  
  return (
    <Content className="content-empr-joblist">
      <ContentHeader title="จัดการงาน">
        <Row>
          <Col>
            <Nav className="nav-status">
              <NavItem className={(selectedStatus === ALL) ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + ALL}>ทั้งหมด</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === ACTIVE) ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + ACTIVE}>กำลังรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === INACTIVE) ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + INACTIVE}>ปิดรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === FINISH) ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + FINISH}>เสร็จสิ้น</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="text-right">
            <Link className="btn btn-primary" to={EMPLOYER_JOB_ADD_PATH}>
              <FontAwesomeIcon icon={faPlus} />{" "}
              รับสมัครงานใหม่
            </Link>
          </Col>
        </Row>
      </ContentHeader>
      <ContentBody box={false} padding={false}>
        {
          state.loading 
            ? <Spinner />
            : (
              state.error
                ? <p>{state.error.message}</p>
                : (
                  <ListGroup className="list-group-job">
                  {
                    state.data.map((item, index) => (
                      <ListGroupItem key={index} className="list-group-jobitem">
                        <div className="detail">
                          <div className="job-type">
                            <Badge color="info">{item.jobTypeAsso.name}</Badge>
                          </div>
                          <span className="title">{item.position}</span>
                          <span className="amount">{`จำนวนรับ ${item.amount} ตำแหน่ง`}</span>
                        </div>
                        <div className="action">
                          <div className="apply-info">
                            <ToggleCheckbox />
                          </div>
                          <div className="view">
                            <Link to={`${EMPLOYER_JOB_EDIT_PATH}/${item.id}`} className="btn btn-outline-primary btn-block">แก้ไข</Link>
                          </div>
                        </div>
                      </ListGroupItem>
                    ))
                  }
                </ListGroup>
              )
            )
        }       
      </ContentBody>
      <ContentFooter></ContentFooter>
    </Content>
  )
}
export default JobListContainer