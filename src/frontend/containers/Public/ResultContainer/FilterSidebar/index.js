import React, { useEffect, useState } from "react"
import { Accordion } from "Frontend/components/Accordion";
import { PARAM_KEYWORD, PARAM_CATEGORY, PARAM_TYPE, PARAM_AREA, PARAM_SALARY } from "Shared/constants/option-filter"
import { KeywordOption, CategoryOption, TypeOption, AreaOption, SalaryOption } from "Frontend/containers/Public/ResultContainer/FilterSidebar/FilterOption"
import { isset } from "Shared/utils/string";
import "./index.css"

function FilterSidebar({ defaultParams, onFilterChanged }) {
  const [keyword, setKeyword] = useState()
  const [category, setCategory] = useState([])
  const [type, setType] = useState()
  const [area, setArea] = useState()
  const [salary, setSalary] = useState()

  const _handleSubmitSearch = (filterType, value) => {
    switch (filterType) {
      case PARAM_KEYWORD:
        setKeyword(value)
        break
      case PARAM_CATEGORY:
        setCategory(value)
        break
      case PARAM_TYPE:
        setType(value)
        break
      case PARAM_AREA:
        setArea(value)
        break
      case PARAM_SALARY:
        setSalary(value)
        break
      default:
        break
    }
  }

  useEffect(() => {
    if (defaultParams) {
      setKeyword(defaultParams[PARAM_KEYWORD])
      setCategory(defaultParams[PARAM_CATEGORY])
      setType(defaultParams[PARAM_TYPE])
      setArea(defaultParams[PARAM_AREA])
    }
  }, [defaultParams])

  useEffect(() => {
    const filters = {
      [PARAM_KEYWORD]: isset(keyword),
      [PARAM_CATEGORY]: isset(category),
      [PARAM_TYPE]: isset(type),
      [PARAM_AREA]: isset(area),
      [PARAM_SALARY]: isset(salary)
    }
    onFilterChanged(filters)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [keyword, category, type, area, salary])

  return (
    <div className="filter-sidebar">
      <Accordion className="filter-option">
        <Accordion.Item open>
          <Accordion.Header>คำค้นหา</Accordion.Header>
          <Accordion.Body>
            <KeywordOption defaultValue={keyword} onChange={_handleSubmitSearch} />            
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>พื้นที่</Accordion.Header>
          <Accordion.Body>
            <AreaOption 
              defaultValue={area}
              onChange={_handleSubmitSearch} 
            />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>กลุ่มงาน</Accordion.Header>
          <Accordion.Body>
            <CategoryOption defaultValue={category} onChange={_handleSubmitSearch} />
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item open>
          <Accordion.Header>ประเภทงาน</Accordion.Header>
          <Accordion.Body>
            <TypeOption defaultValue={type} onChange={_handleSubmitSearch} />
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