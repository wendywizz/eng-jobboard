import React from "react";
import { Route } from "react-router-dom";
import TemplateEmployer from "Frontend/components/TemplateEmployer";
import { useAuth } from "Shared/context/AuthContext";

export default function EmployerRoute({ component: Component, ...rest }) {  
  const { isAuthenticated, authUser, authType } = useAuth()

  return (
    <TemplateEmployer>
      <Route
        {...rest}
        render={(props) => {
          return <Component {...props} />;
        }}
      ></Route>
    </TemplateEmployer>
  );
}
