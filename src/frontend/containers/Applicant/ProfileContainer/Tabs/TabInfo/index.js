import React from "react"
import { Row, Col, FormGroup, Label, Input, TabPane } from "reactstrap"

const TAB_INFO_NAME = "profile"

function TabInfo() {
  return (
    <TabPane tabId={TAB_INFO_NAME}>
      <FormGroup>
        <Row>
          <Col>
            <Label>ชื่อ</Label>
            <Input type="text" />
          </Col>
          <Col>
            <Label>นามสกุล</Label>
            <Input type="text" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Label>รูปถ่าย</Label>
        <Input type="file" />
        <p className="input-desc">อัพโหลดรูปถ่ายตนเอง (กรุณาใช้รูปถ่ายจริง)</p>
      </FormGroup>
      <FormGroup>
        <Label>ที่อยู่ปัจจุบัน</Label>
        <Input type="textarea" rows={2} />
        <p className="input-desc">ระบุที่อยู่ที่สามารถติดต่อได้</p>
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
            <Input type="text" placeholder="Ex. 08########" />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6} sm={12}>
            <Label>อีเมล</Label>
            <Input type="email" placeholder="example@mail.com" />
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