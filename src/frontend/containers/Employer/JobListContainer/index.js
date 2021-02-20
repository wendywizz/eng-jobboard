import React, { useEffect, useState } from "react"
import { Input } from "reactstrap"
import { Link } from "react-router-dom"
import ListJobItem from "Frontend/components/ListJobItem"
import "./index.css"
import { EMPLOYER_JOB_ADD_PATH } from "Frontend/configs/paths"

import jobResultData from "Frontend/data/json/job-result.json"

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
      <div className="content-body">
      {
        jobResultData.map((value, index) => (
          <ListJobItem
            key={index}
            id={value.jobId}
            title={value.jobTitle}
            logoUri={value.image}
            jobType={value.jobType.name}
            province={value.province.name}
          />
        ))
      }
      </div>
    </div>
  )
}
export default JobListContainer