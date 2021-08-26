import React, { useEffect, useReducer, useRef, useState } from "react"
import { Row, Col, Button } from "reactstrap"
import Content, { ContentBody, ContentHeader } from "Frontend/components/Content"
import { useToasts } from "react-toast-notifications"
import FormCompany from "./_form"
import {
  getCompanyItem,
  saveCompanyByOwner
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
import { useCompany } from "Shared/context/CompanyContext"
import { useAuth } from "Shared/context/AuthContext"
import LoadingPage from "Frontend/components/LoadingPage"

let INIT_DATA = {
  data: null,
  message: null
}
function ProfileFormContainer() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const refForm = useRef()
  const [state, dispatch] = useReducer(CompanyReducer, INIT_DATA)
  const { companyId } = useCompany()
  const { authUser } = useAuth()
  const { addToast } = useToasts()

  useEffect(() => {
    async function fetchData(id) {
      const { data, error } = await getCompanyItem(id)

      if (error) {
        dispatch({ type: READ_FAILED, payload: { error } })
      } else {
        dispatch({ type: READ_SUCCESS, payload: { data } })
      }
      setLoading(false)
    }

    if (loading) {
      if (companyId) {
        setTimeout(() => {
          fetchData(companyId)
        }, 1000)
      }
    }

    return () => {
      INIT_DATA = {
        ...state
      }
    }
  })

  const _handleCallback = (bodyData) => {
    setSaving(true)
    setTimeout(async () => {
      const ownerId = authUser.id
      const { success, data, message, error } = await saveCompanyByOwner(ownerId, bodyData)

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
          ? <LoadingPage />
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
                    {
                      state.data && (
                        <FormCompany
                          ref={refForm}
                          editing={true}
                          id={state.data.id}
                          name={state.data.name}
                          logoUrl={state.data.logoUrl}
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
                      )
                    }
                  </ContentBody>
                </Content>
              )
          )
      }
    </>
  )
}
export default ProfileFormContainer