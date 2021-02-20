import React from "react"
import className from "classnames"

function ContentBody({ children, fill=false, padding=true }) {
  const classes = className({
    "content-body": true,
    "box": fill,
    "padding": padding
  })
  return (
    <div className={classes}>
      {children}
    </div>
  )
}
export default ContentBody