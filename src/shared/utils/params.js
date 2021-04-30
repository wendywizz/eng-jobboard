import { PARAM_AREA, PARAM_CATEGORY, PARAM_KEYWORD, PARAM_SALARY, PARAM_TYPE } from "Shared/constants/option-filter"

function createQueryString(inputParams) {
  const params = {}

  if (inputParams) {
    if (inputParams[PARAM_AREA]) {
      const province = inputParams[PARAM_AREA].province
      const district = inputParams[PARAM_AREA].district

      params[PARAM_AREA] = province + (district && "-" + district)
    }

    if (inputParams[PARAM_CATEGORY] && (inputParams[PARAM_CATEGORY] !== "*")) {
      if (inputParams[PARAM_CATEGORY].length > 0) {
        const pamCategory = inputParams[PARAM_CATEGORY]

        if (Array.isArray(pamCategory)) {
          let strPams = ""

          pamCategory.forEach((value, index) => {
            if (index === 0) {
              strPams = value
            } else {
              strPams = strPams + "-" + value
            }
          })
          params[PARAM_CATEGORY] = strPams
        } else {
          params[PARAM_CATEGORY] = pamCategory
        }
      }
    }

    if (inputParams[PARAM_KEYWORD]) {
      params[PARAM_KEYWORD] = inputParams[PARAM_KEYWORD]
    }

    if (inputParams[PARAM_TYPE]) {
      params[PARAM_TYPE] = inputParams[PARAM_TYPE]
    }

    if (inputParams[PARAM_SALARY]) {
      const salaryMax = inputParams[PARAM_SALARY].max
      const salaryMin = inputParams[PARAM_SALARY].min

      if (salaryMax && salaryMin) {
        params[PARAM_SALARY] = salaryMax + "-" + salaryMin
      } else if (salaryMax) {
        params[PARAM_SALARY] = salaryMax
      }
    }

    return new URLSearchParams(params).toString()
  } else {
    return null
  }
}

function serializeParams(obj) {
  if (obj) {
    const params = {}

    if (obj[PARAM_KEYWORD]) {
      params.keyword = obj[PARAM_KEYWORD]
    }
    if (obj[PARAM_CATEGORY]) {
      params.category = obj[PARAM_CATEGORY]
    }
    if (obj[PARAM_TYPE]) {
      params.type = obj[PARAM_TYPE]
    }
    if (obj[PARAM_AREA]) {
      const areaArr = obj[PARAM_AREA].split("_")

      if (areaArr.length > 1) {
        params.province = areaArr[0]
        params.district = areaArr[1]
      } else if (areaArr.length === 1) {
        params.province = areaArr[0]
      }
    }
    if (obj[PARAM_SALARY]) {
      const salaryArr = obj[PARAM_SALARY].split("_")

      if (salaryArr.length > 1) {
        params.salary_max = salaryArr[0]
        params.salary_min = salaryArr[1]
      } else if (salaryArr.length === 1) {
        params.salary_max = salaryArr[0]
        params.salary_min = 0
      }
    }

    return params
  } else {
    return null
  }
}

export {
  createQueryString,
  serializeParams
}