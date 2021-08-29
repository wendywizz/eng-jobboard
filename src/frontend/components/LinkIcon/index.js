import React from 'react'

export default function LinkIcon({ icon, text, ...props }) {
  return (
    <a {...props} className={"btn-icon" + (props.className ? " " + props.className : "")} rel="noreferrer" >
      {
        typeof(icon) !== "string"
          ? icon
          : <img className="icon-image" src={icon} alt={text} />
      }
      <div className="text">{text}</div>
    </a>
  )
}