import React, { useEffect, useState, useReducer } from "react"
import { Card, CardBody, Alert } from "reactstrap"
import { faEnvelope, faInfoCircle, faMapMarkedAlt, faPhoneSquare } from "@fortawesome/free-solid-svg-icons"
import { faFacebookF } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  READ_SUCCESS,
  READ_FAILED,
} from "Shared/states/student/StudentType";
import {
  getStudentByUserId,
} from "Shared/states/student/StudentDatasource";
import StudentReducer from "Shared/states/student/StudentReducer";
import { useAuth } from "Shared/context/AuthContext";
import SpinnerBlock from "Frontend/components/SpinnerBlock";
import "./index.css"
import { Link } from "react-router-dom";
import { APPLICANT_RESUME_PATH } from "Frontend/configs/paths";

let INIT_DATA = {
  data: null,
  message: null,
};
export default function CardApplyContact() {
  const [ready, setReady] = useState(false);
  const { authUser } = useAuth();
  const [state, dispatch] = useReducer(StudentReducer, INIT_DATA);

  const renderAddress = () => {
    let text = "";

    state.data.address && (text += state.data.address);
    state.data.district && (text += " " + state.data.districtAsso.name);
    state.data.province && (text += " " + state.data.provinceAsso.name);
    state.data.postCode && (text += " " + state.data.postCode);

    return text;
  };

  useEffect(() => {
    async function fetchData() {
      if (authUser) {
        const { data, error } = await getStudentByUserId(authUser.id);

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

  return (
    <Card className="card-apply-contact">
      <CardBody>
        <div className="heading">
          <h3 className="title">ข้อมูลติดต่อของผู้สมัคร</h3>
          <p className="desc">ผู้ว่าจ้างจะแจ้งผลการสมัครตามข้อมูลติดต่อที่ท่านได้แจ้งไว้ โปรดตรวจสอบข้อมูลอย่างละเอียด</p>
        </div>
        {
          !ready ? <SpinnerBlock size="sm" />
            : (
              <>
                <div className="contact">
                  <dl className="list-contact">
                    {
                      state.data.address && (
                        <>
                          <dt className="title"><FontAwesomeIcon icon={faMapMarkedAlt} /></dt>
                          <dd className="value">{renderAddress()}</dd>
                        </>
                      )
                    }
                    {
                      state.data.phone && (
                        <>
                          <dt className="title"><FontAwesomeIcon icon={faPhoneSquare} /></dt>
                          <dd className="value">{state.data.phone}</dd>
                        </>
                      )
                    }
                    {
                      state.data.email && (
                        <>
                          <dt className="title"><FontAwesomeIcon icon={faEnvelope} /></dt>
                          <dd className="value">{state.data.email}</dd>
                        </>
                      )
                    }
                    {
                      state.data.facebook && (
                        <>
                          <dt className="title"><FontAwesomeIcon icon={faFacebookF} /></dt>
                          <dd className="value">{state.data.facebook}</dd>
                        </>
                      )
                    }
                  </dl>
                </div>
                <Alert color="info"><FontAwesomeIcon icon={faInfoCircle} /> หากต้องการแก้ไขข้อมูลติดต่อ ท่านสามารถแก้ได้ที่ <Link to={APPLICANT_RESUME_PATH} target="_blank">ข้อมูลส่วนตัว</Link></Alert>
              </>
            )
        }
      </CardBody>
    </Card>
  )
}