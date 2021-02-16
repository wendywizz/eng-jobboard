import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import TemplateEmployer from "./components/TemplateEmployer"
import TemplateApplicant from "./components/TemplateApplicant"
import { EMPLOYER_PATH, APPLICANT_PATH } from "./configs/paths"
import routes from "./configs/routes"

import "draft-js/dist/Draft.css";
import "./assets/css/theme/greyson.css"
import "./assets/css/style.css"

function Frontend() {
  return (
    <Router>
      <Switch>
        {
          routes.map((value, index) => (
            value.children && value.children.length > 0
              ? (
                <Route key={index} path={value.basePath} render={({ match }) => {
                  return (
                    <Switch>
                      {value.children.map((route, index) => {
                        if (route.component) {
                          switch (value.basePath) {
                            case EMPLOYER_PATH:
                              return (
                                <Route
                                  key={index}
                                  path={match.path + route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={() =>
                                    <TemplateEmployer>
                                      <route.component />
                                    </TemplateEmployer>}
                                />
                              )
                            case APPLICANT_PATH:
                              return (
                                <Route
                                  key={index}
                                  path={match.path + route.path}
                                  exact={route.exact}
                                  name={route.name}
                                  render={() =>
                                    <TemplateApplicant>
                                      <route.component />
                                    </TemplateApplicant>}
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
                        } else {
                          return false
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
      </Switch>
    </Router>
  )
}
export default Frontend