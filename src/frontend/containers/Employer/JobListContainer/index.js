import React, { useState } from "react"
import { Button } from "reactstrap"
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
        <div className="section-status">
          <Button color="link" className="btn-status">ทั้งหมด</Button>
          <Button color="link" className="btn-status">กำลังรับสมัคร</Button>
          <Button color="link" className="btn-status">เสร็จสิ้น</Button>
          <Button color="link" className="btn-status">ยกเลิก</Button>
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