import React, { useState, useReducer } from "react";
import Content, {
  ContentBody,
  ContentHeader,
} from "Frontend/components/Content";
import { useAuth } from "Shared/context/AuthContext";
import ApplyReducer from "Shared/states/apply/ApplyReducer";
import { useEffect } from "react/cjs/react.development";
import LoadingPage from "Frontend/components/LoadingPage";
import { listApplyingByUser } from "Shared/states/apply/ApplyDatasource";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/apply/ApplyType";
import "./index.css";
import ListJobApply from "Frontend/components/List/ListJobApply";

const PAGE_DISPLAY_LENGTH = 5;
let INIT_DATA = {
  data: null,
  message: null,
};
export default function ApplyingContainer() {
  const [ready, setReady] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [state, dispatch] = useReducer(ApplyReducer, INIT_DATA);
  const { authUser } = useAuth();

  useEffect(() => {
    async function fetchData() {
      const offset = PAGE_DISPLAY_LENGTH * currentPage;
      const { data, itemCount, error } = await listApplyingByUser(
        authUser.id,
        "",
        PAGE_DISPLAY_LENGTH,
        offset
      );

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } });
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data, itemCount } });
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
  }, [ready, currentPage]);

  const renderArea = (data) => {
    const jobAsso = data.jobAsso

    return jobAsso.districtAsso.name + " " + jobAsso.provinceAsso.name;
  };

  return (
    <Content>
      <ContentHeader>
        <h1 className="title">งานที่กำลังสมัคร</h1>
      </ContentHeader>
      <ContentBody box={false} padding={false}>
        {!ready ? (
          <LoadingPage />
        ) : (
          <>
            {state.data.map((item, index) => (
              <ListJobApply
                key={index}
                id={item.id}
                title={item.jobAsso.position}
                jobTypeId={item.jobAsso.jobTypeAsso.id}
                jotTypeName={item.jobAsso.jobTypeAsso.name}
                companyName={item.jobAsso.companyOwnerAsso.name}
                logoUrl={item.logoSourceUrl + item.jobAsso.companyOwnerAsso.logoFile}
                area={renderArea(item)}
              />
            ))}
          </>
        )}
      </ContentBody>
    </Content>
  );
}
