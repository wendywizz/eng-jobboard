import React, { useState } from "react"
import { Card, CardHeader, CardBody, Form, Button } from "reactstrap"
import { useHistory } from "react-router-dom"
import Template from "Frontend/components/Template"
import { useForm } from "react-hook-form"
import { useAuth } from "Shared/context/AuthContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"
import { HOME_PATH } from "Frontend/configs/paths"
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
        history.push(HOME_PATH)
      }
    }
  }

  return (
    <Template>
      <div className="d-flex justify-content-center h-100 login-container">
        <Card>
          <CardHeader>
            <h1 className="title">LOGIN</h1>
            <div className="d-flex justify-content-end social-icon">
              <span className="icon icon-facebook">
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <span className="icon icon-google">
                <FontAwesomeIcon icon={faGoogle} />
              </span>
            </div>
          </CardHeader>
          <CardBody>
            <Form onSubmit={handleSubmit(_handleSubmit)}>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-user"></i></span>
                </div>
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

              </div>
              <div className="input-group form-group">
                <div className="input-group-prepend">
                  <span className="input-group-text"><i className="fas fa-key"></i></span>
                </div>
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
              </div>
              <div className="form-group">
                <Button type="submit" className="float-right login_btn" color="primary" disabled={loading}>
                  {
                    loading ? <FontAwesomeIcon icon={faSpinner} spin /> : <span>เข้าสู่ระบบ</span>
                  }
                </Button>
                {message && <p style={{ color: "red" }}>{message}</p>}
              </div>
            </Form>
          </CardBody>
        </Card>
      </div>
    </Template >
  )
}
export default LoginContainer

/*<CardFooter>
  <Button className="link" color="transparent"><Link to={REGISTER_PATH}>สมัครใช้งาน</Link></Button>
  <Button className="link" color="transparent"><Link to="/">ลืมรหัสผ่าน</Link></Button>
</CardFooter>*/