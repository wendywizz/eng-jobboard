import React from "react"
import {
  Input,
  FormGroup,
  Label
} from "reactstrap";
import Select from "react-select"
import "./index.css";

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function FilterSidebar() {
  return (
    <div className="filter-sidebar">
      <div className="box">
        <FormGroup tag="fieldset">
          <legend>จังหวัด</legend>
          <select className="form-control">
            <option>ทุกจังหวัด</option>
          </select>
        </FormGroup>
      </div>
      <div className="box">
        <legend>ประเภทงาน</legend>
        <Select options={options} />
      </div>
      <div className="box">
        <FormGroup tag="fieldset">
          <legend>ประเภทงาน</legend>
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
        </FormGroup>
      </div>
      <div className="box">
        <FormGroup tag="fieldset">
          <legend>เงินเดือน</legend>
          <Select options={[
            { value: 0, label: "0 - 10000" },
            { value: 5000, label: "10000 - 20000" },
            { value: 10000, label: "20000 - 30000" },
            { value: 0, label: "> 30000" }
          ]} />
        </FormGroup>
      </div>
    </div>
  )
}
export default FilterSidebar