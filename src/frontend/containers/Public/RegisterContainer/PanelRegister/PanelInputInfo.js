import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import "./index.css"

function PanelInputInfo({ onCallback }) {
  const _handleSubmit = (e) => {
    e.preventDefault()

    onCallback(true)
  }
  
  return (
    <div className="panel-input-info">
      <div className="block-register-email">
        <h3>สมัครด้วยอีเมล</h3>
        <Form onSubmit={_handleSubmit}>
          <FormGroup>
            <Label for="email">อีเมล</Label>
            <Input type="email" name="email" placeholder="example@mail.com" />
          </FormGroup>
          <FormGroup>
            <Label for="password">รหัสผ่าน</Label>
            <Input type="password" name="password" placeholder="ระบุด้วยอักขระ (a-z, A-Z, 0-9)" />
          </FormGroup>
          <FormGroup>
            <Label for="cpassword">ยืนยันรหัสผ่าน</Label>
            <Input type="password" name="cpassword" placeholder="ระบุรหัสผ่านอีกครั้ง" />
          </FormGroup>
          <Button color="primary" block>สมัครเข้าใช้งาน</Button>
        </Form>
      </div>
      <hr className="line" />
      <div className="block-register-social">
        <Button style={{ backgroundColor: "#3b5998", color: "#fff" }}>
          <FontAwesomeIcon icon={faFacebookF} />
          <span>Sign in with Facebook</span>
        </Button>
        <Button style={{ backgroundColor: "#fff", color: "#111" }}>
          <FontAwesomeIcon icon={faGoogle} />
          <span>Sign in with Google</span>
        </Button>
      </div>
    </div>
  )
}
export default PanelInputInfo