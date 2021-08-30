import React from "react"
import { Button } from "reactstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"
import "./index.css"

export default function CardNewResume({ onClick }) {
  return (
    <Button className="card-new-resume" color="transparent" onClick={onClick}>
      <FontAwesomeIcon icon={faPlusCircle} className="icon" />
      <div className="desc">เพิ่มใบสมัครงาน</div>
    </Button>
  )
}