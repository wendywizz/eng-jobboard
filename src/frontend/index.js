import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "Shared/context/AuthContext";
import { ToastProvider } from "react-toast-notifications";


import "jquery/dist/jquery";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "@fortawesome/fontawesome-free/css/all.css";
import "draft-js/dist/Draft.css";
import "rc-slider/assets/index.css";
import "./assets/css/style.css";
import { ApplicantRoute, EmployerRoute } from "./components/Route";
import { APPLICANT_PROFILE_PATH, APPLICANT_RESUME_PATH, APPLICANT_SETTING_PATH, DETAIL_PATH, EMPLOYER_JOB_ADD_PATH, EMPLOYER_JOB_EDIT_PATH, EMPLOYER_JOB_PATH, EMPLOYER_PROFILE_PATH, EMPLOYER_RESUME_PATH, EMPLOYER_SETTING_PATH, HOME_PATH, LOGIN_PATH, REGISTER_PATH, RESULT_PATH } from "./configs/paths";
import {
  EmprProfileContainer,
  EmprJobFormAddContainer,
  EmprJobFormEditContainer,
  EmprJobListContainer,
  EmprResumeContainer,
  EmprSettingContainer
} from "Frontend/containers/Employer"
import { DetailContainer, HomeContainer, LoginContainer, RegisterContainer, ResultContainer } from "./containers/Public";
import { ApcProfileContainer, ApcResumeContainer, ApcSettingContainer } from "./containers/Applicant";

function RouteApp() {  
  return (
    <Router>
      <Switch>               
        <Route path={HOME_PATH} component={HomeContainer} exact />
        <Route path={LOGIN_PATH} component={LoginContainer} exact />
        <Route path={REGISTER_PATH} component={RegisterContainer} exact />
        <Route path={RESULT_PATH} component={ResultContainer} />
        <Route path={DETAIL_PATH + "/:id"} component={DetailContainer} />
        <ApplicantRoute>
          <Route path={APPLICANT_PROFILE_PATH} component={ApcProfileContainer} exact />
          <Route path={APPLICANT_RESUME_PATH} component={ApcResumeContainer} exact />
          <Route path={APPLICANT_SETTING_PATH} component={ApcSettingContainer} exact />
        </ApplicantRoute>
        <EmployerRoute>
          <Route path={EMPLOYER_PROFILE_PATH} component={EmprProfileContainer} exact/>
          <Route path={EMPLOYER_JOB_ADD_PATH} component={EmprJobFormAddContainer} exact />
          <Route path={EMPLOYER_JOB_EDIT_PATH} component={EmprJobFormEditContainer} exact />
          <Route path={EMPLOYER_JOB_PATH} component={EmprJobListContainer} exact />
          <Route path={EMPLOYER_RESUME_PATH} component={EmprResumeContainer} exact />
          <Route path={EMPLOYER_SETTING_PATH} component={EmprSettingContainer} exact />
        </EmployerRoute>     
      </Switch>
    </Router>
  );
}

function Frontend() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-center"
    >
      <AuthProvider>
        <RouteApp />
      </AuthProvider>
    </ToastProvider>
  );
}
export default Frontend;
