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
      <div className="filter-option">
        <h4 className="title">จังหวัด</h4>
        <select className="form-control">
          <option>ทุกจังหวัด</option>
        </select>
      </div>
      <div className="filter-option">
        <h4 className="title">ประเภทงาน</h4>
        <Select options={options} />
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
            <Select options={[
              { value: 10000, label: "10000" },
              { value: 20000, label: "20000" },
              { value: 30000, label: "30000" }
            ]} />
          </div>
          <div className="seperate">ถึง</div>
          <div className="option">
            <Select options={[
              { value: 10000, label: "10000" },
              { value: 20000, label: "20000" },
              { value: 30000, label: "30000" }
            ]} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default FilterSidebar