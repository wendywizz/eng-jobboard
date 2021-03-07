import React, { useState } from "react"
import { FormGroup, Label, Input, TabPane } from "reactstrap"
import defaultLogo from "Frontend/assets/img/default-logo.jpg"
import ImageUploader from "react-images-upload";


const TAB_INFO_NAME = "info"

function TabInfo() {
  const [pictures, setPictures] = useState([]);
  const onDrop = picture => {
    setPictures([...pictures, picture]);
  };

  return (
    <TabPane tabId={TAB_INFO_NAME}>
      <FormGroup>
        <Label>ชื่อบริษัท</Label>
        <Input type="text" />
        <p className="input-desc">ระบุชื่อบริษัท</p>
      </FormGroup>
      <FormGroup>
        <Label>เกี่ยวกับบริษัท</Label>
        <Input type="textarea" rows={3} />
        <p className="input-desc">อธิบายข้อมูลของบริษัทโดยคร่าวๆ ว่าบริษัททำธุรกิจอะไร</p>
      </FormGroup>
      <FormGroup>
        <Label>โลโก้บริษัท</Label>
        <ImageUploader
          withIcon={true}
          onChange={onDrop}
          imgExtension={[".jpg", ".gif", ".png", ".gif"]}
          maxFileSize={5242880}
          singleImage={true}
          withPreview={true}
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