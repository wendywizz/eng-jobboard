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
import jobResultData from "Frontend/data/json/job-result.json"

import { getJobOfOwner } from "Shared/states/company/CompanyDatasource"
import CompanyReducer from "Shared/states/company/CompanyReducer"
import { READ_SUCCESS, READ_FAILED } from "Shared/states/company/CompanyType"


let INIT_DATA = {
  loading: true,
  stauts: false,
  result: null,
  itemCount: 0,
  message: null
}
function JobListContainer() {
  const query = useQuery()
  const [emprId] = useState(123)
  const [selectedStatus, setSelectedStatus] = useState()
  const [state, dispatch] = useReducer(CompanyReducer, INIT_DATA)

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
      try {
        const { status, result, itemCount } = await getJobOfOwner(id)
        let payload = { data: [], itemCount: 0 }
        if (status) {
          payload.data = result
          payload.itemCount = itemCount
        }
        dispatch({ type: READ_SUCCESS, payload })
      } catch (error) {
        dispatch({ type: READ_FAILED, payload: { error } })
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
              <NavItem className={(selectedStatus === ALL) && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + ALL}>ทั้งหมด</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === ACTIVE) && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + ACTIVE}>กำลังรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === INACTIVE) && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + INACTIVE}>ปิดรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={(selectedStatus === FINISH) && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + FINISH}>เสร็จสิ้น</NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="text-right">
            <Link className="btn btn-primary" to={EMPLOYER_JOB_ADD_PATH(emprId)}>
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
                    state.data.map((value, index) => (
                      <ListGroupItem key={index} className="list-group-jobitem">
                        <div className="detail">
                          <div className="job-type">
                            <Badge color="info">FULL TIME</Badge>
                          </div>
                          <span className="title">{value.job_position}</span>
                          <span className="amount">จำนวนรับ 2 ตำแหน่ง</span>
                        </div>
                        <div className="action">
                          <div className="apply-info">
                            <ToggleCheckbox />
                          </div>
                          <div className="view">
                            <Link to={`${EMPLOYER_JOB_EDIT_PATH(emprId)}/${value.jobId}`} className="btn btn-outline-primary btn-block">แก้ไข</Link>
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