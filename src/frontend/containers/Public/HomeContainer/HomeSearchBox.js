import React from "react"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Select from "react-select"
import "./HomeSearchBox.css"

function HomeSearchBox() {
  return (
    <div className="home-search-box">
      <Form>
        <FormGroup>
          <Label>สถานที่ทำงาน</Label>
          <Select />
        </FormGroup>
        <FormGroup>
          <Label>ประเภทงาน</Label>
          <Select />
        </FormGroup>
        <FormGroup>
          <Label>คำค้นหา</Label>
          <Input />
        </FormGroup>
        <Button color="primary" block>ค้นหา</Button>
      </Form>
    </div>
  )
}
export default HomeSearchBox
