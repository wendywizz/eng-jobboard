import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import {
  PanelCodeChecking,
  PanelInputInfo,
  PanelFinish
} from "Frontend/containers/Public/RegisterContainer/PanelRegister"
import Sizebox from "Frontend/components/Sizebox"
import "./index.css"

const REGIST_STATE = {
  codeChecking: 0,
  inputInfo: 1,
  finish: 2,
}

function RegisterContainer() {
  const [registState, setRegistState] = useState(REGIST_STATE.codeChecking)
  const [studentCode, setStudentCode] = useState(null)
  const [registStatus, setRegistStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [cardNo, setCardNo] = useState(null)

  const _handleCallback = (passed, optionals) => {    
    switch (registState) {
      case REGIST_STATE.codeChecking:      
        setStudentCode(optionals.studentCode)
        setCardNo(optionals.cardNo)  
        setRegistState(REGIST_STATE.inputInfo)
        break
      case REGIST_STATE.inputInfo: default:
        if (passed) {
          setMessage(optionals.message) 
          setRegistStatus(true)          
          setRegistState(REGIST_STATE.finish)
        }
        break
      case REGIST_STATE.finish:
        if (passed) {
          setRegistState(REGIST_STATE.codeChecking)
        }
        break
    }
  }

  const renderPanel = () => {
    switch (registState) {
      case REGIST_STATE.codeChecking: default:
        return <PanelCodeChecking onCallback={_handleCallback} />
      case REGIST_STATE.inputInfo:
        return <PanelInputInfo onCallback={_handleCallback} studentCode={studentCode} cardNo={cardNo} />
      case REGIST_STATE.finish:
        return <PanelFinish onCallback={_handleCallback} registStatus={registStatus} message={message} />
    }
  }

  return (
    <Template>
      <Page centered={true}>
        <Sizebox value="30px" />
        <div className="container-register shadow">
          <Row>
            <Col>
              <h1>สมัครเข้าใช้งาน</h1>
              <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16</p>
              <br />
              <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16</p>
              <br />
              <p>Lorem Ipsum คือ เนื้อหาจำลองแบบเรียบๆ ที่ใช้กันในธุรกิจงานพิมพ์หรืองานเรียงพิมพ์ มันได้กลายมาเป็นเนื้อหาจำลองมาตรฐานของธุรกิจดังกล่าวมาตั้งแต่ศตวรรษที่ 16</p>
            </Col>
            <Col className="col-input">
              <div className="box-register">
              {
                renderPanel()
              }
              </div>
            </Col>
          </Row>
        </div>
      </Page>
    </Template>
  )
}
export default RegisterContainer