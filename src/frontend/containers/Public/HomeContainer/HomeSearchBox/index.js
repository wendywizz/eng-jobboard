import React from "react"
import { useHistory } from "react-router-dom"
import { Form, FormGroup, Input, Label, Button } from "reactstrap"
import Select from "react-select"
import "./index.css"
import { RESULT_PATH } from "Frontend/configs/paths"

function HomeSearchBox() {
  const history = useHistory()

  const _handleSubmit = (e) => {
    e.preventDefault()
    history.push(RESULT_PATH)
  }

  return (
    <div className="home-search-box">
      <Form onSubmit={_handleSubmit}>
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
