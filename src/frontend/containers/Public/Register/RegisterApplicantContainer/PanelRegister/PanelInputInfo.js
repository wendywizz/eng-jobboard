import React, { useState, useRef } from "react"
import { Form, FormGroup, Label, Button, Alert } from "reactstrap"
import { useForm } from "react-hook-form"
import { useAuth } from "Shared/context/AuthContext"
import { APPLICANT_TYPE } from "Shared/constants/user"
import "./index.css"

function PanelInputInfo({ onCallback, studentCode, personNo }) {
  const { signupWithEmail } = useAuth()
  const [message, setMessage] = useState()
  const { register, handleSubmit, watch, errors } = useForm() 
  const password = useRef({})
  password.current = watch("password", "")

  const _handleSubmit = async(values) => {
    const { email, password } = values
    
    if (email && password) {
      const additional = {
        studentCode,
        personNo
      }
      const { success, message, error } = await signupWithEmail(email, password, APPLICANT_TYPE, additional)
      if (error) {
        setMessage(message)
        return
      }
      if (success) {
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
        <Form onSubmit={handleSubmit(_handleSubmit)}>
          <FormGroup>
            <Label for="email">อีเมล</Label>
            <input 
              type="email" 
              id="email" 
              name="email"
              className="form-control"
              ref={register({
                required: true,
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              })}
              defaultValue="test@gmail.com"
              placeholder="example@mail.com" 
            />
            {errors.email?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.email?.type === "pattern" && <p className="validate-message">Invalid email</p>}
          </FormGroup>
          <FormGroup>
            <Label for="password">รหัสผ่าน</Label>
            <input 
              type="password" 
              id="password" 
              name="password"
              className="form-control"
              ref={register({
                required: true,
                pattern: /^[A-Za-z0-9]/i,
                min: 8
              })}
              placeholder="ระบุด้วยอักขระ (a-z, A-Z, 0-9)" 
            />
            {errors.password?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.password?.type === "pattern" && <p className="validate-message">Password is allow only (a-z, A-Z, 0-9)</p>}
            {errors.password?.type === "min" && <p className="validate-message">Password at least 8 strings</p>}
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
                validate: value => password.current === value                
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
        </Form>
      </div>     
    </div>
  )
}
export default PanelInputInfo