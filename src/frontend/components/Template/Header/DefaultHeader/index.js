import React, { useState, useEffect } from "react";
import { Row, Col } from "reactstrap";
import { HOME_PATH } from "Frontend/configs/paths";
import NavTop from "./NavTop";
import navLogo from "Frontend/assets/img/nav-logo.png";
import NavHeader from "Frontend/components/Template/Header/NavHeader";
import "./index.css";

const STICKY_NAV_POS = 150;

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleScroll = () => {
    const position = window.pageYOffset;

    if (position >= STICKY_NAV_POS) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const animateStyle = {
    top: showNavbar ? "0px" : "-100px",
    transition: "all 0.3s ease-in-out",
  };

  return (
    <>      
      <NavHeader style={animateStyle} /> 
      <header className="header-default">
        <NavTop />
        <div className="header-body">
          <div className="container">
            <Row>
              <Col md={6}>
                <div className="site-logo">
                  <a href={HOME_PATH}>
                    <img className="nav-logo" src={navLogo} alt="site logo" />
                  </a>
                </div>
              </Col>
              <Col md={6}></Col>
            </Row>
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
