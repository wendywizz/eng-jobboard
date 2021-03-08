import React from "react"
import { useHistory } from "react-router-dom"
import { Col, Form, FormGroup, Input, Label, Button } from "reactstrap"
import RadioTag from "Frontend/components/RadioTag"
import { RESULT_PATH } from "Frontend/configs/paths"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import "./index.css"

function HomeSearchBox() {
  const history = useHistory()

  const _handleSubmit = (e) => {
    e.preventDefault()
    history.push(RESULT_PATH)
  }

  return (
    <div className="home-searchbox">
      <Form className="form-home-searchbox" onSubmit={_handleSubmit}>
        <div className="form-row">
          <Col>
            <FormGroup>
              <Label>พื้นที่</Label>
              <Input type="select">
                <option>-</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>ประเภทงาน</Label>
              <Input type="select">
                <option>-</option>
              </Input>
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>คำค้น</Label>
              <Input type="text" />
            </FormGroup>
          </Col>
        </div>
        <div className="form-row">
          <Col md={8}>
            <div className="search-type-row">
              <RadioTag className="radio-search-type" name="search-type" text="งานประจำ" />
              <RadioTag className="radio-search-type" name="search-type" text="พาร์ทไทม์" />
              <RadioTag className="radio-search-type" name="search-type" text="ฝึกงาน" />
            </div>
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

  /*return (
    <div className="home-search-box">
      <div className="box-heading">
        <h1 className="title">ค้นหางาน</h1>
      </div>
      <Form onSubmit={_handleSubmit}>
        <FormGroup>
          <Label>สถานที่ทำงาน</Label>
          <Input type="select" />
        </FormGroup>
        <FormGroup>
          <Label>ประเภทงาน</Label>
          <Input type="select" />
        </FormGroup>
        <FormGroup>
          <Label>คำค้นหา</Label>
          <Input />
        </FormGroup>
        <Button color="primary" block>ค้นหา</Button>
      </Form>
    </div>
  )*/
}
export default HomeSearchBox
