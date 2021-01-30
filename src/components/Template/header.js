import React from "react";
import { HOME_PATH, RESULT_PATH, DETAIL_PATH } from "configs/paths";
import HeaderNav from "./header-nav";
import navLogo from "assets/img/nav-logo.png";

function Header(props) {
  return (
    <header
      id="header"
      className="jobguru-header-area stick-top forsticky page-header"
    >
      <HeaderNav />
      <div id="header-body">
        <div className="menu-animation">
          <div className="container">
            <div className="row">
              <div className="col-lg-3">
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
                    <ul
                      className="slicknav_nav slicknav_hidden"
                      style={{ display: "none" }}
                      aria-hidden="true"
                      role="menu"
                    >
                      <li className="active has-children slicknav_collapsed slicknav_parent">

                        <a href="/" tabIndex="-1">
                          home
                          </a>
                        <span className="slicknav_arrow">►</span>

                        <ul
                          role="menu"
                          className="slicknav_hidden"
                          style={{ display: "none" }}
                          aria-hidden="true"
                        >
                          <li>
                            <a href="index.html" role="menuitem" tabIndex="-1">
                              Home 1
                            </a>
                          </li>
                          <li>
                            <a
                              href="index-2.html"
                              role="menuitem"
                              tabIndex="-1"
                            >
                              Home 2
                            </a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-lg-5">
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
              </div>
              <div className="col-lg-4">
                <div className="header-right-menu">                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;
