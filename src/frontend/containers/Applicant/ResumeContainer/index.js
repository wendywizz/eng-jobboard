import React, { useState, useEffect, useReducer } from "react";
import { Row, Col } from "reactstrap";
import Content, { ContentHeader } from "Frontend/components/Content";
import ModalNewResume from "Frontend/components/Modal/ModalNewResume";
import LoadingPage from "Frontend/components/LoadingPage";
import CardNewResume from "./CardNewResume";
import CardResume from "Frontend/components/Card/CardResume";
import { useToasts } from "react-toast-notifications";
import ResumeReducer from "Shared/states/resume/ResumeReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import { useAuth } from "Shared/context/AuthContext";
import { deleteResumeById, listResumeOfUserId } from "Shared/states/resume/ResumeDatasource";

const LIMIT_RESUME_AMOUNT = 4;
let INIT_DATA = {
  data: null,
  message: null,
};
export default function ResumeContainer() {
  const [state, dispatch] = useReducer(ResumeReducer, INIT_DATA);
  const [ready, setReady] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const { addToast } = useToasts();
  const { authUser } = useAuth();

  useEffect(() => {
    async function fetchData(id) {
      if (id) {
        const { data, error } = await listResumeOfUserId(id);

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
        const userId = authUser.id;
        fetchData(userId);
      }, 1000);
    }
  });

  const _handleToggleModal = () => setShowModal(!showModal);

  const _handleUploadSuccess = (message) => {
    setShowModal(false);

    responseMessage(true, message);
    setTimeout(() => {
      window.location.reload()
    }, 1000)
  };

  const _handleUploadFailed = (message) => {
    setShowModal(false);

    responseMessage(false, message);
  };

  const responseMessage = (success, message) => {
    let type;
    if (success) {
      type = "success";
    } else {
      type = "error";
    }

    addToast(message, { appearance: type });
  };

  const _handleClickRemove = async (id) => {
    await deleteResumeById(id)

    window.location.reload()
  }

  const renderEmptyColumn = (itemCount) => {
    let displayItemCount = LIMIT_RESUME_AMOUNT - itemCount

    if (displayItemCount > 0) {
      // Minus add new resume button
      displayItemCount = displayItemCount - 1
      
      if (displayItemCount > 0) {
        let cols = []
        for (let i=0; i<displayItemCount; i++) {
          cols.push(<Col></Col>)
        }
        
        return cols.map(item => item)
      }
    }
    return 
  }

  return (
    <Content className="content-applicant-resume">
      <ContentHeader>
        <h1 className="title">ใบสมัครงาน</h1>
      </ContentHeader>
      {!ready ? (
        <LoadingPage />
      ) : (
        <Row>
          {state.data.map((item, index) => (
            <Col key={index}>
              <CardResume name={item.name} fileUrl={item.resumeFile} onClickRemove={() => _handleClickRemove(item.id)} />
            </Col>
          ))}
          {state.data.length < LIMIT_RESUME_AMOUNT && (
            <Col>
              <CardNewResume onClick={_handleToggleModal} />
            </Col>
          )}
          {renderEmptyColumn(state.data.length)}
        </Row>
      )}
      
      <ModalNewResume
        isOpen={showModal}
        toggle={_handleToggleModal}
        onSuccess={_handleUploadSuccess}
        onError={_handleUploadFailed}
      />
    </Content>
  );
}
