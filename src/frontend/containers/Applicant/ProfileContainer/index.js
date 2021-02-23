import React, { useState } from "react"
import { Nav, NavItem, NavLink, TabContent, Form, Button } from "reactstrap"
import Content, { ContentBody, ContentHeader, ContentFooter } from "Frontend/components/Content"
import { TabInfo, TabEducation, TabSkill, TabAward, TAB_INFO, TAB_EDUCATION, TAB_SKILL, TAB_AWARD } from "./Tabs"
import classnames from "classnames"
import "./index.css"

function ProfileContainer() {
  const [activeTab, setActiveTab] = useState(TAB_INFO);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Content className="content-profile">
      <ContentHeader title="โปรไฟล์ส่วนตัว" />
      <ContentBody padding={false}>
        <Form>
          <Nav tabs>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_INFO })}
                onClick={() => { toggle(TAB_INFO); }}
              >
                <span>ข้อมูลทั่วไป</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_EDUCATION })}
                onClick={() => { toggle(TAB_EDUCATION); }}
              >
                <span>การศึกษา</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_SKILL })}
                onClick={() => { toggle(TAB_SKILL); }}
              >
                <span>ความสามารถ</span>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                className={classnames({ active: activeTab === TAB_AWARD })}
                onClick={() => { toggle(TAB_AWARD); }}
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