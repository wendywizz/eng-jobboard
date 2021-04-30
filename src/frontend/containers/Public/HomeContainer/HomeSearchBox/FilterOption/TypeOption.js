import React, { useEffect, useState } from "react"
import RadioTag from "Frontend/components/RadioTag"
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

  const _handleChange = (value) => {
    if (onChange) {
      onChange(value)
    }
  }

  return (
    <div className="search-type-row">
      {
        items.map((item, index) => (
          <RadioTag 
            key={index}
            className="radio-search-type" 
            name="search-type" 
            text={item.name} 
            value={item.id} 
            onChange={_handleChange}
          />
        ))
      }
    </div>
  )
}