import React, { useState } from "react"
import { Form, Nav, NavItem, NavLink, TabContent } from "reactstrap"
import classnames from "classnames"
import Content, { ContentBody, ContentHeader, ContentFooter } from "Frontend/components/Content"
import "./index.css"
import { TabInfo, TabContact, TAB_INFO_NAME, TAB_CONTACT_NAME } from "./Tabs";

function ProfileContainer() {
  const [activeTab, setActiveTab] = useState(TAB_INFO_NAME);

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  return (
    <Content className="content-tab">
      <ContentHeader title="โปรไฟล์บริษัท" />
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
                className={classnames({ active: activeTab === TAB_CONTACT_NAME })}
                onClick={() => { toggle(TAB_CONTACT_NAME); }}
              >
                <span>ข้อมูลติดต่อ</span>
              </NavLink>
            </NavItem>           
          </Nav>
          <TabContent activeTab={activeTab}>
            <TabInfo />
            <TabContact />
          </TabContent>
        </Form>
      </ContentBody>
      <ContentFooter>

      </ContentFooter>
    </Content>
  )
}
export default ProfileContainer