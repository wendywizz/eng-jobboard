import React from "react"
import { Button } from "reactstrap"
import "./index.css"

export default function ApplyJobSection({ jobId, deadlineDate }) {  
  return (
    <div class="section-apply-job">
      <Button color="primary" size="lg" block>
        สมัครงานนี้
      </Button>
    </div>
  );
}
