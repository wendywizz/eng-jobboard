import React from "react"
import { FormGroup, Label, TabPane } from "reactstrap"
import { SingleThumbUpload } from "Frontend/components/Upload"
import { uploadLogo } from "Shared/states/company/CompanyDatasource"
import { useCompany } from "Shared/context/CompanyContext"
import { useAuth } from "Shared/context/AuthContext"
import "./index.css"

const TAB_INFO_NAME = "info"

function TabInfo({ name, about, logoUrl, formErrors, formRegister }) {
  const {companyId} = useCompany()
  const {authUser} = useAuth()

  const _handleUploadLogo = async (image) => {
    const data = await uploadLogo(companyId, authUser.id, image)

    console.log(data)
  }

  return (
    <TabPane tabId={TAB_INFO_NAME}>
      <FormGroup>
        <Label htmlFor="cname">ชื่อบริษัท</Label>
        <input
          id="name"
          type="text"
          name="name"
          className={"form-control " + (formErrors.name?.type && "is-invalid")}
          ref={formRegister({ required: true })}
          defaultValue={name}
        />
        <p className="input-desc">ระบุชื่อบริษัท</p>
        {formErrors.name?.type === "required" && <p className="validate-message">Field is required</p>}
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
        <SingleThumbUpload 
          defaultImage={logoUrl}
          onUpload={_handleUploadLogo}
        />    
      </FormGroup>
    </TabPane>
  )
}
export default TabInfo
export { TAB_INFO_NAME }