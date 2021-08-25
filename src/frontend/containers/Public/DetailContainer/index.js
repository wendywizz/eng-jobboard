import React, { useState, useReducer, useEffect } from "react";
import { Row, Col, Spinner } from "reactstrap";
import { useParams } from "react-router";
import Template from "Frontend/components/Template";
import Page from "Frontend/components/Page";
import Section from "Frontend/components/Section";
import { getJobByID } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import Sizebox from "Frontend/components/Sizebox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faMapMarker,
  faMoneyBill,
  faThLarge,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { fullDate } from "Shared/utils/datetime";
import JobTypeTag from "Frontend/components/JobTypeTag";
import "./index.css";
import {
  NO_TYPE,
  RANGE_TYPE,
  REQUEST_TYPE,
  SPECIFIC_TYPE,
  STRUCTURAL_TYPE,
} from "Shared/constants/salary-type";
import { toMoney } from "Shared/utils/money";
import JobDetailTag from "Frontend/components/JobDetailTag";
import CompanyInfo from "./CompanyInfo";
import ApplyJobSection from "./ApplyJobSection";

let INIT_DATA = {
  data: null,
  message: null,
};
function DetailContainer() {
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA);

  useEffect(() => {
    async function fetchData(id) {
      const { data, error } = await getJobByID(id);

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } });
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data } });
      }
      setLoading(false);
    }

    if (loading) {
      if (id) {
        setTimeout(() => {
          fetchData(id);
        }, 1000);
      }
    }

    return () => {
      INIT_DATA = {
        ...state,
      };
    };
  });
  
  const renderSalaryValue = (type, min, max) => {    
    switch (type.id) {
      case SPECIFIC_TYPE.value:
        return toMoney(min) + " บาท";
      case RANGE_TYPE.value:
        return toMoney(min) + " - " + toMoney(max) + " บาท";
      case STRUCTURAL_TYPE.value:
      case REQUEST_TYPE.value:
      case NO_TYPE.value:
        return type.name;
      default:
        return "-";
    }
  };

  return (
    <Template>
      <Sizebox value="10px" />
      <Page className="page-job-detail">
        {loading ? (
          <Spinner />
        ) : (
          <Row>
            <Col lg={8} md={8}>
              <div className="page-inner">
                <div className="detail">
                  <div className="header-detail">
                    <JobTypeTag
                      type={state.data.jobType}
                      label={state.data.jobTypeAsso.name}
                    />
                    <h1 className="title">{state.data.position}</h1>
                    <div className="date">
                      <FontAwesomeIcon icon={faCalendarAlt} />{" "}
                      {fullDate(state.data.createdAt)}
                    </div>
                    <div className="detail-tag">
                      <Row>
                        <Col>
                          <JobDetailTag
                            icon={<FontAwesomeIcon icon={faMapMarker} />}
                            label={"สถานที่ปฎิบัติงาน"}
                            value={
                              state.data.districtAsso.name +
                              " " +
                              state.data.provinceAsso.name
                            }
                          />
                        </Col>
                        <Col>
                          <JobDetailTag
                            icon={<FontAwesomeIcon icon={faMoneyBill} />}
                            label={"อัตราเงินเดือน"}
                            value={renderSalaryValue(
                              state.data.salaryTypeAsso,
                              state.data.salaryMin,
                              state.data.salaryMax
                            )}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <JobDetailTag
                            icon={<FontAwesomeIcon icon={faUser} />}
                            label={"จำนวนรับสมัคร"}
                            value={state.data.amount + " ตำแหน่ง"}
                          />
                        </Col>
                        <Col>
                          <JobDetailTag
                            icon={<FontAwesomeIcon icon={faThLarge} />}
                            label={"กลุ่มงาน"}
                            value={state.data.jobCategoryAsso.name}
                          />
                        </Col>
                      </Row>
                    </div>
                  </div>
                  <Section
                    className="section-detail section-performance"
                    title="คุณสมบัติผู้เข้าสมัคร"
                    centeredTitle={false}
                  >
                    <p>{state.data.performance}</p>
                  </Section>
                  <Section
                    className="section-detail section-scope"
                    title="ขอบเขตงาน"
                    centeredTitle={false}
                  >
                    <p>{state.data.duty}</p>
                  </Section>
                  <Section
                    className="section-detail section-welfare"
                    title="สวัสดิการ"
                    centeredTitle={false}
                  >
                    <p>{state.data.welfare}</p>
                  </Section>
                </div>
              </div>
            </Col>
            <Col lg={4} md={4}>              
              <ApplyJobSection jobId={state.data.id} />
              <CompanyInfo 
                name={state.data.companyOwnerAsso.name}
                about={state.data.companyOwnerAsso.about}
                logoUrl={state.data.logoSourceUrl + state.data.companyOwnerAsso.logoFile}
                website={state.data.companyOwnerAsso.website}
                phone={state.data.companyOwnerAsso.phone}
              />
            </Col>
          </Row>
        )}
      </Page>
    </Template>
  );
}
export default DetailContainer;


