import React, { useState, useEffect } from "react";
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
import "./index.css";

export default function CardApplyJob({ userId, jobId, onFinish, disableSubmit }) {
  const [ready, setReady] = useState(false);
  const [progressing, setProgressing] = useState(false);
  const [resumeItems, setResumeItems] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  const [showModal, setShowModal] = useState(false);
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
          disabled={disableSubmit}
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

  const _handleSendResume = async () => {
    setProgressing(true);
    await setTimeout(async () => {
      if (dataValues) {
        const { success, message } = await applyResume(dataValues);

        onFinish(success, message)
      }
      setShowModal(false)
      setProgressing(false);
    }, 1000);
  };

  return (
    <Card className="card-job-apply">
      <CardBody>
        <div className="heading">
          <h3 className="title">ส่งใบสมัครงาน</h3>
          <p className="desc">เลือกใบสมัคร เพื่อส่งข้อมูลให้กับผู้ว่าจ้าง</p>
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
            <Label htmlFor="greeting">ข้อความแนะนำตัวเอง</Label>
            <textarea
              type="textarea"
              className="form-control"
              name="greeting"
              id="greeting"
              rows="2"
              ref={register()}
              disabled={disableSubmit}
            />
          </FormGroup>
          <div className="text-right">
            <Button color="primary" disabled={disableSubmit}>
              <FontAwesomeIcon icon={faPaperPlane} /> ส่งใบสมัครงาน
            </Button>
          </div>
        </Form>
      </CardBody>
      <ModalConfirm
        title="ส่งใบสมัครงาน"
        content="ยืนยันส่งใบสมัครงาน?"
        isOpen={showModal}
        toggle={_handleToggleModal}
        onAction={_handleSendResume}
        disableButton={progressing}
      />
    </Card>
  );
}