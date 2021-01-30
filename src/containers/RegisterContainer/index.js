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


function RegisterContainer() {
  const [registState, setRegistState] = useState(0)

  const renderPanel = () => {
    switch (registState) {
      case 0: default:
        return <PanelCodeChecking />
      case 1:
        return <PanelInputInfo />
      case 2:
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