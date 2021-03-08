import React from "react"
import ListJobItem from "Frontend/components/ListJobItem"
import Section from "Frontend/components/Section"
import jobResultData from "Frontend/data/json/job-result.json"
import "./index.css"

function SectionRecentJob() {
  return (
    <Section
      className="section-job-recent"
      title="งานล่าสุด"
      titleDesc="ตำแหน่งงานล่าสุดที่เปิดรับสมัคร"
      centeredTitle={false}
    >
      {
        jobResultData.map((value, index) => (
          <ListJobItem
            key={index}
            id={value.jobId}
            title={value.jobTitle}
            logoUri={value.image}
            jobType={value.jobType.name}
            location={value.location.name}
          />
        ))
      }
    </Section>
  )
}
export default SectionRecentJob