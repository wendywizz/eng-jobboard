import { PARAM_AREA, PARAM_CATEGORY, PARAM_KEYWORD, PARAM_SALARY, PARAM_TYPE } from "Shared/constants/option-filter"

function dispatchParams(obj) {
  if (obj) {
    const params = {}

    if (obj[PARAM_KEYWORD]) {
      params.keyword = obj[PARAM_KEYWORD]
    }
    if (obj[PARAM_TYPE] && (obj[PARAM_TYPE] !== "*")) {
      params.type = obj[PARAM_TYPE]
    }
    if (obj[PARAM_CATEGORY] && (obj[PARAM_CATEGORY] !== "*")) {
      params.category = obj[PARAM_CATEGORY]
    }
    if (obj[PARAM_AREA]) {
      const { province, district } = obj[PARAM_AREA]

      if (province) {
        params.province = province
      }
      if (district) {
        params.district = district
      }
    }
    if (obj[PARAM_SALARY]) {
      const { min, max } = obj[PARAM_SALARY]

      if (min) {
        params.salary_min = min
      }
      if (max) {
        params.salary_max = max
      }
    }

    return params
  } else {
    return null
  }
}

export {
  dispatchParams
}