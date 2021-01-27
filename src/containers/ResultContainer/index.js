import React from "react";
import Template from "components/Template";
import {
  Container,
  Row,
  Col,
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
} from "reactstrap";
import JobItem from "components/JobItem";
import "./index.css";

function ResultContainer(props) {
  return (
    <Template>
      <Container>
        <Row>
          <Col md={3}>
            <div className="box">
              <FormGroup tag="fieldset">
                <legend>จังหวัด</legend>
                <select className="form-control">
                  <option>ทุกจังหวัด</option>
                </select>
              </FormGroup>
            </div>
            <div className="box">
              <FormGroup tag="fieldset">
                <legend>ประเภทงาน</legend>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="type" /> งานประจำ
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="type" /> พาร์ทไทม์
                  </Label>
                </FormGroup>
                <FormGroup check disabled>
                  <Label check>
                    <Input type="radio" name="type" /> ฝึกงาน/สหกิจ
                  </Label>
                </FormGroup>
              </FormGroup>
            </div>
          </Col>
          <Col md={9}>
            <div className="search-box-panel box">
              <InputGroup>
                <Input type="text" placeholder="Keyword" />
                <InputGroupAddon addonType="prepend">
                  <Button>ค้นหา</Button>
                </InputGroupAddon>
              </InputGroup>
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
