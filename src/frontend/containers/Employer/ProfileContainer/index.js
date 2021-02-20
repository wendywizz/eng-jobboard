import React from "react"
import { Form, FormGroup, Label, Input, Button } from "reactstrap"
import defaultLogo from "Frontend/assets/img/default-logo.jpg"

function ProfileContainer() {

  return (

    <div className="content">
      <div className="content-body box">
        <Form className="distance">
          <FormGroup>
            <Label>ชื่อบริษัท</Label>
            <Input type="text" />
          </FormGroup>
          <FormGroup>
            <Label>เกี่ยวกับบริษัท</Label>
            <Input type="textarea" rows={3} />
          </FormGroup>
          <FormGroup>
            <Label>โลโก้บริษัท</Label>
            <div>
              <img src={defaultLogo} alt="default-logo" />
              <label className="form-label" htmlFor="customFile">Default file input example</label>
              <input type="file" className="form-control" id="customFile" />
            </div>
          </FormGroup>
          <div>
            <Button color="primary">บันทึก</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}
export default ProfileContainer