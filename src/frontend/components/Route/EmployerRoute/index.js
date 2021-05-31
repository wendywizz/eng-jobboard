import React from "react"
import { Route, Redirect } from "react-router-dom"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import TemplateEmployer from "Frontend/components/TemplateEmployer"

export default function EmployerRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()

  const checkIfEmployer = () => {
    if (authUser) {
      return authType === EMPLOYER_TYPE
    } else {
      return false
    }
  }
  console.log('auth=', authUser)
  return (
    <>
      {
        authUser ? (
          <TemplateEmployer>
            <Route
              {...rest}
              render={props => {
                return checkIfEmployer() ? <Component {...props} /> : <Redirect to="/" />
              }}
            ></Route>
          </TemplateEmployer>
        ) : (
          <div />
        )
      }
    </>
  )
}