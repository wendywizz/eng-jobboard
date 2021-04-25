import React, { useEffect, useState } from "react"
import { Row, Col } from "reactstrap"
import { Range } from "rc-slider"
import { OPTION_SALARY } from "Shared/constants/option-filter"
import { toMoney } from "Shared/utils/money"

const MAX_SALARY = 100000
const MIN_SALARY = 5000
const STEP_SALARY = 5000
export default function SalaryOption({ onChange }) {
  const [maxSalary, setMaxSalary] = useState(null)
  const [minSalary, setMinSalary] = useState(null)

  const _handleChange = (values) => {
    setMaxSalary(values[1])
    setMinSalary(values[0])
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      onChange(OPTION_SALARY, { min: minSalary, max: maxSalary })
    }, 500)

    return () => clearTimeout(timeOutId);
  }, [minSalary, maxSalary]);

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