import React, { useState } from "react"
import { Form, FormGroup, Label, Modal, ModalHeader, ModalBody, Button } from "reactstrap"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import "./index.css"

function ModalLogin() {
  const [modal, setModal] = useState(false)
  const [message, setMessage] = useState(null)
  const { register, handleSubmit, errors } = useForm()
  const toggle = () => setModal(!modal)

  const _handleSubmit = async (values) => {
    const { login_email, login_password } = values
    
    if (login_email && login_password) {
      /*const { status, message } = await signIn(login_email, login_password)

      if (!status) {
        setMessage(message)
      } else {
        setModal(false)
      }*/
    }
  }

  return (
    <>
      <Button color="success" size="sm" onClick={toggle}>ล็อกอิน</Button>
      <Modal className="modal-signin" isOpen={modal} toggle={toggle} backdrop={true}>
        <ModalHeader toggle={toggle}>ล็อกอินเข้าใช้งาน</ModalHeader>
        <ModalBody>
          <div className="block-signin-email">
            <Form onSubmit={handleSubmit(_handleSubmit)}>
              <FormGroup>
                <Label for="login-email">อีเมล</Label>
                <input
                  type="email"
                  id="login-email"
                  name="login_email"
                  className="form-control"
                  ref={register({
                    required: true,
                    pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  })}
                  defaultValue="test@gmail.com"
                />
                {errors.login_email?.type === "required" && <p className="validate-message">Field is required</p>}
                {errors.login_email?.type === "pattern" && <p className="validate-message">Invalid email</p>}
              </FormGroup>
              <FormGroup>
                <Label for="login-password">รหัสผ่าน</Label>
                <input
                  type="password"
                  id="login-password"
                  name="login_password"
                  className="form-control"
                  ref={register({
                    required: true
                  })}
                  defaultValue="1212312121"
                />
                {errors.login_password?.type === "required" && <p className="validate-message">Field is required</p>}
              </FormGroup>
              <Button color="primary" block>ตกลง</Button>
              {message && <p style={{color: "red"}}>{message}</p>}
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