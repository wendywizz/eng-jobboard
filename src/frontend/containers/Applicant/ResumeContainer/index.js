import React, { useState } from "react"
import Content, { ContentHeader } from "Frontend/components/Content"
import { Row, Col } from "reactstrap"
//import CardResume from "Frontend/components/CardResume"
import CardNewResume from "./CardNewResume"
import ModalNewResume from "Frontend/components/ModalNewResume"
import { useToasts } from "react-toast-notifications"

export default function ResumeContainer() {  
  const [showModal, setShowModal] = useState(false)
  const { addToast } = useToasts()

  const _handleToggleModal = () => setShowModal(!showModal)

  const _handleUploadSuccess = (message) => {
    setShowModal(false)

    responseMessage(true, message)
  }

  const _handleUploadFailed = (message) => {
    setShowModal(false)

    responseMessage(false, message)
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
        isOpen={showModal}
        toggle={_handleToggleModal}        
        onSuccess={_handleUploadSuccess}
        onError={_handleUploadFailed}
      />
    </Content>
  )
}