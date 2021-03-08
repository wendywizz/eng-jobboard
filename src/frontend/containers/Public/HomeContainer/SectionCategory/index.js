import React from "react"
import { Row, Col } from "reactstrap"
import { Link } from "react-router-dom"
import Section from "Frontend/components/Section"
import categoryItems from "Frontend/constants/category-items"
import "./index.css"

function SectionCategory() {
  return (
    <Section
      className="section-category"
      title="หมวดหมู่"
      centeredTitle={true}
      titleDesc="มีจำนวนงานที่รับสมัครในขณะนี้ 235 ตำแหน่งงาน"
    >
      <Row>
        {
          categoryItems.map((value, index) => (
            <Col key={index}>
              <div className="category-item">
                <Link>
                  <img className="icon" src={value.image} alt={value.name} />
                  <span className="name">{value.name}</span>
                  <p className="desc">{value.desc}</p>
                </Link>
              </div>
            </Col>
          ))
        }
      </Row>
    </Section>
  )
}
export default SectionCategory