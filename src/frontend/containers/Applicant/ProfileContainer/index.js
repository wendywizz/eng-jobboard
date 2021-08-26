import React, { useEffect, useState, useReducer } from "react";
import { Form, FormGroup, Row, Col, Label, Input, Button } from "reactstrap";
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
import LoadingPage from "Frontend/components/LoadingPage";
import "./index.css";

let INIT_DATA = {
  data: null,
  message: null,
};
function ProfileContainer() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [state, dispatch] = useReducer(StudentReducer, INIT_DATA);
  const { authUser } = useAuth();
  const { addToast } = useToasts();

  useEffect(() => {
    async function fetchData(id) {
      const { data, error } = await getStudentByUserId(id);

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } });
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data } });
      }
      setLoading(false);
    }

    if (loading) {
      if (authUser) {
        setTimeout(() => {
          fetchData(authUser.id);
        }, 1000);
      }
    }

    return () => {
      INIT_DATA = {
        ...state,
      };
    };
  });

  const _handleSubmit = () => {
    setSaving(true)
    setTimeout(async () => {
      /*const userId = authUser.id
      const { success, data, message, error } = await saveStudentByUserId(userId, bodyData)

      if (success) {
        dispatch({ type: SAVE_SUCCESS, payload: { data, message } })
      } else {
        dispatch({ type: SAVE_FAILED, payload: { message, error } })
      }
      setSaving(false)
      responseMessage(success, message)**/
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

  return (
    <>
      {loading ? (
        <LoadingPage />
      ) : state.error ? (
        <p>{state.error}</p>
      ) : (
        <Content>
          <ContentHeader>
            <Row>
              <Col>
                <h1 className="title">โปรไฟล์ส่วนตัว</h1>
              </Col>
              <Col style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  onClick={_handleSubmit}
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
            <Form className="distance form-input">
              <FormGroup>
                <Row>
                  <Col>
                    <Label>ชื่อ</Label>
                    <Input type="text" defaultValue={state.data.firstName} />
                  </Col>
                  <Col>
                    <Label>นามสกุล</Label>
                    <Input type="text" defaultValue={state.data.lastName} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Label>ที่อยู่ปัจจุบัน</Label>
                <Input type="textarea" rows={2} defaultValue={state.data.address} />
                <p className="input-desc">ระบุที่อยู่ที่สามารถติดต่อได้</p>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label>จังหวัด</Label>
                    <Input type="select">
                      <option>--- เลือกจังหวัด ---</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                    </Input>
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label>รหัสไปรษณีย์</Label>
                    <Input type="text" defaultValue={state.data.postCode} />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label>เบอร์โทรศัพท์ติดต่อ</Label>
                    <Input
                      type="text"
                      placeholder="Ex. 08########"
                      defaultValue={state.data.phone}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label>อีเมลติดต่อ</Label>
                    <Input
                      type="email"
                      placeholder="example@mail.com"
                      defaultValue={state.data.email}
                    />
                  </Col>
                </Row>
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col md={6} sm={12}>
                    <Label>Facebook</Label>
                    <Input type="text" defaultValue={state.data.facebook} />
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
