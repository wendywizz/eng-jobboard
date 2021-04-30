import React, { useEffect, useState } from "react"
import { Input } from "reactstrap"
import { getJobCategory } from "Shared/states/job/JobDatasource"

export default function CategoryOption({ onSelected }) {
  const [ready, setReady] = useState(false)
  const [items, setItems] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await getJobCategory()
      if (!error) {
        setItems(data)
      }
      setReady(true)
    }
    if (!ready) {
      fetchData()
    }
  })

  const _handleChange = (e) => {
    const value = e.target.value
    onSelected(value)
  }

  return (
    <>
      <Input type="select" onChange={_handleChange}>
        <option value="*">ทั้งหมด</option>
        {
          ready && (
            items.map((item, index) =>
              <option key={index} value={item.id}>{item.name}</option>
            )
          )
        }
      </Input>
    </>
  )
}