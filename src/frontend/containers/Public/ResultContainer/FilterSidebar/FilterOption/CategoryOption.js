import React, { useEffect, useState } from "react"
import { FormGroup, Label, Input } from "reactstrap"
import { getJobCategory } from "Shared/states/job/JobDatasource"
import { PARAM_CATEGORY } from "Shared/constants/option-filter"

export default function CategoryOption({ defaultValue, onChange }) {
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

  const _handleCheckItem = () => {
    const type = PARAM_CATEGORY
    const oItems = document.querySelectorAll(".item-check");
    let checkedItems = []

    oItems.forEach(item => {
      if (item.checked) {
        checkedItems.push(item.value)
      }
    })
    onChange(type, checkedItems)
  }

  return (
    <div className="option-category">
      <div className="body">
        <div className="list">
          {
            items.map((item, index) => {
              let defaultChecked = []
              const isArray = Array.isArray(defaultValue)
              
              if (isArray) {
                defaultChecked = [...defaultValue]
              } else {
                defaultChecked = [ defaultValue ]
              }
              const isChecked = defaultChecked.includes(item.id.toString())

              return (
                <FormGroup check key={index}>
                  <Label check for={`filter-cat-${index}`}>
                    <Input
                      type="checkbox"
                      id={`filter-cat-${index}`}
                      name="job-cat"
                      className="item-check"
                      value={item.id}
                      defaultChecked={isChecked}
                      onChange={_handleCheckItem}
                    /> {item.name}
                  </Label>
                </FormGroup>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}