import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import Template from "components/Template"
import Page from "components/Page"
import {
  PanelCodeChecking,
  PanelInputInfo,
  PanelFinish
} from "containers/RegisterContainer/PanelRegister"
import "./index.css"

const REGIST_STATE = {
  codeChecking: 0,
  inputInfo: 1,
  finish: 2,
}

function RegisterContainer() {
  const [registState, setRegistState] = useState(REGIST_STATE.codeChecking)

  const _handleCallback = (passed) => {
    switch (registState) {
      case 0:
        if (passed) {
          setRegistState(REGIST_STATE.inputInfo)
        }
        break
      case 1:
        if (passed) {
          setRegistState(REGIST_STATE.finish)
        }
        break
      case 2:
        setRegistState(REGIST_STATE.codeChecking)
        break
      default:
        break
    }

  }

  const renderPanel = () => {
    switch (registState) {
      case REGIST_STATE.codeChecking: default:
        return <PanelCodeChecking onCallback={_handleCallback} />
      case REGIST_STATE.inputInfo:
        return <PanelInputInfo />
      case REGIST_STATE.finish:
        return <PanelFinish />
    }
  }

  return (
    <Template>
      <Page centered={true}>
        <div className="container-register">
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