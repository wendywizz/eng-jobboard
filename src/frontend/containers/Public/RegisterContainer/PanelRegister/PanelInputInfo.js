import React, { useState, useRef } from "react"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FormGroup, Label, Button, Alert } from "reactstrap"
import { registerWithEmailAndPassword } from "shared/datasources/user"
import "./index.css"

function PanelInputInfo({ onCallback, studentCode, cardNo }) {
  const [message, setMessage] = useState()
  const { register, handleSubmit, watch, errors } = useForm(); 
  const regist_password = useRef({})
  regist_password.current = watch("regist_password", "")

  const _handleSubmit = async(values) => {
    const { regist_email, regist_password } = values
    
    if (regist_email && regist_password) {
      const { status, message } = await registerWithEmailAndPassword(regist_email, regist_password, studentCode, cardNo)
      
      if (status) {
        onCallback(true, {message})
      } else {
        setMessage(message)
      }
    }
  }
  
  return (
    <div className="panel-input-info">
      <div className="block-register-email">
        <h3>สมัครด้วยอีเมล</h3>
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <FormGroup>
            <Label for="regist_email">อีเมล</Label>
            <input 
              type="email" 
              id="regist_email" 
              name="regist_email"
              className="form-control"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              defaultValue="test@gmail.com"
              placeholder="example@mail.com" 
            />
            {errors.regist_email?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.regist_email?.type === "pattern" && <p className="validate-message">Invalid email</p>}
          </FormGroup>
          <FormGroup>
            <Label for="regist_password">รหัสผ่าน</Label>
            <input 
              type="password" 
              id="regist_password" 
              name="regist_password"
              className="form-control"
              ref={register({
                required: true,
                pattern: /^[A-Za-z0-9]/i,
                min: 8
              })}
              placeholder="ระบุด้วยอักขระ (a-z, A-Z, 0-9)" 
            />
            {errors.regist_password?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.regist_password?.type === "pattern" && <p className="validate-message">Password is allow only (a-z, A-Z, 0-9)</p>}
            {errors.regist_password?.type === "min" && <p className="validate-message">Password at least 8 strings</p>}
          </FormGroup>
          <FormGroup>
            <Label for="regist_cpassword">ยืนยันรหัสผ่าน</Label>
            <input 
              type="password" 
              id="regist_cpassword"
              name="regist_cpassword"
              className="form-control"
              ref={register({
                required: true,
                validate: value => regist_password.current === value                
              })}
              placeholder="ระบุรหัสผ่านอีกครั้ง" 
            />
            {errors.regist_cpassword?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.regist_cpassword?.type === "validate" && <p className="validate-message">Password did not match</p>}
          </FormGroup>
          <Button color="primary" block>สมัครเข้าใช้งาน</Button>
          {
            message && <Alert color="danger"><p>{message}</p></Alert>
          }
        </form>
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