import React from "react"
import { Card, CardBody } from "reactstrap";
import JobTypeTag from "Frontend/components/JobTypeTag";
import JobTagInfo from "Frontend/components/JobTagInfo";
import "./index.css"

export default function CardJobInfo({
  position,
  location,
  jobTypeAsso,
  salaryTypeAsso,
  salaryMin,
  salaryMax,
  amount,
  jobCategoryName,
}) {
  return (
    <Card className="card-jobinfo">
      <CardBody>
        <JobTypeTag type={jobTypeAsso.id} label={jobTypeAsso.name} />
        <h1 className="title">{position}</h1>
        <br />
        <JobTagInfo
          location={location}
          salaryTypeAsso={salaryTypeAsso}
          salaryMin={salaryMin}
          salaryMax={salaryMax}
          amount={amount}
          jobCategoryName={jobCategoryName}
        />
      </CardBody>
    </Card>
  );
}