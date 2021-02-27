import React from "react"
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook } from "@fortawesome/free-brands-svg-icons"
import Section from "Frontend/components/Section"
import "./index.css"

function SectionCategory() {
  return (
    <Section 
      className="section-category" 
      title="หมวดหมู่" 
      centeredTitle={true}
      titleDesc="มีจำนวนงานที่รับสมัครในขณะนี้ 64 ตำแหน่งงาน"
    >
      <Row>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
        <Col>
          <div className="category-item">
            <Link>
              <FontAwesomeIcon icon={faFacebook} className="icon" />
              <span className="name">วิศวกรยานยนต์</span>
              <p className="desc">จำนวน 12 ตำแหน่งงาน</p>
            </Link>
          </div>
        </Col>
      </Row>
    </Section>
  )
}
export default SectionCategory