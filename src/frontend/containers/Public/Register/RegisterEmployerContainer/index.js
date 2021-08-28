import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import Template from "Frontend/components/Template";
import Page from "Frontend/components/Page";
import PanelInput from "Frontend/containers/Public/Register/RegisterEmployerContainer/PanelInput";
import PanelFinal from "Frontend/containers/Public/Register/Shared/PanelFinal";
import Box from "Frontend/components/Box";

const REGIST_STATE = {
  input: 0,
  finish: 1,
};
export default function RegisterEmployerContainer() {
  const [registState, setRegistState] = useState(REGIST_STATE.input);
  const [registSuccess, setRegistSuccess] = useState(null);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    return {
      REGIST_STATE,
    };
  });

  const _handleCallback = (passed, optionals) => {
    switch (registState) {
      case REGIST_STATE.inputInfo:
      default:
        if (passed) {
          setMessage(optionals.message);
          setRegistSuccess(true);
          setRegistState(REGIST_STATE.finish);
        }
        break;
      case REGIST_STATE.finish:
        if (passed) {
          setRegistState(REGIST_STATE.input);
        }
        break;
    }
  };

  const renderPanel = () => {
    switch (registState) {
      case REGIST_STATE.inputInfo:
      default:
        return <PanelInput onCallback={_handleCallback} />;
      case REGIST_STATE.finish:
        return (
          <PanelFinal
            onCallback={_handleCallback}
            registSuccess={registSuccess}
            message={message}
          />
        );
    }
  };

  return (
    <Template>
      <Page centered={true}>
        <Row>
          <Col
            lg={{ offset: 1, size: 10 }}
            md={{ offset: 1, size: 10 }}
            sm={12}
          >
            <Box
              showDesc={true}
              title={"สมัครใช้งานสำหรับผู้จ้างงาน"}
              desc={
                "ลงประกาศรับสมัครงานประจำ งานพาร์ทไทม์และนักศึกษาฝึกงาน สหกิจโดยทางกับทางคณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์"
              }
              image={"http://www.ansonika.com/mavia/img/registration_bg.svg"}
              bgColor={"success"}
            >
              {renderPanel()}
            </Box>
          </Col>
        </Row>
      </Page>
    </Template>
  );
}
