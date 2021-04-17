import React, { useState } from "react"
import { Container, Row, Col, Form, Button, Label } from "reactstrap"
import { useHistory } from "react-router-dom"
import Template from "Frontend/components/Template"
import { useForm } from "react-hook-form"
import { useAuth } from "Shared/context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { EMPLOYER_PROFILE_PATH } from "Frontend/configs/paths"
import "./index.css"

function LoginContainer() {
  const { signin } = useAuth()
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const history = useHistory()

  const _handleSubmit = async (values) => {
    const { login_email, login_password } = values
    
    if (login_email && login_password) {
      setLoading(true)
      const { success, message } = await signin(login_email, login_password)

      setLoading(false)
      if (!success) {
        setMessage(message)
      } else {
        history.push(EMPLOYER_PROFILE_PATH)
      }
    }
  }

  return (
    <Template>
      <Container className="px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
        <div className="card card0 border-0">
          <Row className="d-flex">
            <Col lg={6}>
              <div className="card1 pb-5">                
                <div className="row px-3 justify-content-center mt-4 mb-5 border-line">
                  <img src="https://i.imgur.com/uNGdWHi.png" className="image" alt="login" />
                </div>
              </div>
            </Col>
            <Col lg={6}>
              <div className="card2 card border-0 px-4 py-5">
                <Row className="mb-4 px-3">
                  <h6 className="mb-0 mr-4 mt-2">ล็อกอินด้วย</h6>
                  <div className="facebook text-center mr-3">
                    <FontAwesomeIcon icon={faFacebookF} />
                  </div>
                  <div className="google text-center mr-3">
                    <FontAwesomeIcon icon={faGoogle} />
                  </div>
                </Row>
                <Row className="px-3 mb-4">
                  <div className="line"></div>
                  <small className="or text-center">Or</small>
                  <div className="line"></div>
                </Row>
                <Form onSubmit={handleSubmit(_handleSubmit)}>
                  <Row className="px-3">
                    <Label className="mb-1">
                      <span className="mb-0 text-sm">อีเมล</span>
                    </Label>
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
                  </Row>
                  <Row className="px-3">
                    <Label className="mb-1">
                      <span className="mb-0 text-sm">รหัสผ่าน</span>
                    </Label>
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
                  </Row>
                  <br />
                  <Button type="submit" color="primary" disabled={loading}>
                    {
                      loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>เข้าสู่ระบบ</span>
                    }                    
                  </Button>
                  {message && <p style={{color: "red"}}>{message}</p>}
                </Form>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </Template >
  )
}
export default LoginContainer