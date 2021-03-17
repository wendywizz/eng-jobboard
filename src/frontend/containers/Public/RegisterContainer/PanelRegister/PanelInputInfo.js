import React, { useRef } from "react"
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faGoogle } from "@fortawesome/free-brands-svg-icons"
import { FormGroup, Label, Button } from "reactstrap"
import "./index.css"

function PanelInputInfo({ onCallback }) {
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const _handleSubmit = (value) => {
    console.log(value)
    //onCallback(true)
  }
  
  return (
    <div className="panel-input-info">
      <div className="block-register-email">
        <h3>สมัครด้วยอีเมล</h3>
        <form onSubmit={handleSubmit(_handleSubmit)}>
          <FormGroup>
            <Label for="email">อีเมล</Label>
            <input 
              type="email" 
              id="email" 
              className="form-control"
              ref={register("regist_email", {
                required: true
              })}
              defaultValue="test@gmail.com"
              placeholder="example@mail.com" 
            />
            {errors.regist_email?.type === "required" && <p className="validate-message">Field is required</p>}
          </FormGroup>
          <FormGroup>
            <Label for="password">รหัสผ่าน</Label>
            <input 
              type="password" 
              id="password" 
              className="form-control"
              ref={register("regist_password", {
                required: true,
                min: 8
              })}
              placeholder="ระบุด้วยอักขระ (a-z, A-Z, 0-9)" 
            />
            {errors.regist_password?.type === "required" && <p className="validate-message">Field is required</p>}
            {errors.regist_password?.type === "min" && <p className="validate-message">Password at least 8 strings</p>}
          </FormGroup>
          <FormGroup>
            <Label for="cpassword">ยืนยันรหัสผ่าน</Label>
            <input 
              type="password" 
              id="cpassword"
              className="form-control"
              ref={register("regist_cpassword", {
                required: true,
              })}              
              placeholder="ระบุรหัสผ่านอีกครั้ง" 
            />
            {errors.cpassword && <p className="validate-message">{errors.cpassword.message}</p>}
          </FormGroup>
          <Button color="primary" block>สมัครเข้าใช้งาน</Button>
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