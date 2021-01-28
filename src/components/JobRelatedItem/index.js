import React from "react"
import { Button } from "reactstrap"
import "./index.css"

function JobRelatedItem({jobTitle, workAddress, salary}) {
  return (
    <div className="job-related-item">
      <h5 className="title">{jobTitle}</h5>
      <ul className="desc">
        <li>{workAddress}</li>
        <li>{salary}</li>
      </ul>
      <Button className="rounded" color="info" size="md" block>รายละเอียด</Button>
    </div>
  )
}
export default JobRelatedItem
