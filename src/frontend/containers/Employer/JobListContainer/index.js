import React, { useState, useEffect, useReducer } from "react";
import {
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
  ListGroup,
  ListGroupItem,
  ButtonGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Content, {
  ContentHeader,
  ContentBody,
  ContentFooter,
} from "Frontend/components/Content";
import useQuery from "Shared/utils/hook/useQuery";
import {
  EMPLOYER_JOB_ADD_PATH,
  EMPLOYER_JOB_EDIT_PATH,
  EMPLOYER_JOB_PATH,
} from "Frontend/configs/paths";
import { ALL, ACTIVE, INACTIVE } from "Shared/constants/employer-job-status";
import {
  deleteJob,
  getJobOfCompany
} from "Shared/states/job/JobDatasource";
import JobReducer from "Shared/states/job/JobReducer";
import { READ_SUCCESS, READ_FAILED } from "Shared/states/job/JobType";
import { useCompany } from "Shared/context/CompanyContext";
import LoadingPage from "Frontend/components/LoadingPage";
import JobTypeTag from "Frontend/components/JobTypeTag";
import { formatFullDate } from "Shared/utils/datetime";
import { ModalConfirm } from "Frontend/components/Modal";
import "./index.css";

const PAGE_DISPLAY_LENGTH = 5;
let INIT_DATA = {
  data: null,
  message: null,
};
function JobListContainer() {
  const query = useQuery();
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState();
  const [currentPage, setCurrentPage] = useState(0);
  const [state, dispatch] = useReducer(JobReducer, INIT_DATA);
  const { companyId } = useCompany();

  const getData = async (id) => {
    const offset = PAGE_DISPLAY_LENGTH * currentPage;
    const { data, itemCount, error } = await getJobOfCompany(
      id,
      PAGE_DISPLAY_LENGTH,
      offset,
      selectedStatus
    );

    if (error) {
      dispatch({ type: READ_FAILED, payload: { error } });
    } else {
      dispatch({ type: READ_SUCCESS, payload: { data, itemCount } });
    }
    setLoading(false);
  };

  useEffect(() => {
    const status = query.get("status");
    if (status) {
      setSelectedStatus(status);
    } else {
      setSelectedStatus(ALL);
    }
  }, [selectedStatus, query]);

  useEffect(() => {
    if (loading) {
      if (companyId) {
        setTimeout(() => {
          getData(companyId);
        }, 1000);
      }
    }

    /*return () => {
      INIT_DATA = {
        ...state
      }
    }*/
  }, [loading, companyId, currentPage]);

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

  const _handlePageChanged = ({ selected }) => {
    setCurrentPage(selected);
    setLoading(true);
  };

  /*const _handleChangeActive = async (e, id) => {
    //const isActive = e.target.value === "on" ? 1 : 0
    //await setActiveJob(id, isActive).then(() => console.log('remove success'))
  };*/

  const _handleRemove = async (id) => {
    await deleteJob(id).then(() => {
      window.location.reload()
    })
  };

  return (
    <Content className="content-empr-joblist">
      <ContentHeader title="จัดการงาน">
        <Row>
          <Col>
            <Nav className="nav-status">
              <NavItem className={selectedStatus === ALL ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + ALL}>
                  ทั้งหมด
                </NavLink>
              </NavItem>
              <NavItem className={selectedStatus === ACTIVE ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + ACTIVE}>
                  กำลังรับสมัคร
                </NavLink>
              </NavItem>
              <NavItem className={selectedStatus === INACTIVE ? "active" : ""}>
                <NavLink href={EMPLOYER_JOB_PATH + "?status=" + INACTIVE}>
                  ปิดรับสมัคร
                </NavLink>
              </NavItem>
            </Nav>
          </Col>
          <Col className="text-right">
            <Link className="btn btn-primary" to={EMPLOYER_JOB_ADD_PATH}>
              <FontAwesomeIcon icon={faPlus} /> เพิ่มงานใหม่
            </Link>
          </Col>
        </Row>
      </ContentHeader>
      <ContentBody box={false} padding={false}>
        {loading ? (
          <LoadingPage />
        ) : state.error ? (
          <p>{state.error}</p>
        ) : (
          <ListGroup className="list-group-job">
            {state.data.map((item, index) => (
              <ListGroupItem key={index} className="list-group-jobitem">
                <div className="detail">
                  <div className="job-type">
                    <JobTypeTag
                      type={item.jobTypeAsso.id}
                      label={item.jobTypeAsso.name}
                    />
                  </div>
                  <span className="title">{item.position}</span>
                  <span className="amount">{`จำนวนรับ ${item.amount} ตำแหน่ง`}</span>
                  <span className="deadline">{`สิ้นสุดวันที่ ${formatFullDate(
                    item.expired_at
                  )}`}</span>
                </div>
                <div className="action">
                  <div className="view">
                    <ButtonGroup>
                      <Link
                        to={`${EMPLOYER_JOB_EDIT_PATH}/${item.id}`}
                        className="btn btn-outline-primary"
                      >
                        แก้ไข
                      </Link>
                      <ModalConfirm
                        buttonText="ลบ"
                        title="ลบข้อมูล"
                        text={`ยืนยันการลบข้อมูลงาน?<br /><b>${item.position}</b>`}
                        keyboard={false}
                        onSubmit={() => _handleRemove(item.id)}
                      />
                    </ButtonGroup>
                  </div>
                </div>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </ContentBody>
      <ContentFooter>{renderPagination()}</ContentFooter>
    </Content>
  );
}
export default JobListContainer;
