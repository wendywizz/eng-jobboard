import React, { useState, useReducer, useEffect } from "react"
import { useHistory, useLocation } from "react-router";
import { Row, Col, Input, Spinner } from "reactstrap"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import ListJobItem from "Frontend/components/ListJobItem";
import FilterSidebar from "./FilterSidebar";
import ButtonFilter from "Frontend/components/Filter/ButtonFilter";
import { searchJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType"
import useQuery from "Shared/utils/hook/useQuery";
import { createQueryString, serializeParams } from "Shared/utils/params";
import { PARAM_AREA, PARAM_CATEGORY, PARAM_KEYWORD, PARAM_SALARY, PARAM_TYPE } from "Shared/constants/option-filter";
import { RESULT_PATH } from "Frontend/configs/paths";
import "./index.css";

let INIT_DATA = {
  data: [],
  message: null
}
function ResultContainer() {
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const location = useLocation()
  const query = useQuery()
  const history = useHistory()

  const getData = async (params) => {
    const query = serializeParams(params)
    const { data, error } = await searchJob(query)

    if (error) {
      dispatch({ type: READ_FAILED, payload: { error } })
    } else {
      dispatch({ type: READ_SUCCESS, payload: { data } })
    }
    setLoading(false)
  }

  const initParams = () => {
    const paramArea = query.get(PARAM_AREA)
    const paramKeyword = query.get(PARAM_KEYWORD)
    const paramCategory = query.get(PARAM_CATEGORY)
    const paramType = query.get(PARAM_TYPE)
    const paramSalary = query.get(PARAM_SALARY)

    const params = {
      [PARAM_AREA]: paramArea,
      [PARAM_KEYWORD]: paramKeyword,
      [PARAM_CATEGORY]: paramCategory,
      [PARAM_TYPE]: paramType,
      [PARAM_SALARY]: paramSalary
    }
    return params
  }

  useEffect(() => {   
    console.log("SSS=",location.state) 
    if (loading) {
      setTimeout(() => {
        getData(initParams())
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
    const queryString = createQueryString(params)
    setParams(queryString)

    history.push(RESULT_PATH + "?" + queryString)
    //setLoading(true)
  }

  const renderArea = (data) => {
    return data.districtAsso.name + " " + data.provinceAsso.name
  }

  return (
    <Template>
      <Page>
        <div className="result-container">
          <div className="result-content-inner">
            <div className="sidebar">
              <FilterSidebar 
                defaultParams={initParams()}
                onFilterChanged={_handleFilterChanged} 
              />
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
