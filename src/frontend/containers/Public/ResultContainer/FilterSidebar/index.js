import React, { useState }  from "react"
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
  FormGroup,
  Label,
  Modal
} from "reactstrap"
import { DialogAreaFilter } from "Frontend/components/Filter"
import "./index.css"

function FilterSidebar() {
  const _handleSubmit =() =>{

  }

  const _handleOnAreaSelected = (province, district) => {
    console.log("PROV", province)
    console.log("DIST", district)
  }

  return (
    <div className="filter-sidebar">
      <div className="filter-option">
        <InputGroup>
          <Input type="text" placeholder="Keyword" />
          <InputGroupAddon addonType="prepend">
            <Button>ค้นหา</Button>
          </InputGroupAddon>
        </InputGroup>
      </div>
      <div className="filter-option">
        <h4 className="title">จังหวัด</h4>
        <DialogAreaFilter onSelected={_handleOnAreaSelected} />
      </div>
      <div className="filter-option">
        <h4 className="title">ประเภทงาน</h4>
        <Input type="select">
          <option></option>
        </Input>
      </div>
      <div className="filter-option">
        <h4 className="title">ประเภทงาน</h4>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="type" /> งานประจำ
          </Label>
        </FormGroup>
        <FormGroup check>
          <Label check>
            <Input type="radio" name="type" /> พาร์ทไทม์
          </Label>
        </FormGroup>
        <FormGroup check disabled>
          <Label check>
            <Input type="radio" name="type" /> ฝึกงาน/สหกิจ
          </Label>
        </FormGroup>
      </div>
      <div className="filter-option">
        <h4 className="title">เงินเดือน</h4>
        <div className="salary-range">
          <div className="option">
            <Input type="select">
              <option>10000</option>
              <option>20000</option>
              <option>30000</option>
            </Input>
          </div>
          <div className="seperate">ถึง</div>
          <div className="option">
            <Input type="select">
              <option>10000</option>
              <option>20000</option>
              <option>30000</option>
            </Input>
          </div>
        </div>
      </div>
    </div>
  )
}
export default FilterSidebar