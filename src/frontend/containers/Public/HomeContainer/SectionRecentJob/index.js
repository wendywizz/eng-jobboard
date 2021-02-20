import React from "react"
import ListJobItem from "Frontend/components/ListJobItem"

import jobResultData from "Frontend/data/json/job-result.json"

function SectionRecentJob() {
  return (
    <div className="section section-recent-job">
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
  )
}
export default SectionRecentJob