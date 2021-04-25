import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './index.css';
import { fullDate } from "Shared/utils/datetime"
import { RANGE_TYPE, SPECIFIC_TYPE } from "Shared/constants/salary-type"

function ListJobItem({
  id,
  title,
  jobType,
  companyName,
  companyLogoUrl,
  area, 
  amount, 
  salaryTypeId, 
  salaryTypeName, 
  salaryMin, 
  salaryMax, 
  createAt 
}) {
  const renderSalaryType = () => {    
    switch (salaryTypeId.toString()) {
      case SPECIFIC_TYPE.value:
        return salaryMin + " บาท"
      case RANGE_TYPE.value:
        return salaryMin + " - " + salaryMax + " บาท"
      default:
        return salaryTypeName
    }
  }

  return (
    <div className="box list-job-item">
      <div className="image">
        <img className="image-source" src={companyLogoUrl} alt="logo-company" />
      </div>
      <div className="detail">
        <Badge>{jobType}</Badge>
        <h5 className="title">{title}</h5>
        <div className="desc">
          <div className="desc-item">
            {companyName}
          </div>
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">{area}</span>
          </div>
        </div>
      </div>
      <div className="link">
        <div>
          <div>จำนวน {amount} ตำแหน่ง</div>
          <div>
            ประกาศเมื่อ {fullDate(createAt)}
          </div>
          <div>
            เงินเดือน: {renderSalaryType()}
          </div>
        </div>
        <Link className="btn btn-outline-info" target="_blank" to={`view/${id}`}>รายละเอียด</Link>
      </div>
    </div>
  );
}
export default ListJobItem;
