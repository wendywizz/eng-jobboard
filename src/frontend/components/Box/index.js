import React from "react";
import { Row, Col } from "reactstrap";
import "./index.css";

export default function Box({  
  showDesc = false,
  title,
  desc,
  image,
  bgColor="primary",
  children,  
}) {
  return (
    <div className="box">
      <Row>
        {showDesc && (
          <Col md={5} className={`text-white text-center bg-${bgColor}`}>
            <div className="column col-desc">
              <div className="card-body card-desc">
                <img className="image" src={image} alt="register" />
                <h2 className="title">{title}</h2>
                <p className="desc">{desc}</p>
              </div>
            </div>
          </Col>
        )}
        <Col md={showDesc ? 7 : 12}>
          <div className="column col-input">{children}</div>
        </Col>
      </Row>
    </div>
  );
}
