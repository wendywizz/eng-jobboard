import React from "react";
import { Route, Redirect } from "react-router-dom";
import TemplateEmployer from "Frontend/components/TemplateEmployer";
import { useAuth } from "Shared/context/AuthContext";
import { HOME_PATH } from "Frontend/configs/paths";
import { EMPLOYER_TYPE } from "Shared/constants/user";

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
          <div>
            <h1>Please to to login</h1>
          </div>
        )
      }
    </>
  );
}
