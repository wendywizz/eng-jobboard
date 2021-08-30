import React from "react"
import className from "classnames"

function ContentHeader({ title, box = false, padding = false, fill = false, ...props }) {
  const classes = className({
    "content-header": true,
    "box": box,
    "padding": padding,
    "fill": fill
  })

  return (
    <div className={classes.concat(" " + (props.className ? props.className : ""))}>
      {
        title && <h1 className="title">{title}</h1>
      }
      <div className="content-row">
        {props.children}
      </div>
    </div>
  )
}
export default ContentHeader