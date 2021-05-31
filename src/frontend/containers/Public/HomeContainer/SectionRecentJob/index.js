import React, { useState, useReducer, useEffect } from "react"
import { Spinner } from "reactstrap"
import ListJobItem from "Frontend/components/ListJobItem"
import Section from "Frontend/components/Section"
import { searchJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType"
import "./index.css"

const DISPLAY_COUNT = 5
let INIT_DATA = {
  data: [],
  itemCount: 0,
  message: null
}
function SectionRecentJob() {
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)

  const getData = async () => {
    const { data, itemCount, error } = await searchJob(null, DISPLAY_COUNT)

    if (error) {
      dispatch({ type: READ_FAILED, payload: { error } })
    } else {
      dispatch({ type: READ_SUCCESS, payload: { data, itemCount } })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        getData()
        setLoading(false)
      }, 500)
    }
  })

  const renderArea = (data) => {
    return data.districtAsso.name + " " + data.provinceAsso.name
  }

  return (
    <Section
      className="section-job-recent"
      title="งานล่าสุด"
      titleDesc="ตำแหน่งงานล่าสุดที่เปิดรับสมัคร"
      centeredTitle={false}
    >
      {
        loading
          ? <Spinner />
          : (
            state.error
              ? <p>{state.error}</p>
              : (
                <>
                  {
                    state.data.map((item, index) =>
                      <ListJobItem
                        key={index}
                        id={item.id}
                        title={item.position}                        
                        jobType={item.jobTypeAsso.name}
                        companyName={item.companyOwnerAsso.name}
                        logoUrl={item.logoSourceUrl + item.companyOwnerAsso.logoFile}
                        amount={item.amount}
                        salaryTypeId={item.salaryType}
                        salaryTypeName={item.salaryTypeAsso.name}
                        salaryMin={item.salaryMin}
                        salaryMax={item.salaryMax}
                        area={renderArea(item)}
                      />
                    )
                  }
                </>
              )
          )
      }
    </Section>
  )
}
export default SectionRecentJob