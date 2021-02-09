import React from "react";
import { Row, Col } from "reactstrap"
import { HOME_PATH, RESULT_PATH, DETAIL_PATH } from "Frontend/configs/paths";
import HeaderNav from "../HeaderNav";

import navLogo from "Frontend/assets/img/nav-logo.png";
import "./index.css"

function Header() {
  return (
    <header
      id="header"
      className="jobguru-header-area stick-top forsticky page-header"
    >
      <HeaderNav />
      <div className="header-body">
        <div className="menu-animation">
          <div className="container">
            <Row>
              <Col md={3}>
                <div className="site-logo">
                  <a href={HOME_PATH}>
                    <img className="nav-logo" src={navLogo} alt="site logo" />
                  </a>
                </div>
                <div className="jobguru-responsive-menu">
                  <div className="slicknav_menu">
                    <a href="/">
                      <span className="slicknav_menutxt">MENU</span>
                      <span className="slicknav_icon">
                        <span className="slicknav_icon-bar"></span>
                        <span className="slicknav_icon-bar"></span>
                        <span className="slicknav_icon-bar"></span>
                      </span>
                    </a>
                  </div>
                </div>
              </Col>
              <Col md={5}>
                <div className="header-menu">
                  <nav id="navigation">
                    <ul id="jobguru_navigation">
                      <li className="active has-children">
                        <a href={RESULT_PATH}>Result</a>
                      </li>
                      <li className="has-children">
                        <a href={DETAIL_PATH}>Detail</a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Col>
              <Col md={4}>
                <div className="header-right-menu">                
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
