import React, { useState, useEffect } from "react"
import { Row, Col, Modal, ModalBody, ListGroup, ListGroupItem, ModalFooter, Button, ModalHeader } from "reactstrap"
import { getDistrictByProvince, getProvince } from "Shared/states/area/AreaDatasource"
import "./index.css"

const TITLE_SELECT_PROVINCE = "เลือกจังหวัด"
const TITLE_SELECT_DISTRICT = "เลือกเขต/อำเภอ"
const TITLE_SEPERATOR = " > "

export default function DialogAreaFilter({ onSelected }) {
  const [toggle, setToggle] = useState(false)
  const [ready, setReady] = useState()
  const [title, setTitle] = useState(TITLE_SELECT_PROVINCE)
  const [textResult, setTextResult] = useState()
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedDistrict, setSelectedDistrict] = useState(null)

  const fetchProvince = async () => {
    const { data } = await getProvince()
    if (data) {
      setProvinceData(data)
    }
  }

  const fetchDistrict = async () => {
    const { data } = await getDistrictByProvince(selectedProvince.id)
    if (data) {
      setDistrictData(data)
    }
  }

  useEffect(() => {
    if (!ready) {
      fetchProvince()
      setReady(true)
    }
  }, [ready])

  useEffect(() => {
    if (selectedProvince) {
      fetchDistrict()
    }
  }, [selectedProvince])

  useEffect(() => {
    showTextResult()
  }, [selectedProvince, selectedDistrict])

  const _handleSelected = () => {
    if (onSelected) {
      onSelected(selectedProvince.id, selectedDistrict.id)
      setToggle(false)
    }
  }

  const _handleSelectProvince = (province) => {
    setSelectedProvince(province)

    // Set title
    const title = TITLE_SELECT_PROVINCE + TITLE_SEPERATOR + TITLE_SELECT_DISTRICT
    setTitle(title)

    // Clear district value
    setSelectedDistrict(null)
    setDistrictData([])
  }

  const _handleSelectDistrict = (district) => {
    setSelectedDistrict(district)
  }

  const showTextResult = () => {
    let text = null
    if (selectedProvince) {
      text = selectedProvince.nameTh
    }
    if (selectedDistrict) {
      text += TITLE_SEPERATOR + selectedDistrict.nameTh
    }
    setTextResult(text)
  }

  const _handleToggle = () => {
    setToggle(true)
  }

  return (
    <>
      <Modal className="modal-filter-area" isOpen={toggle}>
        <ModalHeader>
          {title}
        </ModalHeader>
        <ModalBody>
          <Row>
            <Col className="col-data" md={6}>
              <ListGroup className="list-area-data">
                {
                  provinceData.map((item, index) => (
                    <ListGroupItem
                      className={selectedProvince && (selectedProvince.id === item.id && "active")}
                      key={index}
                      onClick={() => _handleSelectProvince(item)}
                    >
                      {item.nameTh}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Col>
            <Col className="col-data" md={6}>
              <ListGroup className="list-area-data">
                {
                  districtData.map((item, index) => (
                    <ListGroupItem
                      key={index}
                      className={selectedDistrict && (selectedDistrict.id === item.id && "active")}
                      onClick={() => _handleSelectDistrict(item)}
                    >
                      {item.nameTh}
                    </ListGroupItem>
                  ))
                }
              </ListGroup>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Row>
            <Col md={6} sm={12}>
              <span>{textResult}</span>
            </Col>
            <Col md={6} sm={12} className="col-action">
              <Button color="primary" onClick={_handleSelected}>เลือก</Button>
              <Button color="secondary" onClick={() => setToggle(false)}>ปิด</Button>
            </Col>
          </Row>
        </ModalFooter>
      </Modal>
      <select className="form-control" onClick={_handleToggle}>
        <option>{textResult}</option>
      </select>
    </>
  )
}