import React from "react"
import { Container, Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import Template from "../Template"
import { EMPLOYER_JOB_PATH, EMPLOYER_RESUME_PATH, EMPLOYER_SETTING_PATH } from "Frontend/configs/paths"

function TemplateEmployer({ children }) {
  return (
    <Template>
      <Container>
        <Row>
          <Col md={3}>
            <ul>
              <li>
                <Link to={EMPLOYER_JOB_PATH(123)}>Job</Link>
              </li>
              <li>
                <Link to={EMPLOYER_RESUME_PATH(123)}>Resume</Link>
              </li>
              <li>
                <Link to={EMPLOYER_SETTING_PATH(123)}>Setting</Link>
              </li>
            </ul>
          </Col>
          <Col me={4}>{children}</Col>
        </Row>
      </Container>
    </Template>
  )
}
export default TemplateEmployer