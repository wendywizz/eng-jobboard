import React, { useState, useRef } from "react";
import { Form, FormGroup, Label, Button, Alert } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheck,
  faExclamationTriangle,
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useAuth } from "Shared/context/AuthContext";
import { EMPLOYER_TYPE } from "Shared/constants/user";

export default function PanelInput({ onCallback }) {
  const { signupWithEmail } = useAuth();
  const [ submitting, setSubmitting ] = useState(false);  
  const [message, setMessage] = useState();
  const { register, handleSubmit, watch, errors } = useForm();
  const password = useRef({});
  password.current = watch("password", "");

  const _handleSubmit = (values) => {
    const { email, password, company_name } = values;

    if (email && password) {
      setSubmitting(true);
      setTimeout(async () => {
        const { success, message, error } = await signupWithEmail(
          email,
          password,
          EMPLOYER_TYPE,
          { companyName: company_name }
        );
        if (error) {
          setMessage(message);
          return;
        }
        if (success) {
          onCallback(true, { message });
        } else {
          setMessage(message);
        }
        setSubmitting(false);
      }, 1000);
    }
  };

  return (
    <div className="panel panel-input">
      <h4 className="pb-4">กรอกข้อมูลผู้ใช้งาน</h4>
      <Form onSubmit={handleSubmit(_handleSubmit)}>
        <FormGroup>
          <Label htmlFor="company-name">ชื่อบริษัท / หน่วยงาน / ร้านค้า</Label>
          <input
            type="text"
            id="company-name"
            name="company_name"
            className={
              "form-control " + (errors.company_name?.type && "is-invalid")
            }
            ref={register({
              required: true,
            })}
            defaultValue="Company Testing #1"
          />
          {errors.company_name?.type === "required" && (
            <p className="validate-message">Field is required</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label>อีเมล</Label>
          <input
            type="email"
            id="email"
            name="email"
            className={"form-control " + (errors.email?.type && "is-invalid")}
            ref={register({
              required: true,
              pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            })}
            placeholder="example@mail.com"
            defaultValue="company1@gmail.com"
          />
          {errors.email?.type === "required" && (
            <p className="validate-message">Field is required</p>
          )}
          {errors.email?.type === "pattern" && (
            <p className="validate-message">Invalid email</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label>รหัสผ่าน</Label>
          <input
            type="password"
            id="password"
            name="password"
            className={
              "form-control " + (errors.password?.type && "is-invalid")
            }
            ref={register({
              required: true,
              pattern: /^[A-Za-z0-9]/i,
              min: 8,
            })}
            placeholder="ระบุด้วยอักขระ (a-z, A-Z, 0-9)"
            defaultValue="1212312121"
          />
          {errors.password?.type === "required" && (
            <p className="validate-message">Field is required</p>
          )}
          {errors.password?.type === "pattern" && (
            <p className="validate-message">
              Password is allow only (a-z, A-Z, 0-9)
            </p>
          )}
          {errors.password?.type === "min" && (
            <p className="validate-message">Password at least 8 strings</p>
          )}
        </FormGroup>
        <FormGroup>
          <Label>ยืนยันรหัสผ่าน</Label>
          <input
            type="password"
            id="cpassword"
            name="cpassword"
            className={
              "form-control " + (errors.cpassword?.type && "is-invalid")
            }
            placeholder="ระบุรหัสผ่านอีกครั้ง"
            ref={register({
              required: true,
              validate: (value) => password.current === value,
            })}
            defaultValue="1212312121"
          />
          {errors.cpassword?.type === "required" && (
            <p className="validate-message">Field is required</p>
          )}
          {errors.cpassword?.type === "validate" && (
            <p className="validate-message">Password did not match</p>
          )}
        </FormGroup>
        <div className="panel-action">
          <Button color="danger" disabled={submitting}>
            {submitting ? (
              <FontAwesomeIcon icon={faSpinner} spin />
            ) : (
              <FontAwesomeIcon icon={faCheck} />
            )}
            {" สมัครใช้งาน"}
          </Button>
        </div>
        {message && (
          <Alert color="danger">
            <p>
              <FontAwesomeIcon icon={faExclamationTriangle} /> {message}
            </p>
          </Alert>
        )}
      </Form>
    </div>
  );
}
