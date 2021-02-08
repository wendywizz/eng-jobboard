import React from "react"
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom"
import TemplateEmployer from "./components/TemplateEmployer"
import { EMPLOYER_PATH } from "./configs/paths"
import routes from "./configs/routes"

import "./assets/css/style.css"
import "./assets/css/theme/greyson.css"


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
                        var RouteTemplate = null

                        switch (value.basePath) {
                          case EMPLOYER_PATH:
                            
                            RouteTemplate =
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
                            break;
                          default:
                            RouteTemplate =
                              <Route
                                key={index}
                                path={match.path + route.path}
                                exact={route.exact}
                                name={route.name}
                                render={() => <route.component />}
                              />
                            break;
                        }

                        console.log(<Route />)

                        return route.component ? (
                          <RouteTemplate />
                        ) : null;
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