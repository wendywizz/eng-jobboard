import React, { useState, useRef, useEffect } from "react"
import "./index.css"

function CheckboxTag({ref, ...props}) {
  const [isChecked, setIsChecked] = useState(props.checked)
  const [labelWidth, setLabelWidth] = useState(0)
  const labelRef = useRef(null)

  useEffect(() => {
    const labelWidth = labelRef.current.offsetWidth
    setLabelWidth(labelWidth)
  }, [setLabelWidth])

  const _handleChange = (e) => {
    setIsChecked(e.target.checked)
  }

  return (
    <div className={"checkbox-tag " + props.className}>
      <input 
        type="checkbox" 
        ref={ref}
        name={props.name} 
        id={props.id} 
        value={props.value} 
        onChange={e => _handleChange(e)} 
        checked={isChecked}
        style={{ width: labelWidth }}
      />
      <label htmlFor={props.id} ref={labelRef}>{props.text}</label>
    </div>
  )
}
export default CheckboxTag