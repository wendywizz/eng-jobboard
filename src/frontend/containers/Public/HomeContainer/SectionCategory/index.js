import React, { useEffect, useState } from "react"
import { Row, Col, Spinner } from "reactstrap"
import { Link } from "react-router-dom"
import Section from "Frontend/components/Section"
import { getJobCategory } from "Shared/states/job/JobDatasource"
import "./index.css"

function SectionCategory() {
  const [ready, setReady] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getJobCategory()

      if (data) {
        setCategories(data)
        setReady(true)
      }
    }

    if (!ready) {
      fetchData()
    }
  })
  return (
    <Section
      className="section-category"
      title="หมวดหมู่"
      centeredTitle={true}
      titleDesc="มีจำนวนงานที่รับสมัครในขณะนี้ 235 ตำแหน่งงาน"
    >
      {
        !ready
          ? <Spinner />
          : (
            <Row>
              {
                categories.map((value, index) => (
                  <Col key={index}>
                    <div className="category-item">
                      <Link to="#">
                        <img className="icon" src={value.image} alt={value.name} />
                        <span className="name">{value.name}</span>
                        <p className="desc">{value.desc}</p>
                      </Link>
                    </div>
                  </Col>
                ))
              }
            </Row>
          )
      }
    </Section>
  )
}
export default SectionCategory