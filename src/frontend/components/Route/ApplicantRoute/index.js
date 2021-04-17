import React from "react"
import { Route, Redirect } from "react-router-dom"
import { APPLICANT_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import TemplateApplicant from "Frontend/components/TemplateApplicant"

export default function EmployerRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()

  const checkIfEmployer = () => {
    if (authUser) {
      return authType === APPLICANT_TYPE
    } else {
      return false
    }
  }

  return (
    <TemplateApplicant>
      <Route
        {...rest}
        render={props => {
          return checkIfEmployer() ? <Component {...props} /> : <Redirect to="/" />
        }}
      ></Route>
    </TemplateApplicant>
  )
}