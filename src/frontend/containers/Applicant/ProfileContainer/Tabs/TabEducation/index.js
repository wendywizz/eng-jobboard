import React from "react"
import { TabPane, Row, Col, Input, FormGroup } from "reactstrap";
import "./index.css"

function OptionEducation({ label, gpa }) {
  return (
    <div className="option-education">
      <FormGroup>
        <Row>
          <Col className="col-label" md={2}>
            {label} 
          </Col>
          <Col md={4}>
            <Input type="select">
              <option>--- เลือก ---</option>
              <option>วิศวกรรมเครื่องกล</option>
              <option>วิศวกรรมคอมพิวเตอร​์</option>
              <option>วิศวกรรมเคมี</option>
              <option>วิศวกรรมเครื่องกล</option>
            </Input>
          </Col>
          <Col md={3}>
            <Input type="text" placeholder="เกรดเฉลี่ย" value={gpa} />
          </Col>
          <Col md={3}>
          </Col>
        </Row>
      </FormGroup>
    </div>
  )
}

function TabEducation() {
  return (
    <TabPane tabId="education">
      <OptionEducation label="ปริญญาตรี" />
      <OptionEducation label="ปริญญาโท" />
      <OptionEducation label="ปริญญาเอก" />
    </TabPane>
  )
}
export default TabEducation