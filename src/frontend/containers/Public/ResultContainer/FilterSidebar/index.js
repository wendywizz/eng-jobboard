import React, { useEffect, useState } from "react"
import { Accordion } from "Frontend/components/Accordion";
import { OPTION_KEYWORD, OPTION_CATEGORY, OPTION_TYPE, OPTION_AREA, OPTION_SALARY } from "Shared/constants/option-filter"
import { KeywordOption, CategoryOption, TypeOption, AreaOption, SalaryOption } from "Frontend/containers/Public/ResultContainer/FilterSidebar/FilterOption"
import { isset } from "Shared/utils/string";
import "./index.css"

function FilterSidebar({ onFilterChanged }) {
  const [keyword, setKeyword] = useState()
  const [category, setCategory] = useState([])
  const [type, setType] = useState()
  const [area, setArea] = useState()
  const [salary, setSalary] = useState()

  const _handleSubmitSearch = (filterType, value) => {
    switch (filterType) {
      case OPTION_KEYWORD:
        setKeyword(value)
        break
      case OPTION_CATEGORY:
        setCategory(value)
        break
      case OPTION_TYPE:
        setType(value)
        break
      case OPTION_AREA:
        setArea(value)
        break
      case OPTION_SALARY:
        setSalary(value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    const filters = {
      [OPTION_KEYWORD]: isset(keyword),
      [OPTION_CATEGORY]: isset(category),
      [OPTION_TYPE]: isset(type),
      [OPTION_AREA]: isset(area),
      [OPTION_SALARY]: isset(salary)
    }
    onFilterChanged(filters)
  }, [keyword, category, type, area, salary])

  return (
    <div className="filter-sidebar">
      <Accordion className="filter-option">
        <Accordion.Item open>
          <Accordion.Header>คำค้นหา</Accordion.Header>
          <Accordion.Body>
            <KeywordOption onChange={_handleSubmitSearch} />            
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>กลุ่มงาน</Accordion.Header>
          <Accordion.Body>
            <CategoryOption onChange={_handleSubmitSearch} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>ประเภทงาน</Accordion.Header>
          <Accordion.Body>
            <TypeOption onChange={_handleSubmitSearch} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>พื้นที่</Accordion.Header>
          <Accordion.Body>
            <AreaOption onChange={_handleSubmitSearch} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>เงินเดือน</Accordion.Header>
          <Accordion.Body>
            <SalaryOption onChange={_handleSubmitSearch} />
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </div>
  )
}
export default FilterSidebar