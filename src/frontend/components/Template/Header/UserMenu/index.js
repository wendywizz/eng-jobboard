import React from "react";
import { Button } from "reactstrap";
import { Link, useHistory } from "react-router-dom";
import { AuthProvider, useAuth } from "Shared/context/AuthContext";
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user";
import {
  APPLICANT_PROFILE_PATH,
  APPLICANT_RESUME_PATH,
  APPLICANT_SETTING_PATH,
  EMPLOYER_JOB_PATH,
  EMPLOYER_PROFILE_PATH,
  EMPLOYER_RESUME_PATH,
  EMPLOYER_SETTING_PATH,
  HOME_PATH,
  LOGIN_PATH,
  REGISTER_PATH,
} from "Frontend/configs/paths";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCog,
  faExclamationCircle,
  faFile,
  faKey,
  faList,
  faListAlt,
  faPowerOff,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import blankUser from "Frontend/assets/img/blank-user.jpg";
import "./index.css";

function ContextMenu({ displayName, displayImage, menuItems, onLogout }) {
  const renderUserImage = () => {
    return displayImage ? displayImage : blankUser;
  };

  return (
    <li className="nav-item nav-user-menu dropdown">
      <span
        className="nav-link dropdown-toggle"
        data-toggle="dropdown"
        aria-expanded="true"
      >
        <img src={renderUserImage()} className="user-image" alt="user-img" />
        <span className="hidden-xs">{displayName}</span>
      </span>
      <ul className="dropdown-menu dropdown-menu-right">
        <li className="user-header">
          <img src={renderUserImage()} className="img-circle" alt="user-img" />
          <p>{displayName}</p>
        </li>
        <li className="item">
          {menuItems.map((item, index) => (
            <a key={index} href={item.link}>
              {item.icon} {item.text}
            </a>
          ))}
        </li>
        <li className="user-footer">
          <div className="pull-right">
            <Button color="danger" block onClick={onLogout}>
              <FontAwesomeIcon icon={faPowerOff} /> Log out
            </Button>
          </div>
        </li>
      </ul>
    </li>
  );
}

function MenuItems() {
  const { authUser, authType, signout } = useAuth();
  const history = useHistory();

  const _handleLogout = () => {
    signout();
    history.push(HOME_PATH);
  };

  const renderMenu = () => {
    let menuItems;

    switch (authType) {
      case APPLICANT_TYPE:
        menuItems = [
          {
            text: "ข้อมูลส่วนตัว",
            icon: <FontAwesomeIcon icon={faUser} />,
            link: APPLICANT_PROFILE_PATH,
          },
          {
            text: "ใบสมัครงาน",
            icon: <FontAwesomeIcon icon={faFile} />,
            link: APPLICANT_RESUME_PATH,
          },
          {
            text: "ตั้งค่า",
            icon: <FontAwesomeIcon icon={faCog} />,
            link: APPLICANT_SETTING_PATH,
          },
        ];
        break;
      case EMPLOYER_TYPE:
        menuItems = [
          {
            text: "ข้อมูลบริษัท",
            icon: <FontAwesomeIcon icon={faExclamationCircle} />,
            link: EMPLOYER_PROFILE_PATH,
          },
          {
            text: "จัดการงาน",
            icon: <FontAwesomeIcon icon={faListAlt} />,
            link: EMPLOYER_JOB_PATH,
          },
          {
            text: "รายการรับสมัคร",
            icon: <FontAwesomeIcon icon={faList} />,
            link: EMPLOYER_RESUME_PATH,
          },
          {
            text: "ตั้งค่า",
            icon: <FontAwesomeIcon icon={faCog} />,
            link: EMPLOYER_SETTING_PATH,
          },
        ];
        break;
      default:
        menuItems = [];
        break;
    }

    return (
      <ContextMenu
        displayName={authUser.email}
        menuItems={menuItems}
        onLogout={_handleLogout}
      />
    );
  };

  return (
    <ul className="navbar-nav">
      {authUser ? (
        renderMenu()
      ) : (
        <>
          <li className="nav-item">
            <Link to={REGISTER_PATH} className="nav-link">
              สมัครใช้งาน
            </Link>
          </li>
          <li className="nav-item">
            <Link to={LOGIN_PATH} className="nav-link">
              <FontAwesomeIcon icon={faKey} /> ล็อกอิน
            </Link>
          </li>
        </>
      )}
    </ul>
  );
}

export default function UserMenu() {
  return (
    <div className="user-menu">
      <AuthProvider>
        <MenuItems />
      </AuthProvider>
    </div>
  );
}