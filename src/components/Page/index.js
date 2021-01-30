import React from "react"
import classNames from "classnames"
import "./index.css"

function Page({ ...props }) {
  const classes = classNames({
    "page": true,
    "centered": props.centered && true,
  })
  return (
    <div className={classes}>
      { props.children}
    </div>
  )
}
export default Page