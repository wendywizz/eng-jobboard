import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap"
import { RESULT_PATH } from "Frontend/configs/paths"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import { DialogAreaFilter } from "Frontend/components/Filter"
import { TypeOption, CategoryOption } from "./FilterOption"
import "./index.css"
import { createQueryString } from "Shared/utils/params"
import { PARAM_AREA, PARAM_CATEGORY, PARAM_KEYWORD, PARAM_TYPE } from "Shared/constants/option-filter"

function HomeSearchBox() {
  const history = useHistory()
  const [paramArea, setParamArea] = useState()
  const [paramCategory, setParamCategory] = useState()
  const [paramKeyword, setParamKeyword] = useState()
  const [paramType, setParamType] = useState()

  const _handleSubmit = (e) => {
    e.preventDefault()
    
    const params = {
      [PARAM_AREA]: paramArea,
      [PARAM_CATEGORY]: paramCategory,
      [PARAM_KEYWORD]: paramKeyword,
      [PARAM_TYPE]: paramType
    }
    const queryString = createQueryString(params)
    //history.push(RESULT_PATH + "?" + queryString)

    history.push({
      pathname: RESULT_PATH,
      state: { query: queryString }
    })
  }

  const _handleParamAreaChange = (value) => {
    if (value) {
      setParamArea(value)
    }
  }

  const _handleParamCategoryChange = (value) => {
    if (value) {
      setParamCategory(value)
    }
  }

  const _handleParamKeywordChange = (e) => {
    const value = e.target.value
    setParamKeyword(value)
  }

  const _handleParamTypeChange = (value) => {
    if (value) {
      setParamType(value)
    }
  }

  return (
    <div className="home-searchbox">
      <Form className="form-home-searchbox" onSubmit={_handleSubmit}>
        <div className="form-row">
          <Col>
            <FormGroup>
              <Label>พื้นที่</Label>
              <DialogAreaFilter onSelected={_handleParamAreaChange} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>ประเภทงาน</Label>
              <CategoryOption onSelected={_handleParamCategoryChange} />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>คำค้น</Label>
              <Input type="text" onChange={_handleParamKeywordChange} />
            </FormGroup>
          </Col>
        </div>
        <div className="form-row">
          <Col md={8}>
            <TypeOption onChange={_handleParamTypeChange} />
          </Col>
          <Col md={4} className="col-submit">
            <Button color="primary">
              <FontAwesomeIcon icon={faSearch} />{" "}
              <span>ค้นหา</span>
            </Button>
          </Col>
        </div>
      </Form>
    </div>
  )
}
export default HomeSearchBox
