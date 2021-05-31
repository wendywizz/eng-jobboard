import React, { useState, useReducer, useEffect } from "react"
import { useHistory, useLocation } from "react-router"
import { Row, Col, Input, Spinner } from "reactstrap"
import ReactPaginate from "react-paginate"
import Template from "Frontend/components/Template"
import Page from "Frontend/components/Page"
import ListJobItem from "Frontend/components/ListJobItem"
import FilterSidebar from "./FilterSidebar"
import { searchJob } from "Shared/states/job/JobDatasource"
import JobReducer from "Shared/states/job/JobReducer"
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType"
import { dispatchParams } from "Shared/utils/params"
import { RESULT_PATH } from "Frontend/configs/paths"
import FilterNav from "./FilterNav"
import "./index.css"

let INIT_DATA = {
  data: [],
  itemCount: 0,
  message: null
}
const PAGE_DISPLAY_LENGTH = 3
function ResultContainer() {
  const [init, setInit] = useState(true)
  const [loading, setLoading] = useState(true)
  const [params, setParams] = useState()
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA)
  const [currentPage, setCurrentPage] = useState(0)
  const location = useLocation()
  const history = useHistory()

  const getData = async (params) => {
    const searchParams = dispatchParams(params)
    const offset = PAGE_DISPLAY_LENGTH * (currentPage)
    const { data, itemCount, error } = await searchJob(searchParams, PAGE_DISPLAY_LENGTH, offset)

    if (error) {
      dispatch({ type: READ_FAILED, payload: { error } })
    } else {
      dispatch({ type: READ_SUCCESS, payload: { data, itemCount } })
    }
    setLoading(false)
  }

  useEffect(() => {
    // Init params from home page
    if (init) {
      if (location.state) {
        const initParams = location.state.params
        setParams(initParams)

        history.replace({ pathname: RESULT_PATH, state: { params: null } })
      }
      setInit(false)
    }
  }, [init, history, location.state])

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        getData(params)
      }, 500)
    }
  }, [loading, params, currentPage])

  const _handleFilterChanged = (params) => {
    setParams(params)
    setLoading(true)
  }

  const _handlePageChanged = ({ selected }) => {
    setCurrentPage(selected)
    setLoading(true)
  }

  const renderArea = (data) => {
    return data.districtAsso.name + " " + data.provinceAsso.name
  }

  const renderPagination = () => {
    if (state.itemCount > 0) {
      return (
        <div className="nav-paginate">
          <ReactPaginate
            pageCount={Math.ceil(state.itemCount / PAGE_DISPLAY_LENGTH)}
            pageRangeDisplayed={2}
            marginPagesDisplayed={3}
            containerClassName="pagination"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
            breakClassName="page-item"
            breakLinkClassName="page-link"
            onPageChange={_handlePageChanged}
            forcePage={currentPage}
          />
        </div>
      )
    }
  }

  return (
    <Template>
      <Page>
        <div className="result-container">
          <div className="result-content-inner">
            <div className="sidebar">
              <FilterSidebar
                defaultParams={params}
                onFilterChanged={_handleFilterChanged}
              />
            </div>
            <div className="content">
              {
                loading
                  ? <Spinner />
                  : (
                    state.error
                      ? <p>{state.error}</p>
                      : (
                        <>
                          <FilterNav params={params} />
                          <div className="nav-sort">
                            <Row>
                              <Col lg={7}>
                                <p className="result-count">{`พบ ${state.itemCount} ตำแหน่งงาน`}</p>
                              </Col>
                              <Col md={5}>
                                <Input type="select" disabled={state.itemCount <= 0}>
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
                            <>
                              {renderPagination()}
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
                              {renderPagination()}
                            </>
                          </div>
                        </>
                      )
                  )
              }
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;
