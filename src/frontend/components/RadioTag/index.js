import React, { useState, useRef, useEffect } from "react"
import "./index.css"

function RadioTag({ id, name, value, text, ...props}) {
  const [checked, setChecked] = useState(false)
  const [labelWidth, setLabelWidth] = useState(0)
  const labelRef = useRef(null)

  useEffect(() => {
    const labelWidth = labelRef.current.offsetWidth
    setLabelWidth(labelWidth)
  }, [setLabelWidth])

  const _handleChange = (e) => {
    setChecked(e.target.checked)
  }

  return (
    <div className={"radio-tag " + props.className}>
      <input 
        type="radio" 
        name={name} 
        id={id} 
        value={value} 
        onChange={e => _handleChange(e)} 
        checked={checked}
        style={{ width: labelWidth }}
      />
      <label htmlFor={id} ref={labelRef}>{text}</label>
    </div>
  )
}
export default RadioTag