import React, { useRef, useState } from 'react'
import { Button } from "reactstrap"
import placeHolderImage from "Frontend/assets/img/default-logo.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCloudUploadAlt } from "@fortawesome/free-solid-svg-icons"
import "./index.css"

export default function SingleThumbUpload({
  name,
  accept = ["image/png", "image/jpeg"],
  buttonTextUpload = "Upload",
  textOnlyImage = "Only image",
  textFileAccept = "Support",
  defaultImage,
  sizeLimit = 5000000,
  onUpload
}) {
  const refInput = useRef()
  const [preview, setPreview] = useState(defaultImage)
  const [imageUpload, setImageUpload] = useState()
  const [error, setError] = useState()

  const generateDesc = () => {
    let desc
    if (!accept) {
      desc = textOnlyImage
    } else {
      desc = accept.map((value, index) => {
        let text
        switch (value.trim()) {
          case "image/png":
            text = index > 0 ? " png" : "png"
            break;
          case "image/jpeg":
            text = index > 0 ? " jpg" : "jpg"
            break;
          default:
            break;
        }
        return text
      })
    }

    desc = desc ? textFileAccept + " (" + desc + ")" : null
    if (sizeLimit) {
      desc += ` and size not over ${sizeLimit / 1000000}MB`
    }
    return desc
  }

  const isImage = (file) => {
    return file.type.split("/")[0] === "image"
  }

  const _handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Reset error
      setError(null)

      // Check file type
      if (!accept) {
        if (!isImage(file)) {
          setError("File is not image")
          return
        }
      } else {
        if (!accept.includes(file.type)) {
          setError("File is invalid")
          return
        }
      }
      // Check file size
      if (file.size > sizeLimit) {
        setError(`File size should not exceed ${sizeLimit / 1000}MB`)
        return
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result)
        setImageUpload(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const _handleUpload = () => {
    onUpload(imageUpload)
  }

  return (
    <div className="control-upload">
      <div
        className="preview"
        onClick={() => refInput.current.click()}
        style={{ backgroundImage: `url(${preview ? preview : placeHolderImage})` }}
        alt="upload-image"
      />
      <div className="input-group mb-3 px-2 py-2 rounded-pill bg-white shadow-sm">
        <input
          ref={refInput}
          type="file"
          name={name}
          className={`upload form-control border-0 ${imageUpload && "hide"}`}
          onChange={e => _handleFileChange(e)}
          accept="image/png, image/jpg"
        />
        <div className="input-group-append">
          {
            imageUpload && (
              <Button color="primary" className="m-0 rounded-pill px-4 btn-upload" onClick={_handleUpload}>
                <FontAwesomeIcon icon={faCloudUploadAlt} className="mr-2 text-muted" />
                <small className="text-uppercase font-weight-bold">{buttonTextUpload}</small>
              </Button>
            )
          }
        </div>
      </div>
      <p className="upload-desc">{generateDesc()}</p>
      { error && <p className="text-error">{error}</p>}
    </div>
  )
}