import React, { useState, useRef, useEffect, forwardRef } from "react"
import "./index.css"

const RadioTag = forwardRef(({ id, name, value, text, checked, onChange, ...props }, ref) => {
  const [labelWidth, setLabelWidth] = useState(0)
  const labelRef = useRef(null)

  useEffect(() => {
    const labelWidth = labelRef.current.offsetWidth
    setLabelWidth(labelWidth)
  }, [setLabelWidth])

  const _handleChange = (e) => {
    const { id } = e.currentTarget;
    onChange(id);
  }

  return (
    <div className={"radio-tag " + props.className}>
      <input 
        type="radio" 
        ref={ref}
        name={name} 
        id={id} 
        value={value} 
        onChange={onChange && _handleChange} 
        defaultChecked={checked}
        style={{ width: labelWidth }}
      />
      <label htmlFor={id} ref={labelRef}>{text}</label>
    </div>
  )
})
export default RadioTag