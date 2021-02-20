import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons' 
import './index.css';

function ListJobItem({ id, title, logoUri, jobType, province }) {
  return (
    <div className="box list-job-item">
      <div className="image">
        <div className="image-source" style={{ backgroundImage: "url("+logoUri+")"}}></div>
      </div>
      <div className="detail">
        <Badge>{jobType}</Badge>
        <h5 className="title">{title}</h5>
        <div className="desc">
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">{province}</span>
          </div>
        </div>
      </div>
      <div className="link">
        <Link className="btn btn-primary rounded" to={`view/${id}`}>รายละเอียด</Link>
      </div>
    </div>
  );
}
export default ListJobItem;
