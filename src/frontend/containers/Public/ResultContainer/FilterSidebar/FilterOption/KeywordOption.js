import React, { useState } from "react"
import { Input, Button } from "reactstrap"
import Sizebox from "Frontend/components/Sizebox";
import { PARAM_KEYWORD } from "Shared/constants/option-filter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedoAlt, faSearch } from "@fortawesome/free-solid-svg-icons";

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
    <div className="option-keyword">
      <Input 
        type="text" 
        placeholder="Keyword" 
        bsSize="md" 
        onChange={e => _handleChange(e)} 
        defaultValue={defaultValue} 
      />
      <Sizebox value="10px" />
      <div className="action">
        <Button className="btn-search" color="primary" onClick={_handleClick}>
          <FontAwesomeIcon icon={faSearch} />
          {" "}ค้นหา
        </Button>
        <Button className="btn-reset" color="danger" onClick={() => window.location.reload()}>
          <FontAwesomeIcon icon={faRedoAlt} />
          {" "}รีเซต
        </Button>
      </div>
    </div>
  )
}