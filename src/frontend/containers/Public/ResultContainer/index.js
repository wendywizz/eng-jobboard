import React from "react"
import { Row, Col, Input } from "reactstrap"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import ListJobItem from "Frontend/components/ListJobItem";
import FilterSidebar from "./FilterSidebar";
import "./index.css";

import jobResultData from "Frontend/data/json/job-result.json"

function ResultContainer() {
  return (
    <Template>
      <Page>
        <div className="result-container">
          <div className="result-content-inner">
            <div className="sidebar">
              <FilterSidebar />
            </div>
            <div className="content">
              <div className="nav-filter">
                <Row>
                  <Col md={7}>
                    <p className="result-count">{`พบ ${jobResultData.length} ตำแหน่งงาน`}</p>
                  </Col>
                  <Col md={5}>
                    <Input type="select">
                      <option>เรียงตามผลการค้นหา</option>
                      <option>เรียงจากวันที่ประกาศล่าสุด</option>
                      <option>เรียงตามชื่อบริษัท</option>
                      <option>เรียงจากเงินเดือนน้อย > มาก</option>
                      <option>เรียงจากเงินเดือนมาก > น้อย</option>
                    </Input>
                  </Col>
                </Row>
              </div>
              <div className="result-list">
                {
                  jobResultData.map((value, index) => (
                    <ListJobItem
                      key={index}
                      id={value.jobId}
                      title={value.jobTitle}
                      logoUri={value.image}
                      jobType={value.jobType.name}
                      location={value.location.name}
                    />
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
