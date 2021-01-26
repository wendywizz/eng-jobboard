import React from "react"
import Template from "components/Template"
import { Container, Row, Col, Form, Input, Button } from "reactstrap"
import JobItem from "components/JobItem"
import "./index.css"

function ResultContainer(props) {
  return (
    <Template>
      <Container>
        <Row>
          <Col md={3}>
            <div className="box"></div>
          </Col>
          <Col md={9}>
            <div className="search-box-panel box">
              <Form>
                  <Input
                    type="text"
                    placeholder="Keyword"
                  />
                <Button>ค้นหา</Button>
              </Form>
            </div>
            <div>
              <JobItem />
              <JobItem />
              <JobItem />
              <JobItem />
              <JobItem />
              <JobItem />
              <JobItem />
            </div>
          </Col>
        </Row>
      </Container>
    </Template>
  );
}
export default ResultContainer;
