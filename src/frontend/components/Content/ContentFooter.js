import React from "react"
import className from "classnames"

function ContentFooter({ box = false, padding=false, ...props }) {
  const classes = className({
    "content-footer": true,
    "box": box,
    "padding": padding
  })

  return (
    <div className={classes.concat(" "+props.className)}>
      {props.children}
    </div>
  )
}
export default ContentFooter