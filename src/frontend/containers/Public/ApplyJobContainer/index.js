import React, { useState, useReducer, useEffect } from "react";
import { Row, Col, Alert } from "reactstrap";
import { useParams } from "react-router";
import { getJobByID } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import Template from "Frontend/components/Template";
import LoadingPage from "Frontend/components/LoadingPage";
import CardCompanyInfo from "Frontend/components/Card/CardCompanyInfo";
import Page from "Frontend/components/Page";
import CardJobInfo from "./CardJobInfo";
import CardApplyJob from "./CardApplyJob";
import CardApplyContact from "./CardApplyContact";
import CardApplyResult from "./CardApplyResult"
import NoResult from "Frontend/components/NoResult";
import { textLocationAsso } from "Shared/utils/location";
import { useAuth } from "Shared/context/AuthContext";
import { checkCanApplyJobByUser } from "Shared/states/apply/ApplyDatasource";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import "./index.css";

let INIT_DATA = {
  data: null,
  message: null,
};
export default function ApplyJobContainer() {
  let { id } = useParams();
  const { authUser } = useAuth();
  const [dataReady, setDataReady] = useState(false);
  const [checkApplyReady, setCheckApplyReady] = useState(false)
  const [canApply, setCanApply] = useState(false)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA);
  const [finalResult, setFinalResult] = useState()

  useEffect(() => {
    async function fetchData() {
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
      setDataReady(true);
    }

    if (!dataReady) {
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

  useEffect(() => {
    async function fetchData() {
      if (authUser) {        
        const applied = await checkCanApplyJobByUser(id, authUser.id)
        setCanApply(applied)
      }
      setCheckApplyReady(true)
    }

    if (!checkApplyReady) {
      setTimeout(() => {
        fetchData()
      }, 1000)
    }
  })

  const _handleResult = (success, message) => {
    setFinalResult({ success, message })
  }

  return (
    <Template>
      <Page centered height={"75vh"}>
        {
          finalResult ? (
            <CardApplyResult success={finalResult.success} message={finalResult.message} />
          ) : (
            <>
              {!dataReady && !checkApplyReady ? (
                <LoadingPage />
              ) : (
                <>
                  {!state.data ? <NoResult /> : (
                    <Row>
                      <Col>
                        {!canApply && (
                          <Alert color="danger"><FontAwesomeIcon icon={faExclamationTriangle} />{" "}ท่านสมัครงานนี้ไปแล้ว </Alert>
                        )}
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
                          onFinish={_handleResult}
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
                      <Col>
                        <CardApplyContact />
                        <CardApplyJob userId={authUser.id} jobId={state.data.id} onFinish={_handleResult} disableSubmit={!canApply} />
                      </Col>
                    </Row>
                  )}
                </>
              )}
            </>
          )
        }
      </Page>
    </Template>
  );
}
