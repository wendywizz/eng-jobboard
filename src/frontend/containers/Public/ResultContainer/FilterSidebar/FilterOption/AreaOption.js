import React from "react"
import { DialogAreaFilter } from "Frontend/components/Filter"
import { OPTION_AREA } from "Shared/constants/option-filter"

export default function AreaOption({ onChange }) {
  const _handleAreaSelected = (value) => {
    const type = OPTION_AREA

    if (value) {
      onChange(type, value)
    }
  }

  return (
    <DialogAreaFilter onSelected={_handleAreaSelected} />
  )
}