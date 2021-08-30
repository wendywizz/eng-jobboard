import React, { useRef, useState } from "react";
import {
  Modal,
  Form,
  FormGroup,
  Label,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  Alert
} from "reactstrap";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import DropFileInput from "Frontend/components/DropFileInput";
import { AuthProvider, useAuth } from "Shared/context/AuthContext";
import "./index.css";

function FormResume({ onFormSubmit, ...props }) {
  const refSubmit = useRef(null);
  const { register, handleSubmit, errors } = useForm();
  const [filesUpload, setFilesUpload] = useState();
  const [isFileUploadError, setIsFileUploadError] = useState(false)

  const _handleOnDropResume = (files) => {
    if (files && files.length > 0) {
      setIsFileUploadError(false)
      setFilesUpload(files[0]);
    }
  };

  const _handleSubmitClick = () => {
    refSubmit.current.click();
  };

  const _handleSubmit = (values) => {
    const { name, detail } = values;

    if (!filesUpload) {
      setIsFileUploadError(true)
    } else {
      onFormSubmit({ name, detail, filesUpload });
    }
  };

  return (
    <Modal {...props} keyboard={false} backdrop={"static"}>
      <ModalHeader>เพิ่มใบสมัครงานใหม่</ModalHeader>
      <ModalBody>
        <Form
          className="form-input form-upload"
          onSubmit={handleSubmit(_handleSubmit)}
        >
          <button ref={refSubmit} type="submit" style={{ display: "none " }} />
          <FormGroup>
            <Label>ชื่อบันทึก</Label>
            <input
              type="name"
              name="name"
              id="name"
              className={"form-control " + (errors.name?.type && "is-invalid")}
              ref={register({
                required: true,
              })}
            />
            <p className="input-desc">
              บันทึกชื่อใบสมัครงาน เพื่อสามารถเรียกใช้ได้ถูกต้อง
            </p>
          </FormGroup>
          <FormGroup>
            <Label>อัพโหลดไฟล์ Resume</Label>
            <DropFileInput onDrop={_handleOnDropResume} />
            {isFileUploadError && (
              <Alert color="danger">
                <FontAwesomeIcon icon={faExclamationTriangle} />{" "}
                กรุณาอัพโหลดไฟล์ Resume
              </Alert>
            )}
          </FormGroup>
          <FormGroup>
            <Label>รายละเอียดเพิ่มเติม</Label>
            <textarea
              id="detail"
              name="detail"
              className={
                "form-control " + (errors.detail?.type && "is-invalid")
              }
              rows={2}
              ref={register()}
            />
            <p className="input-desc">
              หากมี Resume จากลิงค์ภายนอกหรือรายละเอียดอื่นๆ สามารถระบุได้ที่นี้
            </p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={_handleSubmitClick}>
          <FontAwesomeIcon icon={faUpload} /> อัพโหลด
        </Button>
        <Button color="danger" onClick={props.toggle}>
          ยกเลิก
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default function ModalNewResume(props) {
  const { authUser } = useAuth()

  const _handleSubmit = (values) => {
    if (authUser) {

    } else {
      alert("Go back to login")
    }
  };

  return (
    <AuthProvider>
      <FormResume onFormSubmit={_handleSubmit} {...props} />
    </AuthProvider>
  );
}
