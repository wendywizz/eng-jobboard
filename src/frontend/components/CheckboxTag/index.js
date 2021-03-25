import React, { useState, useRef, useEffect, forwardRef } from "react"
import "./index.css"

const CheckboxTag = forwardRef(({ id, name, value, text, checked, onChange, ...props }, ref) => {
  const [isChecked, setIsChecked] = useState(checked)
  const [labelWidth, setLabelWidth] = useState(0)
  const labelRef = useRef(null)

  useEffect(() => {
    const labelWidth = labelRef.current.offsetWidth
    setLabelWidth(labelWidth)
  }, [setLabelWidth])

  const _handleChange = () => {
    setIsChecked(() => !isChecked);
  }

  return (
    <div className={"checkbox-tag " + props.className}>
      <input 
        type="checkbox" 
        ref={ref}
        name={name} 
        id={id} 
        value={value} 
        onChange={_handleChange} 
        checked={isChecked}
        style={{ width: labelWidth }}
      />
      <label htmlFor={id} ref={labelRef}>{text}</label>
    </div>
  )
})
export default CheckboxTag