import React from "react"
import { Container, Row, Col } from "reactstrap"
import Template from "components/Template"
import CoverSection from "./CoverSection"
import RecentJobSection from "./RecentJobSection"

function HomeContainer() {
  return (
    <Template>
      <CoverSection />
      <Container>
        <Row>
          <Col md={9}>
            <RecentJobSection />
          </Col>
          <Col md={3}>
          </Col>
        </Row>
      </Container>
    </Template>
  );
}
export default HomeContainer;

