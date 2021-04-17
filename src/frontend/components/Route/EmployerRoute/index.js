import React from "react"
import { Route, Redirect } from "react-router-dom"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import { useAuth } from "Shared/context/AuthContext"
import TemplateEmployer from "Frontend/components/TemplateEmployer"
import { useEffect } from "react"

export default function EmployerRoute({ component: Component, ...rest }) {
  const { authUser, authType } = useAuth()
  const [validCredentials, setValidCredentials] = React.useState(false)

  const checkIfApplicant = () => {
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
          return checkIfApplicant() && <Component {...props} /> 
        }}
      ></Route>
    </TemplateEmployer>
  )
}