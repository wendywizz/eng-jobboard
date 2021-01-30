import React from "react"
import "./index.css"

function Section(props) {
  return (
    <div className={"section " + props.className}>
      {props.children}
    </div>
  )
}
export default Section