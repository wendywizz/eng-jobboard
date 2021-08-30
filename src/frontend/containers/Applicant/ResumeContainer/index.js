import React, { useState } from "react"
import Content, { ContentHeader } from "Frontend/components/Content"
import { Row, Col } from "reactstrap"
//import CardResume from "Frontend/components/CardResume"
import CardNewResume from "./CardNewResume"
import ModalNewResume from "Frontend/components/ModalNewResume"

export default function ResumeContainer() {  
  const [showNewResumeModal, setShowNewResumeModal] = useState(false)

  const _handleToggleModal = () => setShowNewResumeModal(!showNewResumeModal)

  return (
    <Content className="content-applicant-resume">
      <ContentHeader><h1 className="title">ใบสมัครงาน</h1></ContentHeader>
      <Row>
        <Col>
          <CardNewResume onClick={_handleToggleModal} />
        </Col>
        <Col />
        <Col />
        <Col />
      </Row>
      <ModalNewResume
        isOpen={showNewResumeModal}
        toggle={_handleToggleModal}
      />
    </Content>
  )
}