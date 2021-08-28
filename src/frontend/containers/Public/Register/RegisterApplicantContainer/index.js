import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap"
import Template from "Frontend/components/Template";
import Page from "Frontend/components/Page";
import PanelCodeChecking from "Frontend/containers/Public/Register/RegisterApplicantContainer/PanelCodeChecking";
import PanelInput from "Frontend/containers/Public/Register/RegisterApplicantContainer/PanelInput";
import PanelFinal from "Frontend/containers/Public/Register/Shared/PanelFinal";
import Box from "Frontend/components/Box";

const REGIST_STATE = {
  codeChecking: 0,
  inputInfo: 1,
  finish: 2,
};
export default function RegisterApplicantContainer() {
  const [registState, setRegistState] = useState(REGIST_STATE.codeChecking);
  const [registSuccess, setRegistSuccess] = useState(null);
  const [message, setMessage] = useState(null);
  const [studentCode, setStudentCode] = useState(null);
  const [personNo, setPersonNo] = useState(null);

  useEffect(() => {
    return {
      REGIST_STATE,
    };
  });

  const _handleCallback = (passed, optionals) => {
    switch (registState) {
      case REGIST_STATE.codeChecking:
        setStudentCode(optionals.studentCode);
        setPersonNo(optionals.personNo);
        setRegistState(REGIST_STATE.inputInfo);
        break;
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
          setRegistState(REGIST_STATE.codeChecking);
        }
        break;
    }
  };

  const renderPanel = () => {
    switch (registState) {
      case REGIST_STATE.codeChecking:
      default:
        return <PanelCodeChecking onCallback={_handleCallback} />;
      case REGIST_STATE.inputInfo:
        return (
          <PanelInput
            onCallback={_handleCallback}
            studentCode={studentCode}
            personNo={personNo}
          />
        );
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
              title={"สมัครใช้งานสำหรับผู้หางาน"}
              desc={
                "Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16"
              }
              image={"http://www.ansonika.com/mavia/img/registration_bg.svg"}
            >
              {renderPanel()}
            </Box>
          </Col>
        </Row>
      </Page>
    </Template>
  );
}
