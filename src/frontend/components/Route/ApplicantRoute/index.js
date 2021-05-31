import React from "react"
import { Route, Redirect } from "react-router-dom"
import { APPLICANT_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import TemplateApplicant from "Frontend/components/TemplateApplicant"

export default function ApplicantRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()  

  const checkIfApplicant = () => {
    console.log('AUTH user=', authUser)
    if (authUser) {
      return authType === APPLICANT_TYPE
    } else {
      return false
    }
  }
console.log('work=', authUser)
  return (
    <>
      {
        authUser ? (
          <TemplateApplicant>
            <Route
              {...rest}
              render={props => {
                return checkIfApplicant() ? <Component {...props} /> : <div>TEST</div>
              }}
            ></Route>
          </TemplateApplicant>
        ) : (
          <div />
        )
      }
    </>
  )
}