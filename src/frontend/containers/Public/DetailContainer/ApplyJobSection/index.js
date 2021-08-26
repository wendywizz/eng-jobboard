import React from "react"
import { Button } from "reactstrap"
import "./index.css"

export default function ApplyJobSection({ jobId, deadlineDate }) {  
  return (
    <div className="section-apply-job">
      <Button color="primary" size="lg" block>
        สมัครงานนี้
      </Button>
    </div>
  );
}
