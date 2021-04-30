import React, { useState } from "react"
import { Input, Button } from "reactstrap"
import Sizebox from "Frontend/components/Sizebox";
import { PARAM_KEYWORD } from "Shared/constants/option-filter";

export default function KeywordOption({ defaultValue, onChange }) {
  const [keyword, setKeyword] = useState()

  const _handleClick = () => {
    const type = PARAM_KEYWORD

    if (keyword) {
      onChange(type, keyword)
    }
  }

  const _handleChange = (e) => {
    const value = e.target.value
    setKeyword(value)
  }

  return (
    <>
      <Input 
        type="text" 
        placeholder="Keyword" 
        bsSize="md" 
        onChange={e => _handleChange(e)} 
        defaultValue={defaultValue} 
      />
      <Sizebox value="10px" />
      <Button color="primary" block onClick={_handleClick}>ค้นหา</Button>
    </>
  )
}