import React from "react";
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebookF, faYoutube } from "@fortawesome/free-brands-svg-icons"
import { HOME_PATH } from "Frontend/configs/paths";

import footerLogo from "Frontend/assets/img/footer-logo.jpg"
import "./index.css"

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top section_50">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-5">
              <div className="single-footer-widget footer-address">
                <div className="footer-logo">
                  <Link to={HOME_PATH}>
                    <img className="image" src={footerLogo} alt="eng-psu" />
                  </Link>
                </div>
                <div>
                  <div className="name" style={{ marginBottom: "5px" }}>คณะวิศวกรรมศาสตร์ มหาวิทยาลัยสงขลานครินทร์<br />วิทยาเขตหาดใหญ่</div>
                  <div className="address">
                    <span>ตู้ ปณ.2 ถนน กาญจนวณิชย์ ตำบลคอหงส์</span><br />
                    <span>อำเภอหาดใหญ่ จังหวัดสงขลา 90112</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-3">
              <div className="single-footer-widget footer-social">
                <h3>Social Media</h3>
                <ul className="footer-social">
                  <li>
                    <Link to="https://www.facebook.com/ENGINEERINGPSU" className="fb" target="_blank">
                      <FontAwesomeIcon icon={faFacebookF} />
                    </Link>
                  </li>
                  <li>
                    <Link to="https://www.youtube.com/channel/UCMCoEmGQgtx8POYDVX-a37w" className="youtube" target="_blank">
                      <FontAwesomeIcon icon={faYoutube} />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="single-footer-widget footer-contact">
                <h3>Contact Info</h3>
                <p>
                  <i className="fa fa-phone"></i> 012-3456-789
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i> info@eng.psu.ac.th
                </p>
                <p>
                  <i className="fa fa-fax"></i> 112-3456-7898
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-copyright">
        <div className="container">
          <div className="copyright-center">
            <p className="text">Copyright © 2018 Themescare. All Rights Reserved</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;