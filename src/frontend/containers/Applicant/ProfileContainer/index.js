import React, { useState } from "react"
import { Nav, NavItem, NavLink, TabContent, Form, Button } from "reactstrap"
import Content, { ContentBody, ContentHeader, ContentFooter } from "Frontend/components/Content"
import { TabInfo, TabEducation, TabSkill, TabAward, TAB_INFO_NAME, TAB_EDUCATION_NAME, TAB_SKILL_NAME, TAB_AWARD_NAME } from "./Tabs"
import classnames from "classnames"
import "./index.css"

function ProfileContainer() {
  const [activeTab, setActiveTab] = useState(TAB_INFO_NAME);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Content className="content-tab">
      <ContentHeader title="โปรไฟล์ส่วนตัว" />
      <ContentBody padding={false}>
        <Form className="distance">
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_INFO_NAME })}
                onClick={() => { toggle(TAB_INFO_NAME); }}
              >
                <span>ข้อมูลทั่วไป</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_EDUCATION_NAME })}
                onClick={() => { toggle(TAB_EDUCATION_NAME); }}
              >
                <span>การศึกษา</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_SKILL_NAME })}
                onClick={() => { toggle(TAB_SKILL_NAME); }}
              >
                <span>ความสามารถ</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_AWARD_NAME })}
                onClick={() => { toggle(TAB_AWARD_NAME); }}
              >
                <span>รางวัลที่ได้รับ</span>
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabInfo />
            <TabEducation />
            <TabSkill />
            <TabAward />
          </TabContent>
        </Form>
      </ContentBody>
      <ContentFooter>
        <div>
          <Button color="primary">บันทึก</Button>
        </div>
      </ContentFooter>
    </Content>
  )
}
export default ProfileContainer