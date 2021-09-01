import React from "react";
import { Card } from "reactstrap";
import { subText } from "Shared/utils/string";
import iconWWW from "Frontend/assets/img/icon-www.png";
import iconFacebook from "Frontend/assets/img/icon-facebook.png";
import LinkIcon from "Frontend/components/LinkIcon";
import "./index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faMapMarkerAlt,
  faPhoneSquare,
} from "@fortawesome/free-solid-svg-icons";

export default function CompanyInfo({
  name,
  logoUrl,
  about,
  address,
  district,
  province,
  postCode,
  phone,
  email,
  website,
  facebook,
  showContact = true
}) {
  const renderAddress = () => {
    let text = "";
    address && (text += address);
    district && (text += " " + district);
    province && (text += " " + province);
    postCode && (text += " " + postCode);

    return text;
  };

  return (
    <Card body className="card-company-info">
      <div className="header">
        <img className="logo" src={logoUrl} alt={name} />
        <h3 className="name">{name}</h3>
      </div>
      <div className="body">
        <p className="about">{subText(about, 200, true)}</p>
        {
          showContact && (
            <>
              <hr />
              <div className="contact">
                <dl className="list-contact">
                  {renderAddress() && (
                    <>
                      <dt className="title">
                        <FontAwesomeIcon icon={faMapMarkerAlt} /> ที่ตั้ง
                      </dt>
                      <dd className="value">{renderAddress()}</dd>
                    </>
                  )}
                  {phone && (
                    <>
                      <dt className="title">
                        <FontAwesomeIcon icon={faPhoneSquare} /> โทรศัพท์
                      </dt>
                      <dd className="value">{phone}</dd>
                    </>
                  )}
                  {email && (
                    <>
                      <dt className="title">
                        <FontAwesomeIcon icon={faEnvelope} /> อีเมล
                      </dt>
                      <dd className="value">{email}</dd>
                    </>
                  )}
                </dl>
                <div className="extend-contact">
                  {website && (
                    <LinkIcon
                      className="contact-icon"
                      icon={iconWWW}
                      href={website}
                      target="_blank"
                    />
                  )}
                  {facebook && (
                    <LinkIcon
                      className="contact-icon"
                      icon={iconFacebook}
                      href={facebook}
                      target="_blank"
                    />
                  )}
                </div>
              </div>
            </>
          )
        }
      </div>
    </Card>
  );
}
