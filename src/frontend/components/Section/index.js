import React from "react"
import "./index.css"

function Section({ title, centeredTitle, titleDesc, children, ...props }) {
  return (
    <div className={"section " + props.className}>
      {
        title && (
          <div className={"section-heading " + centeredTitle && "text-center"}>
            <h3 className="section-title">{title}</h3>
            {
              titleDesc && <p className="section-title-desc">{titleDesc}</p>
            }
          </div>
        )
      }
      <div className="section-content">
        {children}
      </div>
    </div>
  )
}
export default Section