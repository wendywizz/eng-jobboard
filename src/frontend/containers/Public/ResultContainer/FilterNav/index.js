import React from "react"
import _ from "lodash"
import ButtonFilter from "Frontend/components/Filter/ButtonFilter";
import "./index.css"
import { PARAM_AREA, PARAM_CATEGORY, PARAM_KEYWORD, PARAM_SALARY, PARAM_TYPE } from "Shared/constants/option-filter";

export default function FilterNav({ params }) {
  const renderFilter = () => {
    if (params) {
      let stackParams = []

      _.forEach(params, (param, key) => {
        if (param) {
          switch (key) {
            case PARAM_KEYWORD:
              stackParams.push(<ButtonFilter text={param} />)
              break
            case PARAM_TYPE:
              stackParams.push(<ButtonFilter text={param} />)
              break
            case PARAM_CATEGORY:              
              break
            case PARAM_AREA:              
              break
            case PARAM_SALARY:              
              break
            default:
              break
          }
        }
      })

      return (
        <div className="nav-filter">
          { stackParams.map((item, index) => <div key={index}>{item}</div>)}
        </div>
      )
    } else {
      return <div />
    }
  }

  return renderFilter()
}