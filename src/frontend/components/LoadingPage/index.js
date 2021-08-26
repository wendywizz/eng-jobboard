import React from "react"
import { Spinner } from "reactstrap"
import "./index.css"

export default function LoadingPage({ pageHeight="70vh", text="Loading..." }) {
  return (
    <div className="page-loading" style={{ minHeight: pageHeight }}>
      <div className="loading-spot">
        <Spinner />
        { text && <div className="text">{text}</div> }
      </div>
    </div>
  )
}