import React from "react"
import className from "classnames"

function ContentHeader({ title, box=false, padding=false, ...props }) {
  const classes = className({
    "content-header": true,
    "box": box,
    "padding": padding
  })

  return (
    <div className={classes.concat(" "+props.className)}>
      {
        title && <h1 className="title">{title}</h1>
      }
      <div>
        {props.children}
      </div>
    </div>
  )
}
export default ContentHeader