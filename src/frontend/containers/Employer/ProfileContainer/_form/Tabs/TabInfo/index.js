import React from "react"
import { FormGroup, Label, TabPane } from "reactstrap"
//import defaultLogo from "Frontend/assets/img/default-logo.jpg"

const TAB_INFO_NAME = "info"

function TabInfo({ name, about, logoPath, formErrors, formRegister }) {
  return (
    <TabPane tabId={TAB_INFO_NAME}>
      <FormGroup>
        <Label htmlFor="cname">ชื่อบริษัท</Label>
        <input 
          type="text"
          className={"form-control " + (formErrors.cname?.type && "is-invalid")}          
          {...formRegister("cname", { require: true } )}          
        />
        <p className="input-desc">ระบุชื่อบริษัท</p>
        {formErrors.cname?.type === "required" && <p className="validate-message">Field is required</p>}
        {formErrors.cname && "First name is required"}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="about">เกี่ยวกับบริษัท</Label>
        <textarea 
          id="about"
          name="about"
          className="form-control"
          rows={3} 
          ref={formRegister()}
          defaultValue={about} 
        />
        <p className="input-desc">อธิบายข้อมูลของบริษัทโดยคร่าวๆ ว่าบริษัททำธุรกิจอะไร</p>
      </FormGroup>
      <FormGroup>
        <Label htmlFor="logo-img">โลโก้บริษัท</Label>
        <img src={logoPath} alt="company-logo" />
        <input
          type="file" 
          id="logo-img"
          name="logo_img"
          className="form-control"
          ref={formRegister()}
        />
      </FormGroup>
    </TabPane>
  )
}
export default TabInfo
export { TAB_INFO_NAME }



/*<div className="group-image-logo">
<div className="custom-file">
  <input type="file" className="custom-file-input form-control" id="input-image-logo" />
  <label className="custom-file-label" htmlFor="input-image-logo">เลือกไฟล์</label>
</div>
<img className="img-preview" src={defaultLogo} alt="default-logo" />
</div>*/