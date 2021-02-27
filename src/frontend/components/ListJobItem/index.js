import React from "react"
import { Link } from "react-router-dom"
import { Badge } from "reactstrap"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import './index.css';

function ListJobItem({ id, title, logoUri, jobType, location }) {
  return (
    <div className="box list-job-item">
      <div className="image">
        <div className="image-source" style={{ backgroundImage: "url(" + logoUri + ")" }}></div>
      </div>
      <div className="detail">
        <Badge>{jobType}</Badge>
        <h5 className="title">{title}</h5>
        <div className="desc">
          <div className="desc-item">
            บริษัท ไทยยูเนี่ยนกรุ๊ป จำกัด
          </div>
          <div className="desc-item">
            <FontAwesomeIcon icon={faMapMarkerAlt} />
            <span className="text">{location}</span>
          </div>
        </div>
      </div>
      <div className="link">
        <div>
          <div>จำนวน 2 ตำแหน่ง</div>
          <div>
            ประกาศเมื่อ 25 มกราคม 2564
        </div>
          <div>
            เงินเดือน: 25000 - 35000 บาท
        </div>
        </div>
        <Link className="btn btn-outline-info" to={`view/${id}`}>รายละเอียด</Link>
      </div>
    </div>
  );
}
export default ListJobItem;
