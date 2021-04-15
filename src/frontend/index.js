import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import { ToastProvider } from "react-toast-notifications"
import { AuthProvider } from "Shared/context/AuthContext"
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
        <AuthProvider>
          {
            routes.map((value, index) => (
              value.children && value.children.length > 0
                ? (
                  <Route key={index} path={value.basePath} render={({ match }) => {
                    return (
                      <Switch>
                        {value.children.map((route, index) => (
                          <Route
                            key={index}
                            path={match.path + route.path}
                            exact={route.exact}
                            name={route.name}
                            render={() => <route.component />}
                          />
                        ))}
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