import React from "react"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import {
  Input,
  InputGroup,
  InputGroupAddon,
  Button,
} from "reactstrap";
import ListJobItem from "Frontend/components/ListJobItem";
import FilterSidebar from "./FilterSidebar";
import "./index.css";

import jobResultData from "Frontend/data/json/job-result.json"

function ResultContainer() {
  return (
    <Template>
      <Page>
        <div className="result-container">
          <div className="search-box-panel box">
            <InputGroup>
              <Input type="text" placeholder="Keyword" />
              <InputGroupAddon addonType="prepend">
                <Button>ค้นหา</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div className="result-content">
            <p className="result-count">{`พบ ${jobResultData.length} ตำแหน่งงาน`}</p>
            <div className="result-content-inner">
              <div className="sidebar">
                <FilterSidebar />
              </div>
              <div className="content">
                <div>
                  {
                    jobResultData.map((value, index) => (
                      <ListJobItem
                        key={index}
                        id={value.jobId}
                        title={value.jobTitle}
                        logoUri={value.image}
                        jobType={value.jobType.name}
                        province={value.province.name}
                      />
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
