import React, { useState } from "react"
import { Row, Col, Form, FormGroup, Input, Label, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons"
import Content, { ContentBody, ContentHeader } from "Frontend/components/Content"
import Section from "Frontend/components/Section"
import ToggleCheckbox from "Frontend/components/ToggleCheckbox";
import "./index.css"

function SettingContainer() {
  const [showNotify, setShowNotify] = useState(false)

  const _handleChangeNotify = (e) => {
    setShowNotify(e.target.checked)
  }

  return (
    <Content className="content-employer-setting">
      <ContentHeader title="การตั้งค่า" />
      <ContentBody box={false}>
        <Section className="section-setting box" title="การแจ้งเตือน" centeredTitle={false}>
          <ul className="list-option">
            <li className="list-option-item">
              <div className="desc">
                <span>แจ้งเตือนเมื่อบริษัทตอบรับการสมัครงาน</span>
              </div>
              <div className="control">
                <ToggleCheckbox onChange={_handleChangeNotify} />
              </div>
            </li>
          </ul>
          {
            showNotify && (
              <>
                <hr />
                <ul className="list-option list-notification-option">
                  <li className="list-option-item">
                    <div className="desc">
                      <span>แจ้งเตือนผ่านอีเมล</span>
                      <br />
                      <FormGroup>
                        <Input type="text" placeholder="example@mail.com" />
                        <p className="input-desc">แจ้งเตือนไปยังอีเมล</p>
                      </FormGroup>
                    </div>
                    <div className="control">
                      <ToggleCheckbox />
                    </div>
                  </li>
                  <li className="list-option-item">
                    <div className="desc">
                      <span>แจ้งเตือนผ่าน SMS</span>
                      <br />
                      <FormGroup>
                        <Input type="text" placeholder="Ex. 08########" />
                        <p className="input-desc">แจ้งเตือน SMS ไปทางหมายเลขเบอร์โทรศัพท์</p>
                      </FormGroup>

                    </div>
                    <div className="control">
                      <ToggleCheckbox />
                    </div>
                  </li>
                </ul>
              </>
            )
          }
        </Section>
        <Section className="section-setting box" title="ข้อมูลการเข้าใช้งาน" centeredTitle={false}>
          <Form>
            <Row>
              <Col md={6} sm={12}>
                <div className="sub-section-setting">
                  <h4 className="title">เปลี่ยนรหัสผ่าน</h4>
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
                </div>
              </Col>
              <Col md={6} sm={12}>
                <div className="sub-section-setting">
                  <h4 className="title">การเชื่อมโยงบัญชี Social Network</h4>
                  <FormGroup className="form-group-button">
                    <div className="col-icon">
                      <FontAwesomeIcon icon={faFacebook} className="link-social-icon facebook" />
                      <Label>เชื่อมโยงบัญชี Facebook</Label>
                    </div>
                    <div className="col-button">
                      <Button size="sm">ยังไม่เชื่อมโยง</Button>
                    </div>
                  </FormGroup>
                  <FormGroup className="form-group-button">
                    <div className="col-icon">
                      <FontAwesomeIcon icon={faGoogle} className="link-social-icon google" />
                      <Label>เชื่อมโยงบัญชี Google</Label>
                    </div>
                    <div className="col-button">
                      <Button size="sm" color="success">เชื่อมโยงแล้ว</Button>
                    </div>
                  </FormGroup>
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