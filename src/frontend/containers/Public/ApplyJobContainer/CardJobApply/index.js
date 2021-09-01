import React, { useState, useEffect, useReducer } from "react";
import {
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Alert,
  Button,
} from "reactstrap";
import {
  faExclamationTriangle,
  faPaperPlane,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { listResumeOfUserId } from "Shared/states/resume/ResumeDatasource";
import SpinnerBlock from "Frontend/components/SpinnerBlock";
import { Link } from "react-router-dom";
import { APPLICANT_RESUME_PATH } from "Frontend/configs/paths";
import { useForm } from "react-hook-form";
import { ModalConfirm } from "Frontend/components/Modal";
import { applyResume } from "Shared/states/apply/ApplyDatasource";
import { SAVE_SUCCESS, SAVE_FAILED } from "Shared/states/apply/ApplyType";
import "./index.css";

export default function CardJobApply({ userId, jobId }) {
  const [ready, setReady] = useState(false);
  const [sending, setSending] = useState(false);
  const [resumeItems, setResumeItems] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const [showModal, setShowModal] = useState(false);
  const [, dispatch] = useReducer();
  const [dataValues, setDataValues] = useState();

  const _handleToggleModal = () => setShowModal(!showModal);

  useEffect(() => {
    async function fetchResume(userId) {
      if (userId) {
        const { data, error } = await listResumeOfUserId(userId);
        if (!error) {
          setResumeItems(data);
        }
      }
      setReady(true);
    }

    if (!ready) {
      setTimeout(() => {
        fetchResume(userId);
      }, 1000);
    }
  });

  const renderResumeSelector = () => {
    return (
      <>
        <select
          name="resume"
          id="resume"
          className={"form-control " + (errors.resume?.type && "is-invalid")}
          defaultValue=""
          ref={register({ required: true })}
        >
          <option value="" disabled>
            เลือกใบสมัครงาน
          </option>
          {resumeItems.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
        {errors.resume?.type === "required" && (
          <p className="validate-message">กรุณาเลือกใบสมัครงาน</p>
        )}
        {resumeItems.length <= 0 && (
          <Alert color="warning" style={{ marginTop: "10px" }}>
            <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
            ท่านยังไม่สร้างใบสมัครงาน กรุณาสร้างใบสมัครงานก่อนดำเนินการ
            <p style={{ marginTop: "5px" }}>
              <Link
                className="btn btn-secondary btn-sm"
                to={APPLICANT_RESUME_PATH}
                target="_blank"
              >
                <FontAwesomeIcon icon={faPlus} /> สร้างใบสมัครงาน
              </Link>
            </p>
          </Alert>
        )}
      </>
    );
  };

  const _handleSubmit = (values) => {
    setDataValues(values);
    setShowModal(true);
  };

  const _handleSendResume = () => {
    console.log(dataValues)
    /*setSending(true);
    setTimeout(async () => {
      if (dataValues) {
        const { success, data, message, error } = await applyResume(dataValues);

        if (success) {
          dispatch({ type: SAVE_SUCCESS, payload: { data, message } });
        } else {
          dispatch({ type: SAVE_FAILED, payload: { message, error } });
        }
      }
      setSending(false);
    }, 1000);*/
  };

  return (
    <Card className="card-job-apply">
      <CardBody>
        <div className="heading">
          <h3 className="title">ส่งใบสมัครงาน</h3>
          <p className="desc">
            ตรงกันข้ามกับความเชื่อที่นิยมกัน Lorem Ipsum
            ไม่ได้เป็นเพียงแค่ชุดตัวอักษรที่สุ่มขึ้นมามั่วๆ
            แต่หากมีที่มาจากวรรณกรรมละตินคลาสสิกชิ้นหนึ่งในยุค 45
            ปีก่อนคริสตศักราช
          </p>
        </div>
        <hr />
        <Form
          className="form-input form-submit"
          onSubmit={handleSubmit(_handleSubmit)}
        >
          <input type="hidden" name="job" value={jobId} ref={register()} />
          <input type="hidden" name="user" value={userId} ref={register()} />
          <FormGroup>
            <Label htmlFor="resume">เลือกใบสมัครงาน</Label>
            {!ready ? <SpinnerBlock size={"sm"} /> : renderResumeSelector()}
          </FormGroup>
          <FormGroup>
            <Label>ข้อความแนะนำตัวเอง</Label>
            <textarea
              type="textarea"
              className="form-control"
              name="greeting"
              id="greeting"
              rows="3"
              ref={register()}
            />
          </FormGroup>
          <Button color="primary">
            <FontAwesomeIcon icon={faPaperPlane} /> ส่งใบสมัครงาน
          </Button>
        </Form>
      </CardBody>
      <ModalConfirm
        title="ส่งใบสมัครงาน"
        content="ยืนยันส่งใบสมัครงาน?"
        isOpen={showModal}
        toggle={_handleToggleModal}
        onAction={_handleSendResume}
      />
    </Card>
  );
}
