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
      <Page className="two-column">
        <FilterSidebar />
        <div className="result-content">
          <div className="search-box-panel box">
            <InputGroup>
              <Input type="text" placeholder="Keyword" />
              <InputGroupAddon addonType="prepend">
                <Button>ค้นหา</Button>
              </InputGroupAddon>
            </InputGroup>
          </div>
          <div>
            <ListJobItem />
            <ListJobItem />
            <ListJobItem />
            <ListJobItem />
            <ListJobItem />
            <ListJobItem />
            <ListJobItem />
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
