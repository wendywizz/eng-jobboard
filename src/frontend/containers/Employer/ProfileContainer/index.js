import React, { useEffect, useReducer, useRef, useState } from "react"
import { Row, Col, Button, Spinner } from "reactstrap"
import Content, { ContentBody, ContentHeader } from "Frontend/components/Content"
import { useToasts } from "react-toast-notifications"
import FormCompany from "./_form"
import {
  getCompanyByOwner,
  saveCompany
} from "Shared/states/company/CompanyDatasource"
import CompanyReducer from "Shared/states/company/CompanyReducer"
import {
  READ_SUCCESS,
  READ_FAILED,
  SAVE_SUCCESS,
  SAVE_FAILED,
} from "Shared/states/company/CompanyType"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSave } from "@fortawesome/free-regular-svg-icons"
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons"

const OWNER_ID = 33
const INIT_DATA = {
  success: false,
  data: null,
  message: null
}
function ProfileFormContainer() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const refForm = useRef()
  const [state, dispatch] = useReducer(CompanyReducer, INIT_DATA)
  const { addToast } = useToasts()

  useEffect(() => {
    async function fetchData(id) {
      const { data, error } = await getCompanyByOwner(id)

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } })
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data } })
      }
      setLoading(false)
    }

    if (loading) {
      setTimeout(() => {
        fetchData(OWNER_ID)
      }, 1000)
    }
  }, [loading, state.data])

  const _handleCallback = (bodyData) => {
    setSaving(true)
    setTimeout(async () => {
      const { success, data, message, error } = await saveCompany(OWNER_ID, bodyData)

      if (success) {
        dispatch({ type: SAVE_SUCCESS, payload: { data, message } })
      } else {
        dispatch({ type: SAVE_FAILED, payload: { message, error } })
      }
      setSaving(false)
      responseMessage(success, message)
    }, 2000)
  }

  const responseMessage = (success, message) => {
    let type
    if (success) {
      type = "success"
    } else {
      type = "error"
    }

    addToast(message, { appearance: type })
  }

  return (
    <>
      {
        loading
          ? <Spinner />
          : (
            state.error
              ? <p>{state.error}</p>
              : (
                <Content className="content-tab">
                  <ContentHeader>
                    <Row>
                      <Col>
                        <h1 className="title">ข้อมูลบริษัท</h1>
                      </Col>
                      <Col style={{ textAlign: "right" }}>
                        <Button color="primary" onClick={() => refForm.current.submit()} disabled={saving}>
                          {
                            saving ? (
                              <>
                                <FontAwesomeIcon icon={faCircleNotch} spin />
                                <span>{" "}กำลังบันทึก</span>
                              </>
                            ) : (
                              <>
                                <FontAwesomeIcon icon={faSave} />
                                <span>{" "}บันทึก</span>
                              </>
                            )
                          }
                        </Button>
                      </Col>
                    </Row>
                  </ContentHeader>
                  <ContentBody padding={false}>
                    <FormCompany
                      ref={refForm}
                      editing={true}
                      id={state.data.id}
                      name={state.data.name}
                      logoPath={state.data.logoPath}
                      about={state.data.about}
                      address={state.data.address}
                      province={state.data.province}
                      district={state.data.district}
                      postCode={state.data.postCode}
                      phone={state.data.phone}
                      website={state.data.website}
                      email={state.data.email}
                      facebook={state.data.facebook}
                      onSubmit={_handleCallback}
                    />
                  </ContentBody>
                </Content>
              )
          )
      }
    </>
  )
}
export default ProfileFormContainer