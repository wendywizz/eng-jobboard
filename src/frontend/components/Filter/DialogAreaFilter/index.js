import React, { useState, useEffect } from "react"
import { Row, Col, Modal, ModalBody, ListGroup, ListGroupItem, ModalFooter, Button, ModalHeader } from "reactstrap"
import { listDistrictByProvince, listProvince } from "Shared/states/area/AreaDatasource"
import "./index.css"

const TITLE_SELECT_PROVINCE = "เลือกจังหวัด"
const TITLE_SELECT_DISTRICT = "เลือกเขต/อำเภอ"
const TITLE_SEPERATOR = " > "
const TEXT_ALL_AREA = "ทุกจังหวัด"

export default function DialogAreaFilter({ defaultProvinceValue, defaultDistrictValue, onSelected }) {
  const [toggle, setToggle] = useState(false)
  const [ready, setReady] = useState()
  const [title, setTitle] = useState(TITLE_SELECT_PROVINCE)
  const [textResult, setTextResult] = useState(TEXT_ALL_AREA)
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()
  const [selectedAll, setSelectedAll] = useState(false)

  const fetchProvince = async () => {
    const { data } = await listProvince()
    if (data) {
      setProvinceData(data)
    }
  }

  const fetchDistrict = async () => {
    const { data } = await listDistrictByProvince(selectedProvince.id)
    if (data) {
      setDistrictData(data)
    }
  }

  useEffect(() => {
    if (defaultDistrictValue) {
      setSelectedDistrict(defaultDistrictValue)
    }
    if (defaultProvinceValue) {
      setSelectedProvince(defaultProvinceValue)
    }
  }, [defaultDistrictValue, defaultProvinceValue])

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
    showTextResult()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProvince, selectedDistrict])

  const _handleSelected = () => {
    if (onSelected) {
      let values = {}

      if (selectedProvince) {
        values.province = selectedProvince.id
      }
      if (selectedDistrict) {
        values.district = selectedDistrict.id
      }
      onSelected(values)
      setToggle(false)
    }
  }

  const _handleSelectProvince = (province) => {
    setSelectedAll(false)
    setSelectedDistrict(null)
    setSelectedProvince(province)

    // Set title
    const title = TITLE_SELECT_PROVINCE + TITLE_SEPERATOR + TITLE_SELECT_DISTRICT
    setTitle(title)

    // Get district data
    setDistrictData([])
  }

  const _handleSelectDistrict = (district) => {
    setSelectedAll(false)
    setSelectedDistrict(district)
  }

  const _handleSelectAll = () => {
    setSelectedDistrict(null)
    setSelectedProvince(null)
    setSelectedAll(true)
  }

  const showTextResult = () => {    
    if (!selectedAll) {
      let text = null
      if (selectedProvince) {
        text = selectedProvince.name
      }
      if (selectedDistrict) {
        text += TITLE_SEPERATOR + selectedDistrict.name
      }      
      setTextResult(text)
    } else {
      setTextResult(TEXT_ALL_AREA)
    }
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
          <div className="top-bar">
            <Button color="secondary" onClick={_handleSelectAll}>เลือกทุกจังหวัด</Button>
          </div>
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
                      {item.name}
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
                      {item.name}
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
      <select className="form-control dialog-area-filter" onClick={_handleToggle}>
        {
          textResult && <option>{textResult}</option>
        }
      </select>
    </>
  )
}