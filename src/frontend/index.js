import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { AuthProvider } from "Shared/context/AuthContext"
import { ToastProvider } from "react-toast-notifications"
import { APPLICANT_PATH, EMPLOYER_PATH } from "./configs/paths"
import { ApplicantRoute, EmployerRoute } from "./components/Route"
import routes from "./configs/routes"

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
        {
          routes.map((value, index) => (
            value.children && value.children.length > 0
              ? (
                <Route key={index} path={value.basePath} render={({ match }) =>
                  <Switch>
                    {value.children.map((route, index) => {
                      switch (value.basePath) {
                        case APPLICANT_PATH:
                          return (
                            <ApplicantRoute
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              component={route.component}
                            />
                          )
                        case EMPLOYER_PATH:
                          return (
                            <EmployerRoute
                              key={index}
                              path={route.path}
                              exact={route.exact}
                              name={route.name}
                              component={route.component}
                            />
                          )
                        default:
                          return (
                            <Route
                              key={index}
                              path={match.path + route.path}
                              exact={route.exact}
                              name={route.name}
                              component={route.component}
                            />
                          )
                      }
                    })}
                  </Switch>
                } />
              ) : (
                <Route key={index} path={value.path} component={value.component} {...value} />
              )
          ))
        }
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
      <AuthProvider>
        <RouteApp />
      </AuthProvider>
    </ToastProvider>
  )
}
export default Frontend