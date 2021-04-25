import React, { useEffect, useState } from "react"
import { Input, FormGroup, Label } from "reactstrap"
import { OPTION_TYPE } from "Shared/constants/option-filter"
import { getJobType } from "Shared/states/job/JobDatasource"

export default function TypeOption({ onChange }) {
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
    const type = OPTION_TYPE
    const value = e.target.value

    if (value) {
      onChange(type, value)
    }
  }

  return (
    <>
      {
        items.map((item, index) => (
          <FormGroup check key={index}>
            <Label check>
              <Input type="radio" name="type" value={item.id} onChange={_handleCheckItem} /> {item.name}
            </Label>
          </FormGroup>
        ))
      }
    </>
  )
}