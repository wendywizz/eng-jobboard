import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"
import { AuthProvider } from "Shared/context/AuthContext"
import routes from "./configs/routes"
import { APPLICANT_PATH, EMPLOYER_PATH } from "./configs/paths"
import TemplateApplicant from "./components/TemplateApplicant"
import TemplateEmployer from "./components/TemplateEmployer"

import "jquery/dist/jquery"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.min.js"
import "@fortawesome/fontawesome-free/css/all.css";
import "draft-js/dist/Draft.css";
import "./assets/css/style.css"

function RouteApp() {
  return (
    <Router>
      <Switch>
        <AuthProvider>
          {
            routes.map((value, index) => (
              value.children && value.children.length > 0
                ? (
                  <Route key={index} path={value.basePath} render={({ match }) => {
                    return (
                      <Switch>
                        {value.children.map((route, index) => {                       
                          switch (value.basePath) {
                            case APPLICANT_PATH:                              
                              return (
                                <Route
                                  key={index}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={() =>
                                    <TemplateApplicant>
                                      <route.component />
                                    </TemplateApplicant>
                                  }
                                />
                              )
                            case EMPLOYER_PATH:
                              return (
                                <Route
                                  key={index}
                                  path={route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={() =>
                                    <TemplateEmployer>
                                      <route.component />
                                    </TemplateEmployer>
                                  }
                                />
                              )
                            default:
                              return (
                                <Route
                                  key={index}
                                  path={match.path + route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={() => <route.component />}
                                />
                              )
                          }

                        })}
                      </Switch>
                    )
                  }} />
                ) : (
                  <Route key={index} path={value.path} component={value.component} {...value} />
                )
            ))
          }
        </AuthProvider>
      </Switch>
    </Router>
  )
}

function Frontend() {
  return (
    <ToastProvider
      autoDismiss
      autoDismissTimeout={3000}
      placement="bottom-center"
    >
      <RouteApp />
    </ToastProvider>
  )
}
export default Frontend