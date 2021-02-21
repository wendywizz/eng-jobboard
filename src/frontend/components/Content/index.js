import React from "react"
import classNames from "classnames";
import ContentHeader from "./ContentHeader"
import ContentBody from "./ContentBody"
import ContentFooter from "./ContentFooter"
import "./index.css"

function Content(props) {
  const classes = classNames({
    "content": true
  })
  return (
    <div className={classes.concat(" "+props.className)}>
      {props.children}
    </div>
  )
}
export default Content

export {
  ContentHeader,
  ContentBody,
  ContentFooter
}