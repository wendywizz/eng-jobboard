import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import queryString from "query-string"
import Content, { ContentHeader, ContentBody, ContentFooter } from "Frontend/components/Content"
import ListJobItem from "Frontend/components/ListJobItem"
import "./index.css"
import { EMPLOYER_JOB_ADD_PATH, EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH } from "Frontend/configs/paths"

import jobResultData from "Frontend/data/json/job-result.json"

function JobListContainer() {
  const { status } = useParams()
  const [emprId] = useState(123)

  useEffect(() =>{
    console.log("status", status)
  })

  return (
    <Content className="content-empr-joblist">
      <ContentHeader title="จัดการงาน">
        <div className="section-status">          
          <Link className="btn btn-link btn-status" to={EMPLOYER_JOB_PATH(emprId)}>ทั้งหมด</Link>
          <Link className="btn btn-link btn-status" to={EMPLOYER_JOB_PATH(emprId) + "?status=active"}>กำลังรับสมัคร</Link>
          <Link className="btn btn-link btn-status" to={EMPLOYER_JOB_PATH(emprId) + "?status=finish"}>เสร็จสิ้น</Link>
          <Link className="btn btn-link btn-status" to={EMPLOYER_JOB_PATH(emprId) + "?status=inactive"}>ยกเลิก</Link>
        </div>
      </ContentHeader>
      <ContentBody box={false} padding={false}>
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
      </ContentBody>
      <ContentFooter></ContentFooter>
    </Content>
  )
}
export default JobListContainer