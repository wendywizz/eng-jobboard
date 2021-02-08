import React from "react"
import { Row, Col } from "reactstrap"
import Template from "../Template"

function TemplateEmployer({ children }) {
  return (
    <Template>
      <Row>
        <Col md={3}>testset</Col>
        <Col me={4}>{children}</Col>
      </Row>
    </Template>
  )
}
export default TemplateEmployer