import React from "react"
import classNames from "classnames"
import "./index.css"

function Page({ centered=false, height, ...props }) {
  const classes = classNames({
    "page": true,
    "centered": centered
  })
  return (
    <div className={classes.toString() + " " + props.className} style={{minHeight: height}}>
      { props.children}
    </div>
  )
}
export default Page