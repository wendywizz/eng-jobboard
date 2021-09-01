import React, { useState, useReducer, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { useParams } from "react-router";
import { getJobByID } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import Template from "Frontend/components/Template";
import LoadingPage from "Frontend/components/LoadingPage";
import CardCompanyInfo from "Frontend/components/Card/CardCompanyInfo";
import Page from "Frontend/components/Page";
import CardJobInfo from "./CardJobInfo";
import CardJobApply from "./CardJobApply";
import NoResult from "Frontend/components/NoResult";
import { textLocationAsso } from "Shared/utils/location";
import { useAuth } from "Shared/context/AuthContext";
import "./index.css";

let INIT_DATA = {
  data: null,
  message: null,
};
export default function ApplyJobContainer() {
  let { id } = useParams();
  const { authUser } = useAuth();
  const [ready, setReady] = useState(false);
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA);

  useEffect(() => {
    async function fetchData(id) {
      if (id) {
        const { data, error } = await getJobByID(id);

        if (error) {
          dispatch({ type: READ_FAILED, payload: { error } });
        } else {
          if (data) {
            dispatch({ type: READ_SUCCESS, payload: { data } });
          }
        }
      }
      setReady(true);
    }

    if (!ready) {
      setTimeout(() => {
        fetchData(id);
      }, 1000);
    }

    return () => {
      INIT_DATA = {
        ...state,
      };
    };
  });

  return (
    <Template>
      {!ready ? (
        <LoadingPage />
      ) : (
        <Page centered height={"75vh"}>
          {!state.data ? (
            <NoResult />
          ) : (
            <Row>
              <Col>
                <CardJobApply userId={authUser.id} jobId={state.data.id} />
              </Col>
              <Col>
                <CardJobInfo
                  position={state.data.position}
                  location={textLocationAsso(
                    state.data.districtAsso,
                    state.data.provinceAsso
                  )}
                  jobTypeAsso={state.data.jobTypeAsso}
                  salaryTypeAsso={state.data.salaryTypeAsso}
                  salaryMin={state.data.salaryMin}
                  salaryMax={state.data.salaryMax}
                  amount={state.data.amount}
                  jobCategoryName={state.data.jobCategoryAsso.name}
                />
                <br />
                <CardCompanyInfo
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
          )}
        </Page>
      )}
    </Template>
  );
}
