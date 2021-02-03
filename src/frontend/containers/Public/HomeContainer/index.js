import React from "react"
import { Container, Row, Col } from "reactstrap"
import Template from "Frontend/components/Template"
import SectionCover from "./SectionCover"
import SectionRecentJob from "./SectionRecentJob"

function HomeContainer() {
  return (
    <Template>
      <SectionCover />
      <Container>
        <Row>
          <Col md={9}>
            <SectionRecentJob />
          </Col>
          <Col md={3}>
          </Col>
        </Row>
      </Container>
    </Template>
  );
}
export default HomeContainer;

