import React from "react"
import { Badge } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons' 
import './index.css';

function JobItem(props) {
  return (
    <div className="job-item">
      <div className="image">
        <img src="http://themescare.com/demos/jobguru-v2/assets/img/company-logo-1.png" />
      </div>
      <div className="detail">
        <Badge>FULL TIME</Badge>
        <h5 className="title">Regional Sales Manager</h5>
        <p className="desc">
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">สงขลา</span>
          </div>
        </p>
      </div>
      <div className="link">
        <a className="btn btn-lg btn-secondary rounded">View</a>
      </div>
    </div>
  );
}
export default JobItem;
