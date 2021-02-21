import React from "react"
import className from "classnames"

function ContentBody({ box=true, padding=true, ...props }) {
  const classes = className({
    "content-body": true,
    "box": box,
    "padding": padding
  })
  
  return (
    <div className={classes.concat(" "+props.className)}>
      {props.children}
    </div>
  )
}
export default ContentBody