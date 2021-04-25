import React from "react"
import { Button } from "reactstrap"
import "./index.css"

export default function ButtonFilter({ text, onRemoveFilter }) {
  const _handleClick = () => {
    if (onRemoveFilter) {
      onRemoveFilter()
    }
  }

  return (
    <div className="btn-filter">
      <div className="inner">
        {text}
        <Button close onClick={_handleClick}>
        </Button>
      </div>
    </div>
  )
}