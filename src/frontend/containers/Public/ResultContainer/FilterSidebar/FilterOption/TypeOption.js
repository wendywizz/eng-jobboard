import React, { useEffect, useState } from "react"
import { Input, FormGroup, Label } from "reactstrap"
import { PARAM_TYPE } from "Shared/constants/option-filter"
import { getJobType } from "Shared/states/job/JobDatasource"

export default function TypeOption({ defaultValue, onChange }) {
  const [ready, setReady] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getJobType()
      if (!error) {
        setItems(data)
      }
      setReady(true)
    }
    if (!ready) {
      fetchData()
    }
  })

  const _handleCheckItem = (e) => {
    const type = PARAM_TYPE
    const value = e.target.value

    if (value) {
      onChange(type, value)
    }
  }

  return (
    <>
      <FormGroup check>
        <Label check>
          <Input
            type="radio"
            name="type"
            value="*"
            defaultChecked={!defaultValue ? true : false}
            onChange={_handleCheckItem} />
          {"ทั้งหมด"}
        </Label>
      </FormGroup>
      {
        items.map((item, index) => {
          const isChecked = (defaultValue === item.id.toString() ? true : false)
          return (
            <FormGroup check key={index}>
              <Label check>
                <Input
                  type="radio"
                  name="type"
                  value={item.id}
                  defaultChecked={isChecked}
                  onChange={_handleCheckItem} />
                {item.name}
              </Label>
            </FormGroup>
          )
        })
      }
    </>
  )
}