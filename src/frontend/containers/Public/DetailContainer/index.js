import React from "react"
import { Row, Col, Button, Badge } from "reactstrap"
import Template from "Frontend/components/Template"
import CardJobItem from "Frontend/components/CardJobItem"
import Page from "Frontend/components/Page"
import Section from "Frontend/components/Section"
import Sizebox from "Frontend/components/Sizebox"
import "./index.css";

function JobInfoBox(props) {
  return (
    <>
      <div className="job-info">
        <Row>
          <Col>
            <b>ตำแหน่งงาน</b>
          </Col>
          <Col>โปรแกรมเมอร์</Col>
        </Row>
        <Row>
          <Col>
            <b>ประเภท</b>
          </Col>
          <Col>
            <Badge color="success">งานประจำ</Badge>
          </Col>
        </Row>
        <Row>
          <Col>
            <b>สถานที่ปฎิบัติงาน</b>
          </Col>
          <Col>อำเภอหาดใหญ่ จังหวัดสงขลา</Col>
        </Row>
        <Row>
          <Col>
            <b>วันเวลาปฎิบัติงาน</b>
          </Col>
          <Col>
            <span>จันทร์ - เสาร์</span>
            <br />
            <span>(08:00 - 17:00)</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <b>เงินเดือน</b>
          </Col>
          <Col>ตามโครงสร้างบริษัท</Col>
        </Row>
        <Row>
          <Col>
            <b>จำนวนรับ</b>
          </Col>
          <Col>2 อัตรา</Col>
        </Row>
      </div>
      <div className="job-apply">
        <Button className="rounded" size="lg" color="success" block>สมัครงานนี้</Button>
      </div>
    </>
  )
}

function DetailContainer(props) {
  return (
    <Template>
      <Sizebox value="5px" />
      <Page className="page-job-detail">
        <div className="page-inner">
          <Section className="section-heading">
            <Row className="row-info">
              <Col md={2} className="col-image">
                <img src="http://themescare.com/demos/jobguru-v2/assets/img/company-logo-1.png" alt="logo" />
              </Col>
              <Col md={10} className="col-info">
                <h1 className="name">
                  บริษัท ศรีตรังอโกอทิสเม้นต์ จำกัด (มหาชน)
              </h1>
                <p className="address">
                  เลขที่ 10 ซอย 10 ถนนเพชรเกษม ตำบลหาดใหญ่ อำเภอหาดใหญ่
                  จังหวัดสงขลา 90110 ประเทศไทย
              </p>
              </Col>
            </Row>
          </Section>
          <hr />
          <div className="detail">
            <Row>
              <Col md={8}>
                <Section className="section-detail section-company-info" title="ข้อมูลบริษัท" centeredTitle={false}>
                  <p>
                    เพื่อให้เข้ากับยุคสมัยทางบริษัทเน้นการใช้เทคโนโลยีสมัยใหม่เพื่อเจาะกลุ่มลูกค้าและบริหารงานให้มีประสิทธิภาพ
                    เราตั้งใจคัดสรรสินค้าและบริการที่ดีที่สุดสำหรับลูกค้า
                    เพื่อตอบสนองไลฟ์สไตล์และความต้องการของคนยุคใหม่ให้มากที่สุดด้วยการเติบโตที่ก้าวกระโดด
                    บริษัทพร้อมที่จะลงทุนในผู้ร่วมทีมและบุคคลากรเพื่อผลักดันธุรกิจให้เติบโตและก้าวไปข้างหน้าไปพร้อมกันอย่างยั่งยืนโอกาสที่จะร่วมงานกับธุรกิจที่ก้าวกระโดดแบบนี้มีไม่มาก
                    นี้อาจจะเป็นโอกาสที่ดีสำหรับคุณ
                  </p>
                </Section>
                <Section className="section-detail section-performance" title="คุณสมบัติผู้เข้าสมัคร" centeredTitle={false}>
                  <ul>
                    <li>มีคุณวุฒิตรงตามที่นายจ้างต้องการ</li>
                    <li>มีบุคลิกภาพที่ดี</li>
                    <li>ทำงานเข้ากับคนได้</li>
                    <li>ความคิดริเริ่มสร้างสรรค์</li>
                    <li>มีความรอบคอบ คิดเป็นระบบ กระตือรือร้น</li>
                    <li>มีความพร้อมในการปฏิบัติงานทุกด้านเสมอ</li>
                    <li>
                      มีวัฒนธรรมที่ดี มีความซื่อสัตย์ มีวินัยต่อหน้าที่การงาน
                  </li>
                    <li>มีความเอื้ออาทรต่อเพื่อนร่วมงาน</li>
                  </ul>
                </Section>
                <Section className="section-detail section-scope" title="ขอบเขตงาน" centeredTitle={false}>
                  <p>
                    พัฒนาโปรแกรมทั้งเว็บแอพพลิเคชั่นและโมบายแอพพลิเคชั่นตามที่ได้รับมอบหมาย
                </p>
                </Section>
                <Section className="section-detail section-welfare" title="สวัสดิการ" centeredTitle={false}>
                  <ul>
                    <li>ประกันสังคม</li>
                    <li>ประกันสุขภาพ</li>
                    <li>กองทุนสำรองเลี้ยงชีพ (Provident Fund)</li>
                    <li>ลาพักร้อน 10 วัน/ปี</li>
                    <li>สวัสดิการอื่นๆ</li>
                  </ul>
                </Section>
              </Col>
              <Col md={4}>
                <JobInfoBox />
              </Col>
            </Row>
          </div>
        </div>
        <Section className="section-detail section-job-related" title="ตำแหน่งงานอื่นๆ ของบริษัทนี้" centeredTitle={false}>
          <Row>
            <Col lg={3} md={4} sm={6} xs={12}><CardJobItem jobTitle="พนักงานธุรการ" workAddress="อ.หาดใหญ่ จ.สงขลา" salary="15,000 - 20,000" /></Col>
            <Col lg={3} md={4} sm={6} xs={12}><CardJobItem jobTitle="วิศวกรระบบ" workAddress="อ.จะนะ จ.สงขลา" salary="35,000 - 50,000" /></Col>
            <Col lg={3} md={4} sm={6} xs={12}><CardJobItem jobTitle="กราฟฟิคดีไซด์เนอร์" workAddress="อ.หาดใหญ่ จ.สงขลา" salary="ตามตกลง" /></Col>
            <Col lg={3} md={4} sm={6} xs={12}><CardJobItem jobTitle="ผู้จัดการฝ่ายการตลาด" workAddress="อ.หาดใหญ่ จ.สงขลา" salary="ตามโครงสร้างบริษัท" /></Col>
          </Row>
        </Section>
      </Page>
    </Template>
  );
}
export default DetailContainer;