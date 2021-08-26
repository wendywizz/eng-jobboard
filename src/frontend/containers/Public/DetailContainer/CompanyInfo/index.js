import React from "react";
import { Card } from "reactstrap";
import "./index.css";

export default function CompanyInfo({ name, logoUrl, about, phone, website }) {
  return (
    <Card body className="card-company-info">
      <div className="header">
        <img className="logo" src={logoUrl} alt={name} />
        <h3 className="name">{name}</h3>
      </div>
      <div className="body">
        <p className="about">{about}</p>
        <div className="contact">
          <dl>
            <dt>โทรศัพท์</dt>
            <dd>{phone}</dd>
            <dt>เว็บไซต์</dt>
            <dd>{website}</dd>
          </dl>
        </div>
      </div>
    </Card>
  );
}
