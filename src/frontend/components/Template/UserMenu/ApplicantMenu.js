import React from "react"
import { Button } from "reactstrap"
import blankUser from "Frontend/assets/img/blank-user.jpg"
import { APPLICANT_PROFILE_PATH } from "Frontend/configs/paths"

function ApplicantMenu({ displayName, userImage, onLogout }) {

  const renderUserImage = () => {
    return userImage ? userImage : blankUser
  }

  return (
    <li className="nav-item dropdown user user-menu open">
      <a href="/" className="dropdown-toggle" data-toggle="dropdown" aria-expanded="true">
        <img src={renderUserImage()} className="user-image" alt="user-img" />
        <span className="hidden-xs">{displayName}</span>
      </a>
      <ul className="dropdown-menu dropdown-menu-right">
        <li className="user-header">
          <img src={renderUserImage()} className="img-circle" alt="user-img" />
          <p>{displayName}</p>
        </li>
        <li className="item">
          <a href={APPLICANT_PROFILE_PATH}>ข้อมูลส่วนตัว</a>
        </li>
        <li className="user-footer">
          <div className="pull-right">
            <Button color="danger" block onClick={onLogout}>Sign out</Button>
          </div>
        </li>
      </ul>
    </li>
  )
}
export default ApplicantMenu