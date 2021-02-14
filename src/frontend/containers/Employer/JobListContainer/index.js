import React, { useEffect, useState } from "react"
import { Input } from "reactstrap"
import { Link } from "react-router-dom"
import ListJobItem from "Frontend/components/ListJobItem"
import "./index.css"
import { EMPLOYER_JOB_ADD_PATH } from "Frontend/configs/paths"

function JobListContainer() {
  const [emprId, setEmprId] = useState(null)

  useEffect(() => {
    setEmprId(123)
  })

  return (
    <div className="content">
      <div className="content-header box">
        <div className="content-column left">
          <Input type="text" placeholder="ค้นหางาน" />
        </div>
        <div className="content-column right">
          <Link className="btn btn-primary" to={EMPLOYER_JOB_ADD_PATH(emprId)}>สร้างงานใหม่</Link>
        </div>
      </div>
      <div className="content-body box">
        <ListJobItem />
        <ListJobItem />
        <ListJobItem />
        <ListJobItem />
      </div>
    </div>
  )
}
export default JobListContainer