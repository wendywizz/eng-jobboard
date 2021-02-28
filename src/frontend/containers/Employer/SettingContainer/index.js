import React from "react"
import { Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import Content, { ContentBody, ContentHeader } from "Frontend/components/Content"
import Section from "Frontend/components/Section"
import ToggleCheckbox from "Frontend/components/ToggleCheckbox";
import "./index.css"

function SettingContainer() {
  const _handleChange = (e) => {
    console.log("TOGGLE", e.target.checked)
  }
  return (
    <Content>
      <ContentHeader title="การตั้งค่า" />
      <ContentBody box={false}>
        <Section className="section-setting box" title="การแจ้งเตือน" centeredTitle={false}>
          <ul className="list-option">
            <li className="list-option-item">
              <div className="desc">
                <span>แจ้งเตือนเมื่อมีผู้สมัครงานผ่านอีเมล</span>
              </div>
              <div className="control">
                <ToggleCheckbox onChange={_handleChange} />
              </div>
            </li>
            <li className="list-option-item">
              <div className="desc">
                <span>แจ้งเตือนเมื่อมีผู้สมัครงานผ่าน SMS</span>
              </div>
              <div className="control">
                <ToggleCheckbox onChange={_handleChange} />
              </div>
            </li>
          </ul>
        </Section>
        <Section className="section-setting box" title="ข้อมูลการเข้าใช้งาน" centeredTitle={false}>
          <Form>
            <Row>
              <Col md={6} sm={12}>
                <FormGroup>
                  <Label>ลิงค์​อีเมล</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>เชื่อมโยง Facebook</Label>
                  <Input type="text" />
                </FormGroup>
                <FormGroup>
                  <Label>เชื่อมโยง Google</Label>
                  <Input type="text" />
                </FormGroup>
              </Col>
              <Col md={6} sm={12}>
              <h4>เปลี่ยนรหัสผ่าน</h4>
                <FormGroup>
                  <Label>รหัสผ่านเดิม</Label>
                  <Input type="password" />
                </FormGroup>
                <hr />
                <FormGroup>
                  <Label>รหัสผ่านใหม่</Label>
                  <Input type="password" />
                </FormGroup>
                <FormGroup>
                  <Label>ยืนยันรหัสผ่านใหม่</Label>
                  <Input type="password" />
                </FormGroup>
                <div>
                  <Button color="primary">ยืนยัน</Button>
                </div>
              </Col>
            </Row>
          </Form>
        </Section>
      </ContentBody>
    </Content>
  )
}
export default SettingContainer