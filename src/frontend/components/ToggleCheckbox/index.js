import React from "react"
import randomString from "randomstring"
import "./index.css"

function ToggleCheckbox({ id, onChange, defaultChecked=false }){
  let controlId = randomString.generate(10)
  if (id) {
    controlId = id
  }
  
  return (
    <>
      <input
        type="checkbox"
        id={controlId}
        className="react-switch-checkbox"  
        defaultChecked={defaultChecked}
        onChange={onChange}
      />
      <label
        className="react-switch-label"
        htmlFor={controlId}
      >
        <span className="react-switch-button" />
      </label>
    </>
  )
}

export default ToggleCheckbox;