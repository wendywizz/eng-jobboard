import React from "react"
import { Spinner } from "reactstrap"
import "./index.css"

export default function SpinnerBlock(props) {
  return (
    <div className="spinner-block"><Spinner {...props} /></div>
  )
}