import React from "react"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import { Col, Row } from "reactstrap"
import { Link } from "react-router-dom"
import { REGISTER_APPLICANT, REGISTER_EMPLOYER } from "Frontend/configs/paths"

export default function RegisterTypeContainer() {
  return (
    <Template>
      <Page>
        <Row>
          <Col><Link className="btn btn-primary btn-lg" to={REGISTER_APPLICANT}>Applicant</Link></Col>
          <Col><Link className="btn btn-success btn-lg" to={REGISTER_EMPLOYER}>Employer</Link></Col>
        </Row>
      </Page>
    </Template>
  )
}