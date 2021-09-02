import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileAlt, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "Frontend/assets/img/default-logo.jpg";
import JobTypeTag from "Frontend/components/JobTypeTag";
import "./index.css";

export default function ListJobApply({
  id,
  title,
  jobTypeId,
  jobTypeName,
  companyName,
  logoUrl,
  area, 
}) {
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
        <JobTypeTag type={jobTypeId} label={jobTypeName} />
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
        <Link className="btn btn-info" target="_blank" to={`view/${id}`}>
          <FontAwesomeIcon icon={faFileAlt} /> ดูรายละเอียด
        </Link>
      </div>
    </div>
  );
}