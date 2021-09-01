import React, { useState, useReducer, useEffect } from "react"
import { Row, Col, Container, Card, CardBody } from "reactstrap"
import { useParams } from "react-router";
import { getJobByID } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import Template from "Frontend/components/Template";
import JobTypeTag from "Frontend/components/JobTypeTag";
import LoadingPage from "Frontend/components/LoadingPage";
import CompanyInfo from "Frontend/components/CompanyInfo";
import JobTagInfo from "Frontend/components/JobTagInfo";

let INIT_DATA = {
  data: null,
  message: null,
};

function JobInfo({ position, location, jobTypeAsso, salaryTypeAsso, salaryMin, salaryMax, amount, jobCategoryName }) {

  return (
    <Card>
      <CardBody>
        <JobTypeTag
          type={jobTypeAsso.id}
          label={jobTypeAsso.name}
        />
        <h1 className="title">{position}</h1>
        <JobTagInfo
          location={location}
          salaryTypeAsso={salaryTypeAsso}
          salaryMin={salaryMin}
          salaryMax={salaryMax}
          amount={amount}
          jobCategoryName={jobCategoryName}
        />
      </CardBody>
    </Card>
  )
}

export default function ApplyJobContainer() {
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
      {loading ? (
        <LoadingPage />
      ) : (
        <Container>
          <Row>
            <Col>
            </Col>
            <Col>
              <JobInfo
                position={state.data.position}
                location={""}
                jobTypeAsso={state.data.jobTypeAsso}
                salaryTypeAsso={state.data.salaryTypeAsso}
                salaryMin={state.data.salaryMin}
                salaryMax={state.data.salaryMax}
                amount={state.data.amount}
                jobCategoryName={state.data.jobCategoryAsso.name}
              />
              <CompanyInfo
                name={state.data.companyOwnerAsso.name}
                about={state.data.companyOwnerAsso.about}
                logoUrl={
                  state.data.logoSourceUrl +
                  state.data.companyOwnerAsso.logoFile
                }
                showContact={false}
              />
            </Col>
          </Row>
        </Container>
      )}
    </Template>
  )
}