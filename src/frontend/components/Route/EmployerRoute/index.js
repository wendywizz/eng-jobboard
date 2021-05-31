import React, { useState, useEffect } from "react"
import { Route } from "react-router-dom"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import TemplateEmployer from "Frontend/components/TemplateEmployer"

export default function EmployerRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()
  const [validCredentials, setValidCredentials] = useState(false)

  const checkIfEmployer = () => {
    if (validCredentials && authUser) {
      return authType === EMPLOYER_TYPE
    } else {
      return false
    }
  }

  useEffect(() => {
    if (authUser) {
      setValidCredentials(true)
    }
  }, [authUser])
  
  return (
    <TemplateEmployer>
      <Route
        {...rest}
        render={props => {
          return checkIfEmployer() && <Component {...props} /> 
        }}
      ></Route>
    </TemplateEmployer>
  )
}