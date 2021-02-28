import React from "react"
import { Row, Col, FormGroup, Label, Input, TabPane } from "reactstrap"

const TAB_CONTACT_NAME = "contact"
function TabContact() {
  return (
    <TabPane tabId={TAB_CONTACT_NAME}>
      <FormGroup>
        <Label>ที่อยู่บริษัท</Label>
        <Input type="textarea" rows={2} />
      </FormGroup>
      <FormGroup>
        <Row>
          <Col>
            <Label>จังหวัด</Label>
            <Input type="select">
              <option>--- เลือก ---</option>
            </Input>
          </Col>
          <Col>
            <Label>อำเภอ/เขต</Label>
            <Input type="select">
              <option>--- เลือก ---</option>
            </Input>
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label>รหัสไปรษณีย์</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label>โทรศัพท์</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label>อีเมล</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
    </TabPane>
  )
}
export default TabContact
export { TAB_CONTACT_NAME }