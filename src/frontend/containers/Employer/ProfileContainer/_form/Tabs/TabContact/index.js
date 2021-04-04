import React, { useState, useEffect } from "react"
import { Row, Col, FormGroup, Label, TabPane } from "reactstrap"
import { getProvince, getDistrictByProvince } from "Shared/states/area/AreaDatasource"

const TAB_CONTACT_NAME = "contact"

function TabContact({ address, province, district, postCode, phone, email, website, facebook, formErrors, formRegister }) {
  const [ready, setReady] = useState(false)
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(province)
  const [selectedDistrict, setSelectedDistrict] = useState(district)

  useEffect(() => {
    async function fetchProvince() {
      const { data } = await getProvince()
      const provinceData = data.map(item => ({
        text: item.nameTh,
        value: item.id
      }))

      setProvinceData(provinceData)
    }

    if (!ready) {
      fetchProvince()
      setReady(true)
    }
  }, [ready])

  useEffect(() => {
    // Watch on district change
    async function fetchDistrict(provinceId) {
      const { data } = await getDistrictByProvince(provinceId)
      const districtData = data.map(item => ({
        text: item.nameTh,
        value: item.id
      }))

      setDistrictData(districtData)
    }

    fetchDistrict(selectedProvince)
  }, [selectedProvince])

  const _handleProvinceChanged = (e) => {
    const provinceId = e.target.value
    setSelectedProvince(provinceId)
  }

  const _handleDistrictChanged = (e) => {
    const districtId = e.target.value
    setSelectedDistrict(districtId)
  }

  return (
    <TabPane tabId={TAB_CONTACT_NAME}>
      <FormGroup>
        <Label htmlFor="address">ที่อยู่บริษัท</Label>
        <textarea
          id="address"
          name="address"
          className={"form-control " + (formErrors.address?.type && "is-invalid")}
          rows={2}
          ref={formRegister({ required: true })}
          defaultValue={address}
        />
        {formErrors.address?.type === "required" && <p className="validate-message">Field is required</p>}
      </FormGroup>
      <FormGroup>
        <Label htmlFor="province">พื้นที่</Label>
        <Row>
          <Col lg={3} md={4} sm={12}>
            <select
              id="province"
              name="province"
              className={"form-control " + (formErrors.province?.type && "is-invalid")}
              ref={formRegister({
                validate: {
                  noSelected: value => value !== "-1"
                }
              })}
              onChange={_handleProvinceChanged}
              value={selectedProvince}
            >
              <option value="-1">เลือกจังหวัด</option>
              {
                provinceData.map((item, index) => (
                  <option key={index} value={item.value}>{item.text}</option>
                ))
              }
            </select>
          </Col>
          <Col lg={3} md={4} sm={12}>
            {
              selectedProvince !== "-1" && (
                <select
                  id="district"
                  name="district"
                  className={"form-control " + (formErrors.district?.type && "is-invalid")}
                  ref={formRegister({
                    validate: {
                      noSelected: value => value !== "-1"
                    }
                  })}
                  onChange={_handleDistrictChanged}
                  value={selectedDistrict}
                >
                  <option value="-1">เลือกอำเภอ/เขต</option>
                  {
                    districtData.map((item, index) => (
                      <option key={index} value={item.value}>{item.text}</option>
                    ))
                  }
                </select>
              )
            }
          </Col>
        </Row>
        <p className="input-desc">เลือกพื้นที่ผู้สมัครงานปฎิบัติงาน</p>
        {
          (formErrors.province?.type === "noSelected" || formErrors.district?.type === "noSelected")
          && <p className="validate-message">Field is required</p>
        }
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label htmlFor="postcode">รหัสไปรษณีย์</Label>
            <input
              type="text"
              id="postcode"
              name="postcode"
              className={"form-control " + (formErrors.postcode?.type && "is-invalid")}
              ref={formRegister()}
              defaultValue={postCode}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label htmlFor="phone">โทรศัพท์</Label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={"form-control " + (formErrors.phone?.type && "is-invalid")}
              ref={formRegister()}
              defaultValue={phone}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label htmlFor="email">อีเมล</Label>
            <input
              type="email"
              id="email"
              name="email"
              className={"form-control " + (formErrors.email?.type && "is-invalid")}
              ref={formRegister({
                pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
              })}
              defaultValue={email}
            />
            {formErrors.email?.type === "pattern" && <p className="validate-message">Invalid email</p>}
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label htmlFor="website">เว็บไซต์</Label>
            <input 
              type="text"
              id="website"
              name="website"
              className={"form-control " + (formErrors.website?.type && "is-invalid")}
              ref={formRegister()}
              defaultValue={website}
            />
          </Col>
        </Row>
      </FormGroup>
      <FormGroup>
        <Row>
          <Col md={6}>
            <Label htmlFor="facebook">Facebook</Label>
            <input 
              type="text"
              id="facebook"
              name="facebook"
              className={"form-control " + (formErrors.facebook?.type && "is-invalid")}
              ref={formRegister()}
              defaultValue={facebook}
            />
          </Col>
        </Row>
      </FormGroup>
    </TabPane>
  )
}
export default TabContact
export { TAB_CONTACT_NAME }