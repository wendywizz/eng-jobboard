import React from "react"
import { TabPane, FormGroup, Input, Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons"

const TAB_AWARD_NAME = "award"

function OptionAward() {
  return (
    <div className="option-skill">
      <FormGroup>
        <Input type="text" />
      </FormGroup>
    </div>
  )
}

function TabAward() {
  const _handleAdd = (e) => {
    e.preventDefault()
  }
  
  return (
    <TabPane tabId="award">
      <p>ระบุรางวัลที่ท่านเคยได้รับ</p>
      <div className="list-option">
        <OptionAward />
        <OptionAward />
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
export default TabAward
export { TAB_AWARD_NAME }