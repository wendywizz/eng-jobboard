import React from "react";
import { Row, Col } from "reactstrap";
import UserMenu from "../../UserMenu";
import "./index.css";

function HeaderNav() {
  return (
    <div className="header-navtop">
      <Row>
        <Col />
        <Col className="right">
          <UserMenu />
        </Col>
      </Row>
    </div>
  );
}
export default HeaderNav;
