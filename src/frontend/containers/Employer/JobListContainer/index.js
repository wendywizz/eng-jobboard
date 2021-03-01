import React, { useState, useEffect } from "react"
import { Row, Col, Nav, NavItem, NavLink, ListGroup, ListGroupItem } from "reactstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlus } from "@fortawesome/free-solid-svg-icons"
import Content, { ContentHeader, ContentBody, ContentFooter } from "Frontend/components/Content"
import { useQuery } from "Frontend/utils/hook"
import { EMPLOYER_JOB_ADD_PATH, EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"
import { ALL, ACTIVE, INACTIVE, FINISH } from "Frontend/constants/employer-job-status"
import "./index.css"
import jobResultData from "Frontend/data/json/job-result.json"

function JobListContainer() {
  const query = useQuery()
  const [emprId] = useState(123)
  const [selectedStatus, setSelectedStatus] = useState()

  useEffect(() => {
    const status = query.get("status")
    if (status) {
      setSelectedStatus(status)
    } else {
      setSelectedStatus(ALL)
    }
  }, [selectedStatus, query])

  return (
    <Content className="content-empr-joblist">
      <ContentHeader title="จัดการงาน">
        <Row>
          <Col>
            <Nav className="nav-status">
              <NavItem className={selectedStatus === ALL && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + ALL}>ทั้งหมด</NavLink>
              </NavItem>
              <NavItem className={selectedStatus === ACTIVE && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + ACTIVE}>กำลังรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={selectedStatus === INACTIVE && "active"}>
                <NavLink href={EMPLOYER_JOB_PATH(emprId) + "?status=" + INACTIVE}>ปิดรับสมัคร</NavLink>
              </NavItem>
              <NavItem className={selectedStatus === FINISH && "active"}>
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
        <ListGroup>
          {
            jobResultData.map((value, index) => (
              <ListGroupItem key={index}>
{value.jobTitle}
            </ListGroupItem>
            ))
          }
        </ListGroup>
      </ContentBody>
      <ContentFooter></ContentFooter>
    </Content>
  )
}
export default JobListContainer