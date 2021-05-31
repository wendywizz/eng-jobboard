import React, { useEffect, useState } from "react"
import { Row, Col, Button, Spinner } from "reactstrap"
import { useHistory } from "react-router-dom"
import Section from "Frontend/components/Section"
import { countAllActiveJob, getJobCategory } from "Shared/states/job/JobDatasource"
import { RESULT_PATH } from "Frontend/configs/paths"
import { PARAM_CATEGORY } from "Shared/constants/option-filter"
import "./index.css"

function SectionCategory() {
  const [ready, setReady] = useState(false)
  const [categories, setCategories] = useState([])
  const [count, setCount] = useState(0)
  const history = useHistory()

  useEffect(() => {
    async function fetchData() {
      const { data } = await getJobCategory()

      if (data) {
        setCategories(data)
        setReady(true)
      }
    }

    async function fetchCount() {
      const { itemCount, error } = await countAllActiveJob()

      if (!error) {
        setCount(itemCount)
      }
    }

    if (!ready) {
      fetchData()
      fetchCount()
    }
  })

  const _handleLinkClick = (id) => {
    const params = {
      [PARAM_CATEGORY]: id
    }
    
    history.push({
      pathname: RESULT_PATH,
      state: { params }
    })
  }

  return (
    <Section
      className="section-category"
      title="หมวดหมู่"
      centeredTitle={true}
      titleDesc={`มีจำนวนงานที่รับสมัครในขณะนี้ ${count} ตำแหน่งงาน`}
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
                      <Button color="transparent" onClick={e => _handleLinkClick(value.id)}>
                        <img className="icon" src={value.image} alt={value.name} />
                        <span className="name">{value.name}</span>
                        <p className="desc">{value.desc}</p>
                      </Button>
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