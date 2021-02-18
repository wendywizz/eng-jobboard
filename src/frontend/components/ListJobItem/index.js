import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons' 
import './index.css';

function ListJobItem(props) {
  return (
    <div className="box list-job-item">
      <div className="image">
        <img src="http://themescare.com/demos/jobguru-v2/assets/img/company-logo-1.png" alt="logo" />
      </div>
      <div className="detail">
        <Badge>FULL TIME</Badge>
        <h5 className="title">Regional Sales Manager</h5>
        <div className="desc">
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">สงขลา</span>
          </div>
        </div>
      </div>
      <div className="link">
        <Link className="btn btn-primary rounded" to="/view">รายละเอียด</Link>
      </div>
    </div>
  );
}
export default ListJobItem;
