import React from "react"
import ContentHeader from "./ContentHeader"
import ContentBody from "./ContentBody"
import ContentFooter from "./ContentFooter"
import "./index.css"

function Content({ children }) {
  return (
    <div className="content">
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