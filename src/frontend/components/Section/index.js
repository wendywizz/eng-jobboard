import React from "react"
import classes from "classnames"
import "./index.css"

function Section({ title, centeredTitle=true, titleDesc, children, ...props }) {
  const headingClasses = classes({
    "section-heading": true,
    "text-center": centeredTitle
  })
  return (
    <div className={"section " + props.className}>
      {
        title && (
          <div className={headingClasses}>
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