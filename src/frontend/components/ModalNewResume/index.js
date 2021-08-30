import React, { useState, useMemo, useRef } from "react"
import { Modal, Form, FormGroup, Label, ModalBody, ModalHeader, ModalFooter, Button } from "reactstrap"
import { useForm } from "react-hook-form"
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import filesize from "filesize"
import "./index.css"

export default function ModalNewResume({
  onUpload,
  accept = 'application/pdf, application/msword, image/png, image/jpeg',
  maxFiles = 1,
  maxSize = 5000000,
  ...props
}) {
  const refSubmit = useRef(null)
  const { register, handleSubmit, errors } = useForm()
  const [uploadFiles, setUploadFiles] = useState([])
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    multiple: maxFiles > 1 ? true : false,
    onDropAccepted: (files) => {
      setUploadFiles(files)
    }
  });

  const activeStyle = {
    borderColor: '#2196f3'
  };
  const acceptStyle = {
    borderColor: '#00e676'
  };
  const rejectStyle = {
    borderColor: '#ff1744'
  };


  const style = useMemo(() => ({
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);  

  const renderAcceptFileItems = acceptedFiles.map(file => (
    <li key={file.path}>
      <div className="filename">{file.path}</div>
      <div className="desc">{filesize(file.size, { standard: "jedec" })}</div>
    </li>
  ));

  const renderRejectFileItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      <div className="filename">{file.path}</div>
      <div className="desc">
        <ul className="list-error">
          {errors.map(e => (
            e.code === "file-too-large"
              ? <li key={e.code}>File size exceed {filesize(maxSize, { standard: "jedec" })}</li>
              : <li key={e.code}>{e.message}</li>
          ))}
        </ul>
      </div>
    </li>
  ));

  const _handleSubmit = (values) => {
  }


  return (
    <Modal {...props} keyboard={false} backdrop={"static"}>
      <ModalHeader>
        เพิ่มใบสมัครงานใหม่
      </ModalHeader>
      <ModalBody>
        <Form className="form-input form-upload" onSubmit={handleSubmit(_handleSubmit)}>
          <button ref={refSubmit} type="submit" style={{display: "none "}} />
          <FormGroup>
            <Label>ชื่อบันทึก</Label>
            <input
              className="form-control"
            />
            <p className="input-desc">บันทึกชื่อใบสมัครงาน เพื่อสามารถเรียกใช้ได้ถูกต้อง</p>
          </FormGroup>
          <FormGroup>
            <Label>อัพโหลดไฟล์ Resume</Label>
            <div className="drop-upload">
              <div {...getRootProps({ className: "drop-control", style })}>
                <input {...getInputProps()} />
                <p className="upload-desc">คลิก หรือ ลากไฟล์วางที่นี้</p>
              </div>
              <aside>
                <ul className="preview-filename">{renderAcceptFileItems}</ul>
                <ul className="preview-filename">{renderRejectFileItems}</ul>
              </aside>
              <p className="input-desc">รองรับไฟล์นามสกุล pdf, doc, docx, jpg, png ขนาดไม่เกิน {filesize(maxSize, { standard: "jedec" })}</p>
            </div>
          </FormGroup>
          <FormGroup>
            <Label>รายละเอียดเพิ่มเติม</Label>
            <textarea
              className="form-control"
              rows={2}
            />
            <p className="input-desc">หากมี Resume จากลิงค์ภายนอกหรือรายละเอียดอื่นๆ สามารถระบุได้ที่นี้</p>
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary">
          <FontAwesomeIcon icon={faUpload} /> อัพโหลด
        </Button>
        <Button color="danger" onClick={props.toggle}>ยกเลิก</Button>
      </ModalFooter>
    </Modal>
  )
}