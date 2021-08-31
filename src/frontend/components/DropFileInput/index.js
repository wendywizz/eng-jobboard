import React, { useMemo } from "react";
import { useDropzone } from "react-dropzone";
import filesize from "filesize";
import "./index.css"
import { reduceFileName } from "Shared/utils/string";

export default function DropFileInput({
  accept = "application/pdf, application/msword, image/png, image/jpeg",
  maxFiles = 1,
  maxSize = 5000000,
  onDrop
}) {
  const {
    acceptedFiles,
    fileRejections,
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept,
    maxFiles,
    maxSize,
    multiple: maxFiles > 1 ? true : false,
    onDrop: (files) => {
      onDrop(files)
    }
  });  

  const activeStyle = {
    borderColor: "#2196f3",
  };
  const acceptStyle = {
    borderColor: "#00e676",
  };
  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const style = useMemo(
    () => ({
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );

  const renderAcceptFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      <div className="filename">{reduceFileName(file.path)}</div>
      <div className="desc">{filesize(file.size, { standard: "jedec" })}</div>
    </li>
  ));

  const renderRejectFileItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      <div className="filename">{reduceFileName(file.path)}</div>
      <div className="desc">
        <ul className="list-error">
          {errors.map((e) =>
            e.code === "file-too-large" ? (
              <li key={e.code}>
                File size exceed {filesize(maxSize, { standard: "jedec" })}
              </li>
            ) : (
              <li key={e.code}>{e.message}</li>
            )
          )}
        </ul>
      </div>
    </li>
  ));

  return (
    <div className="drop-upload">
      <div {...getRootProps({ className: "drop-control", style })}>
        <input {...getInputProps()} />
        <p className="upload-desc">คลิก หรือ ลากไฟล์วางที่นี้</p>
      </div>
      <aside>
        <ul className="preview-filename">{renderAcceptFileItems}</ul>
        <ul className="preview-filename">{renderRejectFileItems}</ul>
      </aside>
      <p className="input-desc">
        รองรับไฟล์นามสกุล pdf, doc, docx, jpg, png ขนาดไม่เกิน{" "}
        {filesize(maxSize, { standard: "jedec" })}
      </p>
    </div>
  );
}
