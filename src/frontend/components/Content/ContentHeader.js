import React from "react"
import className from "classnames"

function ContentHeader({ children, fill=false }) {
  const classes = className({
    "content-body": true,
    "fill": fill
  })
  return (
    <div className={classes}>
      {children}
    </div>
  )
}
export default ContentHeader