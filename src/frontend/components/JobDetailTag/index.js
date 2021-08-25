import React from "react";
import "./index.css"

export default function JobDetailTag({icon, label, value}) {
  return (
    <div className="job-tag-item">
      <div className="icon">{icon}</div>
      <div className="detail">
        <div className="label">{label}</div>
        <div classnmae="value">{value}</div>
      </div>
    </div>
  );
}
