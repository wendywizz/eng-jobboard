import React from "react"
import { Route, Redirect } from "react-router-dom"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"

export default function EmployerRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()

  const checkIfApplicant = () => {
    if (authUser) {
      return authType === EMPLOYER_TYPE
    } else {
      return false
    }
  }

  return (
    <Route
      {...rest}
      render={props => {
        return checkIfApplicant() ? <Component {...props} /> : <Redirect to="/" />
      }}
    ></Route>
  )
}