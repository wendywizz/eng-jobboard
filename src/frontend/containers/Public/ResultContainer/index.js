import React, { useState, useReducer, useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { Row, Col, Input } from "reactstrap";
import ReactPaginate from "react-paginate";
import Template from "Frontend/components/Template";
import Page from "Frontend/components/Page";
import ListJobItem from "Frontend/components/ListJobItem";
import FilterSidebar from "./FilterSidebar";
import { searchJob } from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import { dispatchParams } from "Shared/utils/params";
import { RESULT_PATH } from "Frontend/configs/paths";
import NoResult from "Frontend/components/NoResult";
import LoadingPage from "Frontend/components/LoadingPage";
import SORTING_OPTIONS from "Shared/constants/option-sorting";
import "./index.css";

let INIT_DATA = {
  data: [],
  itemCount: 0,
  message: null,
};
const PAGE_DISPLAY_LENGTH = 8;

function ResultContainer() {
  const [init, setInit] = useState(true);
  const [loading, setLoading] = useState(true);
  const [params, setParams] = useState();
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA);
  const [currentPage, setCurrentPage] = useState(0);
  const [sortingMode, setSortingMode] = useState(SORTING_OPTIONS[0].value)
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    // Init params from home page
    if (init) {
      if (location.state) {
        const initParams = location.state.params;
        setParams(initParams);

        history.replace({ pathname: RESULT_PATH, state: { params: null } });
      }
      setInit(false);
    }
  }, [init, history, location.state]);

  useEffect(() => {
    const fetchData = async () => {
      const searchParams = dispatchParams(params);
      const offset = PAGE_DISPLAY_LENGTH * currentPage;
      const { data, itemCount, error } = await searchJob(
        searchParams,
        PAGE_DISPLAY_LENGTH,
        offset,
        sortingMode
      );

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } });
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data, itemCount } });
      }
      setLoading(false);
    };

    if (loading) {
      setTimeout(() => {
        fetchData();
      }, 1000);
    }
  }, [loading, params, currentPage, sortingMode]);

  const _handleFilterChanged = (params) => {
    setParams(params);
    setLoading(true);
  };

  const _handlePageChanged = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true);
  };

  const _handleSortingChanged = (e) => {
    const mode = e.target.value

    setSortingMode(mode)
    setLoading(true);
  }

  const renderArea = (data) => {
    return data.districtAsso.name + " " + data.provinceAsso.name;
  };

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
      );
    }
  };

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
              {loading ? (
                <LoadingPage />
              ) : state.error ? (
                <p>{state.error}</p>
              ) : (
                <>
                  <div className="nav-sort">
                    <Row>
                      <Col lg={7}>
                        <p className="result-count">{`พบ ${state.itemCount} ตำแหน่งงาน`}</p>
                      </Col>
                      <Col md={5}>
                        <Input type="select" disabled={state.itemCount <= 0} onChange={_handleSortingChanged}>
                          {SORTING_OPTIONS.map((item, index) => (
                            <option key={index} value={item.value} selected={sortingMode === item.value}>
                              {item.text}
                            </option>
                          ))}
                        </Input>
                      </Col>
                    </Row>
                  </div>
                  <div className="result-list">
                    {renderPagination()}
                    {
                      <>
                        {state.data.length > 0 ? (
                          state.data.map((item, index) => (
                            <ListJobItem
                              key={index}
                              id={item.id}
                              title={item.position}
                              jobType={item.jobTypeAsso}
                              companyName={item.companyOwnerAsso.name}
                              logoUrl={
                                item.logoSourceUrl +
                                item.companyOwnerAsso.logoFile
                              }
                              amount={item.amount}
                              salaryTypeId={item.salaryType}
                              salaryTypeName={item.salaryTypeAsso.name}
                              salaryMin={item.salaryMin}
                              salaryMax={item.salaryMax}
                              area={renderArea(item)}
                              createdAt={item.createdAt}
                            />
                          ))
                        ) : (
                          <div className="no-result-container">
                            <NoResult />
                          </div>
                        )}
                      </>
                    }
                    {renderPagination()}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Page>
    </Template>
  );
}
export default ResultContainer;