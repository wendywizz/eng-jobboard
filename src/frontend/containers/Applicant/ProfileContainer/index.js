import React, { useEffect, useState, useReducer, useRef } from "react";
import { Form, FormGroup, Row, Col, Label, Button } from "reactstrap";
import Content, {
  ContentBody,
  ContentHeader,
} from "Frontend/components/Content";
import {
  getStudentByUserId,
  saveStudentByUserId,
} from "Shared/states/student/StudentDatasource";
import StudentReducer from "Shared/states/student/StudentReducer";
import {
  READ_SUCCESS,
  READ_FAILED,
  SAVE_SUCCESS,
  SAVE_FAILED,
} from "Shared/states/student/StudentType";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave } from "@fortawesome/free-regular-svg-icons";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "Shared/context/AuthContext";
import { useToasts } from "react-toast-notifications";
import { useForm } from "react-hook-form"
import LoadingPage from "Frontend/components/LoadingPage";
import { listProvince, listDistrictByProvince } from "Shared/states/area/AreaDatasource"
import "./index.css";

let INIT_DATA = {
  data: null,
  message: null,
};
function ProfileContainer() {
  const refSubmit = useRef(null)
  const [ready, setReady] = useState(false);
  const [saving, setSaving] = useState(false);
  const [state, dispatch] = useReducer(StudentReducer, INIT_DATA);
  const { register, handleSubmit, errors } = useForm()
  const [provinceData, setProvinceData] = useState([])
  const [districtData, setDistrictData] = useState([])
  const [selectedProvince, setSelectedProvince] = useState()
  const [selectedDistrict, setSelectedDistrict] = useState()
  const { authUser } = useAuth();
  const { addToast } = useToasts();

  useEffect(() => {
    async function fetchProvince() {
      const { data } = await listProvince()
      const provinceData = data.map(item => ({
        text: item.name,
        value: item.id
      }))

      setProvinceData(provinceData)
    }

    fetchProvince()
  }, [])

  useEffect(() => {
    // Watch on district change
    async function fetchDistrict(provinceId) {
      const { data } = await listDistrictByProvince(provinceId)
      const districtData = data.map(item => ({
        text: item.name,
        value: item.id
      }))

      setDistrictData(districtData)
    }

    fetchDistrict(selectedProvince)
  }, [selectedProvince])

  useEffect(() => {
    async function fetchData() {
      if (authUser) {
        const { data, error } = await getStudentByUserId(authUser.id);
        setSelectedProvince(data.province)
        setSelectedDistrict(data.district)

        if (error) {
          dispatch({ type: READ_FAILED, payload: { error } });
        } else {
          dispatch({ type: READ_SUCCESS, payload: { data } });
        }
      }
      setReady(true);
    }

    if (!ready) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }

    return () => {
      INIT_DATA = {
        ...state,
      };
    };
  });

  const _handleProvinceChanged = (e) => {
    const provinceId = e.target.value
    setSelectedProvince(provinceId)
  }

  const _handleDistrictChanged = (e) => {
    const districtId = e.target.value
    setSelectedDistrict(districtId)
  }

  const _handleSubmit = (values) => {
    setSaving(true)

    let bodyData = {
      firstname: values.firstname,
      lastname: values.lastname,
    }
    if (values.address) {
      bodyData.address = values.address
    }
    if (values.province && (values.province.toString() !== "-1")) {
      bodyData.province = values.province
    }
    if (values.district && (values.district.toString() !== "-1")) {
      bodyData.district = values.district
    }
    if (values.postcode) {
      bodyData.postcode = values.postcode
    }
    if (values.phone) {
      bodyData.phone = values.phone
    }
    if (values.email) {
      bodyData.email = values.email
    }
    if (values.facebook) {
      bodyData.facebook = values.facebook
    }

    setTimeout(async () => {
      const userId = authUser.id
      const { success, data, message, error } = await saveStudentByUserId(userId, bodyData)

      if (success) {
        dispatch({ type: SAVE_SUCCESS, payload: { data, message } })
      } else {
        dispatch({ type: SAVE_FAILED, payload: { message, error } })
      }
      setSaving(false)
      responseMessage(success, message)
    }, 1000)
  }

  const responseMessage = (success, message) => {
    let type
    if (success) {
      type = "success"
    } else {
      type = "error"
    }

    addToast(message, { appearance: type })
  }

  const _handleSubmitClick = () => {
    refSubmit.current.click()
  }

  return (
    <>
      {!ready ? (
        <LoadingPage />
      ) : (
        <Content>
          <ContentHeader>
            <Row>
              <Col>
                <h1 className="title">ข้อมูลส่วนตัว</h1>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  onClick={_handleSubmitClick}
                  disabled={saving}
                >
                  {saving ? (
                    <>
                      <FontAwesomeIcon icon={faCircleNotch} spin />
                      <span> กำลังบันทึก</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faSave} />
                      <span> บันทึก</span>
                    </>
                  )}
                </Button>
              </Col>
            </Row>
          </ContentHeader>
          <ContentBody padding={false}>
            <Form className="distance form-input" onSubmit={handleSubmit(_handleSubmit)}>
              <button ref={refSubmit} type="submit" style={{ display: "none" }}></button>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label htmlFor="code">รหัสนักศึกษา</Label>
                    <input
                      id="code"
                      className="form-control"
                      value={state.data.studentCode}
                      disabled
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <Label htmlFor="firstname">ชื่อ</Label>
                    <input
                      type="text"
                      id="firstname"
                      name="firstname"
                      className={"form-control " + (errors.firstname?.type && "is-invalid")}
                      ref={register({
                        required: true
                      })}
                      defaultValue={state.data.firstName}
                    />
                    {errors.firstname?.type === "required" && <p className="validate-message">Field is required</p>}
                  </Col>
                  <Col>
                    <Label htmlFor="lastname">นามสกุล</Label>
                    <input
                      type="text"
                      id="lastname"
                      name="lastname"
                      className={"form-control " + (errors.lastname?.type && "is-invalid")}
                      ref={register({
                        required: true
                      })}
                      defaultValue={state.data.lastName}
                    />
                    {errors.lastname?.type === "required" && <p className="validate-message">Field is required</p>}
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label htmlFor="address">ที่อยู่ปัจจุบัน</Label>
                <textarea
                  id="address"
                  name="address"
                  className={"form-control " + (errors.address?.type && "is-invalid")}
                  rows={2}
                  ref={register()}
                  defaultValue={state.data.address}
                />
                <p className="input-desc">ระบุที่อยู่ที่สามารถติดต่อได้</p>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col lg={3} md={4} sm={12}>
                    <Label htmlFor="province">จังหวัด</Label>
                    <select
                      id="province"
                      name="province"
                      className={"form-control " + (errors.province?.type && "is-invalid")}
                      onChange={_handleProvinceChanged}
                      ref={register()}
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
                        <>
                          <Label htmlFor="district">อำเภอ</Label>
                          <select
                            id="district"
                            name="district"
                            className={"form-control " + (errors.district?.type && "is-invalid")}
                            ref={register()}
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
                        </>
                      )
                    }
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label htmlFor="postcode">รหัสไปรษณีย์</Label>
                    <input
                      type="text"
                      id="postcode"
                      name="postcode"
                      className={"form-control " + (errors.postcode?.type && "is-invalid")}
                      ref={register()}
                      defaultValue={state.data.postCode}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label htmlFor="phone">เบอร์โทรศัพท์ติดต่อ</Label>
                    <input
                      type="text"
                      id="phone"
                      name="phone"
                      className={"form-control " + (errors.phone?.type && "is-invalid")}
                      ref={register()}
                      placeholder="Ex. 08########"
                      defaultValue={state.data.phone}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label htmlFor="email">อีเมลติดต่อ</Label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={"form-control " + (errors.email?.type && "is-invalid")}
                      ref={register({
                        pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      })}
                      placeholder="example@mail.com"
                      defaultValue={state.data.email}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label htmlFor="facebook">Facebook</Label>
                    <input
                      type="text"
                      id="facebook"
                      name="facebook"
                      className={"form-control " + (errors.facebook?.type && "is-invalid")}
                      ref={register()}
                      defaultValue={state.data.facebook}
                    />
                  </Col>
                </Row>
              </FormGroup>
            </Form>
          </ContentBody>
        </Content>
      )}
    </>
  );
}
export default ProfileContainer;
