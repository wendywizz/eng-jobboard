import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "Shared/context/AuthContext"
import { HOME_PATH } from "Frontend/configs/paths"
import { EMPLOYER_TYPE } from "Shared/constants/user"
import TemplateEmployer from "Frontend/components/TemplateEmployer"
import BackToLoginContainer from "Frontend/containers/Public/ErrorContainer/BackToLoginContainer"

export default function EmployerRoute({ children, ...rest }) {
  const { isAuthenticated, ready, authType } = useAuth()

  const verifyRoute = () => {    
    if (isAuthenticated && (authType === EMPLOYER_TYPE)) {
      return true
    } else {
      return false
    }
  }

  return (
    <>
      {
        ready ? (
          <TemplateEmployer>
            <Route
              {...rest}
              render={() => {
                return verifyRoute() ? children : <Redirect to={HOME_PATH} />
              }}
            ></Route>
          </TemplateEmployer>
        ) : (
          <BackToLoginContainer />
        )
      }
    </>
  );
}
