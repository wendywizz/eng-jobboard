import React from "react"
import classNames from "classnames"
import "./index.css"

function Page({ centered, ...props }) {
  const classes = classNames({
    "page": true,
    "centered": centered && true
  })
  return (
    <div className={classes.toString() + " " + props.className}>
      { props.children}
    </div>
  )
}
export default Page