import React, { useState } from "react"
import { Input } from "reactstrap"
import { Link } from "react-router-dom"
import Content, { ContentHeader, ContentBody, ContentFooter } from "Frontend/components/Content"
import ListJobItem from "Frontend/components/ListJobItem"
import "./index.css"
import { EMPLOYER_JOB_ADD_PATH } from "Frontend/configs/paths"

import jobResultData from "Frontend/data/json/job-result.json"

function JobListContainer() {
  const [emprId] = useState(123)

  return (
    <Content className="content-empr-joblist">
      <ContentHeader title="จัดการงาน">
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