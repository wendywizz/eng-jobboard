import React from "react";
import { Route, Redirect } from "react-router-dom";
import TemplateEmployer from "Frontend/components/TemplateEmployer";
import { useAuth } from "Shared/context/AuthContext";
import { HOME_PATH } from "Frontend/configs/paths";

export default function EmployerRoute({ component: Component, ...rest }) {  
  const { isAuthenticated, authUser, authType } = useAuth()

  return (
    <TemplateEmployer>
      <Route
        {...rest}
        render={(props) => {
          return isAuthenticated ? <Component {...props} /> : <Redirect to={HOME_PATH} />
        }}
      ></Route>
    </TemplateEmployer>
  );
}
