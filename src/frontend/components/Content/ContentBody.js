import React from "react"
import className from "classnames"

function ContentBody({ box = true, padding = true, fill = false, ...props }) {
  const classes = className({
    "content-body": true,
    "box": box,
    "padding": padding,
    "fill": fill
  })

  return (
    <div className={classes.concat(" " + (props.className ? props.className : ""))}>
      {props.children}
    </div>
  )
}
export default ContentBody