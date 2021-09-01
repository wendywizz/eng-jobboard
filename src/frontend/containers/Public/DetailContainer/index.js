import React, { useState, useReducer, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router";
import Template from "Frontend/components/Template";
import Page from "Frontend/components/Page";
import Section from "Frontend/components/Section";
import { getJobByID } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import Sizebox from "Frontend/components/Sizebox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt } from "@fortawesome/free-solid-svg-icons";
import { formatFullDate } from "Shared/utils/datetime";
import CompanyInfo from "Frontend/components/CompanyInfo";
import ApplyJobSection from "Frontend/components/ApplyJobSection";
import LoadingPage from "Frontend/components/LoadingPage";
import JobTypeTag from "Frontend/components/JobTypeTag";
import JobTagInfo from "Frontend/components/JobTagInfo";
import "./index.css";

let INIT_DATA = {
  data: null,
  message: null,
};
function DetailContainer() {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);  
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

  return (
    <Template>
      <Sizebox value="10px" />
      <Page className="page-job-detail">
        {loading ? (
          <LoadingPage />
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
                      {formatFullDate(state.data.createdAt)}
                    </div>
                    <JobTagInfo
                      location={state.data.districtAsso.name}
                      salaryTypeAsso={state.data.salaryTypeAsso}
                      salaryMin={state.data.salaryMin}
                      salaryMax={state.data.salaryMax}
                      amount={state.data.amount}
                      jobCategoryName={state.data.jobCategoryAsso.name}
                    />
                  </div>
                  {state.data.performance && (
                    <Section
                      className="section-detail section-performance"
                      title="คุณสมบัติผู้เข้าสมัคร"
                      centeredTitle={false}
                    >
                      <p>{state.data.performance}</p>
                    </Section>
                  )}
                  {state.data.duty && (
                    <Section
                      className="section-detail section-scope"
                      title="ขอบเขตงาน"
                      centeredTitle={false}
                    >
                      <p>{state.data.duty}</p>
                    </Section>
                  )}
                  {state.data.welfare && (
                    <Section
                      className="section-detail section-welfare"
                      title="สวัสดิการ"
                      centeredTitle={false}
                    >
                      <p>{state.data.welfare}</p>
                    </Section>
                  )}
                </div>
              </div>
            </Col>
            <Col lg={4} md={4}>
              <ApplyJobSection jobId={state.data.id} expireDate={state.data.expireAt} />
              <CompanyInfo
                name={state.data.companyOwnerAsso.name}
                about={state.data.companyOwnerAsso.about}
                logoUrl={
                  state.data.logoSourceUrl +
                  state.data.companyOwnerAsso.logoFile
                }
                address={state.data.companyOwnerAsso.address}
                district={state.data.companyOwnerAsso.districtAsso.name}
                province={state.data.companyOwnerAsso.provinceAsso.name}
                postCode={state.data.companyOwnerAsso.postCode}
                phone={state.data.companyOwnerAsso.phone}
                email={state.data.companyOwnerAsso.email}
                website={state.data.companyOwnerAsso.website}
                facebook={state.data.companyOwnerAsso.facebook}
              />
            </Col>
          </Row>
        )}
      </Page>
    </Template>
  );
}
export default DetailContainer;
