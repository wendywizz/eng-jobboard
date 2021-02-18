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
            <div className="sidebar">
              <FilterSidebar />
            </div>
            <div className="content">
              <p className="result-count">พบ 23 ตำแหน่งงาน</p>
              <div>
                <ListJobItem />
                <ListJobItem />
                <ListJobItem />
                <ListJobItem />
                <ListJobItem />
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
