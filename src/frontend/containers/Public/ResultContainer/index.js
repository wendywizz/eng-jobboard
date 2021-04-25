import React, { useState, useReducer, useEffect } from "react"
import { Row, Col, Input, Spinner, Badge } from "reactstrap"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import ListJobItem from "Frontend/components/ListJobItem";
import FilterSidebar from "./FilterSidebar";
import ButtonFilter from "Frontend/components/Filter/ButtonFilter";
import { searchJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType"
import "./index.css";

let INIT_DATA = {
  data: [],
  message: null
}
function ResultContainer() {
  const [loading, setLoading] = useState(true)
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const [params, setParams] = useState()

  const getData = async (params) => {
    const { data, error } = await searchJob(params)
    if (error) {
      dispatch({ type: READ_FAILED, payload: { error } })
    } else {
      dispatch({ type: READ_SUCCESS, payload: { data } })
    }
    setLoading(false)
  }

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        getData()
      }, 800)
    }
  })

  useEffect(() => {
    setTimeout(() => {
      getData(params)
      setLoading(false)
    }, 800)
  }, [params])

  const _handleFilterChanged = (params) => {
    setParams(params)
    setLoading(true)
  }

  const renderArea = (data) => {
    console.log(data)
    return data.districtAsso.name + " " + data.provinceAsso.name
  }

  return (
    <Template>
      <Page>
        <div className="result-container">
          <div className="result-content-inner">
            <div className="sidebar">
              <FilterSidebar onFilterChanged={_handleFilterChanged} />
            </div>
            <div className="content">              
              <div className="nav-filter">
                <ButtonFilter text="ว่างงาน" />
              </div>
              <div className="nav-sort">
                <Row>
                  <Col lg={7}>
                    <p className="result-count">{`พบ ${state.data.length} ตำแหน่งงาน`}</p>
                  </Col>
                  <Col md={5}>
                    <Input type="select" disabled={state.data.length <= 0}>
                      <option>เรียงตามผลการค้นหา</option>
                      <option>เรียงจากวันที่ประกาศล่าสุด</option>
                      <option>เรียงตามชื่อบริษัท</option>
                      <option>เรียงจากเงินเดือนน้อย - มาก</option>
                      <option>เรียงจากเงินเดือนมาก - น้อย</option>
                    </Input>
                  </Col>
                </Row>
              </div>
              <div className="result-list">
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
                                  companyLogoUrl={item.companyOwnerAsso.logoPath}
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
              </div>
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
