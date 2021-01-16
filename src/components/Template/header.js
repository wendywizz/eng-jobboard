import React from "react";
import HeaderNav from "./header-nav";

function Header(props) {
  return (
    <header
      id="header"
      className="jobguru-header-area stick-top forsticky page-header"
    >
      <HeaderNav />
      <div id="header-body">
        <div className="menu-animation">
          <div className="container-fluid">
            <div className="row">
              <div className="col-lg-2">
                <div className="site-logo">
                  <a href="index.html">
                    <img src="assets/img/logo-2.png" alt="jobguru" />
                  </a>
                </div>
                <div className="jobguru-responsive-menu">
                  <div className="slicknav_menu">
                    <a
                      href="#"
                      aria-haspopup="true"
                      role="button"
                      tabIndex="0"
                      className="slicknav_btn slicknav_collapsed"
                      style={{ outline: "none" }}
                    >
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
                        <a
                          href="#"
                          role="menuitem"
                          aria-haspopup="true"
                          tabIndex="-1"
                          className="slicknav_item slicknav_row"
                          style={{ outline: "none" }}
                        >
                          <a href="#" tabIndex="-1">
                            home
                          </a>
                          <span className="slicknav_arrow">►</span>
                        </a>
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
              <div className="col-lg-6">
                <div className="header-menu">
                  <nav id="navigation">
                    <ul id="jobguru_navigation">
                      <li className="active has-children">
                        <a href="#">home</a>
                        <ul>
                          <li>
                            <a href="index.html">Home 1</a>
                          </li>
                          <li>
                            <a href="index-2.html">Home 2</a>
                          </li>
                        </ul>
                      </li>
                      <li className="has-children">
                        <a href="#">pages</a>
                        <ul>
                          <li>
                            <a href="about.html">About us</a>
                          </li>
                          <li className="has-inner-child">
                            <a href="#">blog</a>
                            <ul>
                              <li>
                                <a href="blog.html">blog</a>
                              </li>
                              <li>
                                <a href="single-blog.html">single blog</a>
                              </li>
                            </ul>
                          </li>
                          <li>
                            <a href="job-page.html">job page</a>
                          </li>
                          <li>
                            <a href="login.html">login</a>
                          </li>
                          <li>
                            <a href="register.html">register</a>
                          </li>
                          <li>
                            <a href="contact.html">contact us</a>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="header-right-menu">
                  <ul>
                    <li>
                      <a href="post-job.html" className="post-jobs">
                        Post jobs
                      </a>
                    </li>
                    <li>
                      <a href="register.html">
                        <i className="fa fa-user"></i>sign up
                      </a>
                    </li>
                    <li>
                      <a href="login.html">
                        <i className="fa fa-lock"></i>login
                      </a>
                    </li>
                  </ul>
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
