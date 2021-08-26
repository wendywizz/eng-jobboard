import React from "react"
import { Route, Redirect } from "react-router-dom"
import { APPLICANT_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import { HOME_PATH } from "Frontend/configs/paths";
import TemplateApplicant from "Frontend/components/TemplateApplicant"

export default function ApplicantRoute({ children, ...rest }) {
  const { isAuthenticated, ready, authType } = useAuth()

  const verifyRoute = () => {
    if (isAuthenticated && (authType === APPLICANT_TYPE)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {
        ready ? (
          <TemplateApplicant>
            <Route
              {...rest}
              render={() => {
                return verifyRoute() ? children : <Redirect to={HOME_PATH} />
              }}
            ></Route>
          </TemplateApplicant>
        ) : (
          <div>
            <h1>Please to to login</h1>
          </div>
        )
      }
    </>
  )
}