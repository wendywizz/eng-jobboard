import React from "react";
import { Route, Redirect } from "react-router-dom"
import { APPLICANT_TYPE } from "Shared/constants/user"
import { HOME_PATH } from "Frontend/configs/paths"
import { useAuth } from "Shared/context/AuthContext";
import BackToLoginContainer from "Frontend/containers/Public/ErrorContainer/BackToLoginContainer"

export default function ApplicantRoute({ children, ...rest }) {
  const { isAuthenticated, ready, authType } = useAuth();

  const verifyRoute = () => {
    if (isAuthenticated && authType === APPLICANT_TYPE) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <>
      {ready ? (
        <Route
          {...rest}
          render={() => {
            return verifyRoute() ? children : <Redirect to={HOME_PATH} />;
          }}
        ></Route>
      ) : (
        <BackToLoginContainer />
      )}
    </>
  );
}
