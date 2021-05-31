import React, { forwardRef, Suspense, useRef, useState, useImperativeHandle } from "react"
import { Form, Nav, NavItem, NavLink, TabContent } from "reactstrap"
import { useForm } from "react-hook-form"
import classnames from "classnames"
import { TabInfo, TabContact, TAB_INFO_NAME, TAB_CONTACT_NAME } from "./Tabs";
import "./index.css"

const FormCompany = forwardRef(({ id, name, logoUrl, about, address, province, district, postCode, phone, website, email, facebook, onSubmit }, ref) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [activeTab, setActiveTab] = useState(TAB_INFO_NAME);
  const refSubmit = useRef(null)

  const _handleToggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const _handleSubmit = (values) => {
    onSubmit(values)    
  }

  useImperativeHandle(ref, () => ({
    submit() {
      refSubmit.current.click()
    }
  }))

  return (
    <Suspense fallback={"loading..."}>
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_INFO_NAME })}
            onClick={() => { _handleToggle(TAB_INFO_NAME); }}
          >
            <span>ข้อมูลทั่วไป</span>
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === TAB_CONTACT_NAME })}
            onClick={() => { _handleToggle(TAB_CONTACT_NAME); }}
          >
            <span>ข้อมูลติดต่อ</span>
          </NavLink>
        </NavItem>
      </Nav>
      <Form className="distance form-input" onSubmit={handleSubmit(_handleSubmit)}>
        <button type="submit" ref={refSubmit} style={{ display: "none" }}></button>        
        <TabContent activeTab={activeTab}>
          <TabInfo
            name={name}
            about={about}
            logoUrl={logoUrl}
            formRegister={register}
            formErrors={errors}
          />
          <TabContact
            address={address}
            province={province}
            district={district}
            postCode={postCode}
            website={website}
            email={email}
            phone={phone}
            facebook={facebook}
            formRegister={register}
            formErrors={errors}
          />
        </TabContent>
      </Form>
    </Suspense>
  )
})
export default FormCompany