import React, { useState } from "react"
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap"
import { Link } from "react-router-dom"

function HeaderNav() {
  return (
    <div className="header-nav">
      <div className="header-nav-col header-nav-left">
        <ul className="navbar-nav">
          <li className="nav-item"><a className="nav-link" href="#">รับสมัครงาน</a></li>
          <li className="nav-item"><a className="nav-link" href="#">หางาน</a></li>
        </ul>
      </div>
      <div className="header-nav-col header-nav-right">
        <ul className="navbar-nav">
          <li className="nav-item"><Link to="/register" className="nav-Link btn btn-primary btn-sm rounded">สมัครใช้งาน</Link></li>
          <li className="nav-item"><ModalLogin /></li>
        </ul>
      </div>
    </div>
  );
}
export default HeaderNav;

function ModalLogin() {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);

  return (
    <>
      <Button className="rounded" color="success" size="sm" onClick={toggle}>ล็อกอิน</Button>
      <Modal isOpen={modal} toggle={toggle} backdrop={true}>
        <ModalHeader toggle={toggle}>ล็อกอินเข้าใช้งาน</ModalHeader>
        <ModalBody>
          <img src="https://image.freepik.com/free-vector/2fa-authentication-password-secure-notice-login-verification-sms-with-push-code-message-shield-icon-smartphone-phone-laptop-computer-pc-flat_212005-139.jpg" />
          <Button color="primary" block>เข้าสู่ระบบ</Button>
        </ModalBody>
      </Modal>
    </>
  )
}
