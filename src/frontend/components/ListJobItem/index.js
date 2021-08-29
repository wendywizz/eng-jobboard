import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { formatFullDate } from "Shared/utils/datetime";
import {
  SALARY_NO_TYPE,
  SALARY_RANGE_TYPE,
  SALARY_REQUEST_TYPE,
  SALARY_SPECIFIC_TYPE,
  SALARY_STRUCTURAL_TYPE,
} from "Shared/constants/salary-type";
import defaultLogo from "Frontend/assets/img/default-logo.jpg";
import JobTypeTag from "../JobTypeTag";
import "./index.css";

function ListJobItem({
  id,
  title,
  jobType,
  companyName,
  logoUrl,
  area,
  amount,
  salaryTypeId,
  salaryTypeName,
  salaryMin,
  salaryMax,
  createdAt,
}) {
  const renderSalaryType = () => {
    switch (salaryTypeId) {
      case SALARY_SPECIFIC_TYPE.value:
        return salaryMin + " บาท";
      case SALARY_RANGE_TYPE.value:
        return salaryMin + " - " + salaryMax + " บาท";
      case SALARY_STRUCTURAL_TYPE.value:
      case SALARY_REQUEST_TYPE.value:
      case SALARY_NO_TYPE.value:
      default:
        return salaryTypeName;
    }
  };

  return (
    <div className="box list-job-item">
      <div className="image">
        <img
          className="image-source"
          src={logoUrl}
          alt="logo-company"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultLogo;
          }}
        />
      </div>
      <div className="detail">
        <JobTypeTag type={jobType.id} label={jobType.name} />
        <h5 className="title">{title}</h5>
        <div className="desc">
          <div className="desc-item">{companyName}</div>
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">{area}</span>
          </div>
        </div>
      </div>
      <div className="link">
        <div>
          <div>จำนวน {amount} ตำแหน่ง</div>
          <div>ประกาศเมื่อ {formatFullDate(createdAt)}</div>
          <div>เงินเดือน: {renderSalaryType()}</div>
        </div>
        <Link className="btn btn-info" target="_blank" to={`view/${id}`}>
          <FontAwesomeIcon icon={faFileAlt} /> ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}
export default ListJobItem;
