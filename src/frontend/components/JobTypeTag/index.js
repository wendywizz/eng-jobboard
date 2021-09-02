import React from "react";
import { Badge } from "reactstrap";
import {
  JOB_TYPE_FULLTIME,
  JOB_TYPE_PARTTIME,
  JOB_TYPE_INTERNSHIP,
  JOB_TYPE_COOP,
} from "Shared/constants/job-type";

export default function JobTypeTag({ type, label }) {
  const renderItem = () => {
    if (type) {
      switch (type.toString()) {
        case JOB_TYPE_FULLTIME:
          return <Badge color="primary">{label}</Badge>;
        case JOB_TYPE_PARTTIME:
          return <Badge color="warning">{label}</Badge>;
        case JOB_TYPE_INTERNSHIP:
          return <Badge color="success">{label}</Badge>;
        case JOB_TYPE_COOP:
          return <Badge color="info">{label}</Badge>;
        default:
          return <Badge>n/a</Badge>;
      }
    }
    return;
  };

  return <>{renderItem()}</>;
}
