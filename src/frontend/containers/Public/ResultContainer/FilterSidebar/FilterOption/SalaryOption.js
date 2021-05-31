import React, { useState } from "react"
import { Row, Col } from "reactstrap"
import { Range } from "rc-slider"
import { PARAM_SALARY } from "Shared/constants/option-filter"
import { toMoney } from "Shared/utils/money"

const MAX_SALARY = 100000
const MIN_SALARY = 0
const STEP_SALARY = 5000
export default function SalaryOption({ onChange }) {
  const [maxSalary, setMaxSalary] = useState(null)
  const [minSalary, setMinSalary] = useState(null)

  const _handleChange = (values) => {
    const timeOutId = setTimeout(() => {
      const min = values[0]
      const max = values[1]

      setMaxSalary(max)
      setMinSalary(min)

      onChange(PARAM_SALARY, { min, max })
    }, 500)

    return () => clearTimeout(timeOutId);
  }

  return (
    <div className="option-salary">
      <Row>
        <Col>
          <div className="display-value min">{toMoney(minSalary)}</div>
        </Col>
        <Col>
          <div className="display-value max">{toMoney(maxSalary)}</div>
        </Col>
      </Row>
      <Range 
        onChange={_handleChange} 
        min={MIN_SALARY}
        max={MAX_SALARY}
        step={STEP_SALARY}
        dots={true}
      />
    </div>
  )
}