import React from "react"
import {  Route } from "react-router-dom"
import routes from "./configs/routes"

import "./assets/css/style.css"
import "./assets/css/theme/greyson.css"

function Frontend() {
  return (
    <>
      {
        routes.map((value, index) => {
          return (
            <Route key={index} path={value.path} component={value.component} {...value} />
          )
        })
      }
    </>
  )
}
export default Frontend