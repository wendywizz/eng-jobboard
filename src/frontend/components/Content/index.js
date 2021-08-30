import React from "react"
import classNames from "classnames";
import ContentHeader from "./ContentHeader"
import ContentBody from "./ContentBody"
import ContentFooter from "./ContentFooter"
import "./index.css"

function Content({ fill=false, className, children }) {
  const classes = classNames({
    "content": true,
    "fill": fill
  })
  return (
    <div className={classes.concat(" "+ (className ? className : ""))}>
      {children}
    </div>
  )
}
export default Content

export {
  ContentHeader,
  ContentBody,
  ContentFooter
}