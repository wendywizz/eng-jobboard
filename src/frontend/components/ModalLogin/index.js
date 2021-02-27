import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { Form, FormGroup, Input, Modal, ModalHeader, ModalBody, Button } from "reactstrap"
import "./index.css"

function ModalLogin() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button color="success" size="sm" onClick={toggle}>ล็อกอิน</Button>
      <Modal className="modal-signin" isOpen={modal} toggle={toggle} backdrop={true}>
        <ModalHeader toggle={toggle}>ล็อกอินเข้าใช้งาน</ModalHeader>
        <ModalBody>
          <div className="block-signin-email">
            <Form>
              <FormGroup>
                <Input type="email" name="email" placeholder="อีเมล" />
              </FormGroup>
              <FormGroup>
                <Input type="password" name="password" placeholder="รหัสผ่าน" />
              </FormGroup>
              <Button color="primary" block>ตกลง</Button>
            </Form>
          </div>
          <hr className="line" />
          <div className="block-signin-social">
            <Button style={{ backgroundColor: "#3b5998", color: "#fff" }} block>
              <FontAwesomeIcon icon={faFacebookF} />
              <span>Sign in with Facebook</span>
            </Button>
            <Button style={{ backgroundColor: "#fff", color: "#111" }} block>
              <FontAwesomeIcon icon={faGoogle} />
              <span>Sign in with Google</span>
            </Button>
          </div>
        </ModalBody>
      </Modal>
    </>
  )
}
export default ModalLogin