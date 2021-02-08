import React from "react";

function Footer(props) {
  return (
    <footer className="jobguru-footer-area">
      <div className="footer-top section_50">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <div className="footer-logo">
                  <a href="index.html">
                    <img src="assets/img/logo.png" alt="jobguru logo" />
                  </a>
                </div>
                <p>
                  Aliquip exa consequat dui aut repahend vouptate elit cilum
                  fugiat pariatur lorem dolor cit amet consecter adipisic elit
                  sea vena eiusmod nulla
                </p>
                <ul className="footer-social">
                  <li>
                    <a href="/" className="fb">
                      <i className="fa fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="twitter">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="linkedin">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="gp">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li>
                    <a href="/" className="skype">
                      <i className="fa fa-skype"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <h3>recent post</h3>
                <div className="latest-post-footer clearfix">
                  <div className="latest-post-footer-left">
                    <img src="assets/img/footer-post-2.jpg" alt="post" />
                  </div>
                  <div className="latest-post-footer-right">
                    <h4>
                      <a href="/">Website design trends for 2018</a>
                    </h4>
                    <p>January 14 - 2018</p>
                  </div>
                </div>
                <div className="latest-post-footer clearfix">
                  <div className="latest-post-footer-left">
                    <img src="assets/img/footer-post-3.jpg" alt="post" />
                  </div>
                  <div className="latest-post-footer-right">
                    <h4>
                      <a href="/">UI experts and modern designs</a>
                    </h4>
                    <p>January 12 - 2018</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget">
                <h3>main links</h3>
                <ul>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> About jobguru
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> Delivery
                      Information
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> Terms &amp;
                      Conditions
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> Customer support
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> Contact with an
                      expert
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> community
                      updates
                    </a>
                  </li>
                  <li>
                    <a href="/">
                      <i className="fa fa-angle-double-right "></i> upcoming updates
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="single-footer-widget footer-contact">
                <h3>Contact Info</h3>
                <p>
                  <i className="fa fa-map-marker"></i> 4257 Street, SunnyVale, USA{" "}
                </p>
                <p>
                  <i className="fa fa-phone"></i> 012-3456-789
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i> info@jobguru.com
                </p>
                <p>
                  <i className="fa fa-envelope-o"></i> info@jobguru.com
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
          <div className="row">
            <div className="col-lg-12">
              <div className="copyright-left">
                <p>Copyright © 2018 Themescare. All Rights Reserved</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default Footer;