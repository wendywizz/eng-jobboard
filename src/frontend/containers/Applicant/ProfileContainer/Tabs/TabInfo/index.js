import React from "react"
import { Row, Col, FormGroup, Label, Input, TabPane } from "reactstrap"

const TAB_INFO_NAME = "profile"

function TabInfo() {
  return (
    <TabPane tabId={TAB_INFO_NAME}>
      <Row>
        <Col>
          <FormGroup>
            <Label>ชื่อ</Label>
            <Input type="text" />
          </FormGroup>
        </Col>
        <Col>
          <FormGroup>
            <Label>นามสกุล</Label>
            <Input type="text" />
          </FormGroup>
        </Col>
      </Row>
      <FormGroup>
        <Label>ที่อยู่</Label>
        <Input type="textarea" rows={2} />
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>จังหวัด</Label>
            <Input type="select">
              <option>--- เลือกจังหวัด ---</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>รหัสไปรษณีย์</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>เบอร์โทรศัพท์ติดต่อ</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>Facebook</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>Instagram</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
    </TabPane>
  )
}
export default TabInfo
export { TAB_INFO_NAME }