import React from "react"
import { TabPane, FormGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const TAB_SKILL_NAME = "skill"

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
    <TabPane tabId={TAB_SKILL_NAME}>
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
export { TAB_SKILL_NAME }