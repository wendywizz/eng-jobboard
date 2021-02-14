import React from "react"
import className from "classnames"

function ContentFooter({ children, fill=false }) {
  const classes = className({
    "content-body": true,
    "box": fill
  })
  return (
    <div className={classes}>
      {children}
    </div>
  )
}
export default ContentFooter