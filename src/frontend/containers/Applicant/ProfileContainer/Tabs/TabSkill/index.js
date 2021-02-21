import React from "react"
import { TabPane, FormGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

function OptionSkill() {
  return (
    <div className="option-skill">
      <FormGroup>
        <Input type="text" />
      </FormGroup>
    </div>
  )
}
function TabSkill() {
  const _handleAdd = (e) => {
    e.preventDefault()
  }

  return (
    <TabPane tabId="skill">
      <p>ระบุความสามารถพิเศษของท่าน</p>
      <div className="list-option">
        <OptionSkill />
        <OptionSkill />
      </div>
      <div className="text-center">
      <Button outline onClick={_handleAdd}>
        <FontAwesomeIcon icon={faPlusCircle} />
        <span> เพิ่ม</span>
      </Button>
      </div>
    </TabPane>
  )
}
export default TabSkill