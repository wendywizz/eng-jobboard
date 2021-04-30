import React, { useState, useEffect } from "react"
import { DialogAreaFilter } from "Frontend/components/Filter"
import { PARAM_AREA } from "Shared/constants/option-filter"
import { getDistrict, getProvince } from "Shared/states/area/AreaDatasource"

export default function AreaOption({ defaultValue, onChange }) {
  const [defaultProvince, setDefaultProvince] = useState()
  const [defaultDistrict, setDefaultDistrict] = useState()

  const fetchProvince = async (id) => {
    const { data, error } = await getProvince(id)
    if (!error) {
      setDefaultProvince(data)
    }
  }

  const fetchDistrict = async (id) => {
    const { data, error } = await getDistrict(id)
    if (!error) {
      setDefaultDistrict(data)
    }
  }

  const _handleAreaSelected = (value) => {
    const type = PARAM_AREA

    if (value) {
      onChange(type, value)
    }
  }

  useEffect(() => {
    if (defaultValue) {
      if (defaultValue.province) {
        fetchProvince(defaultValue.province)
      }
      if (defaultValue.district) {
        fetchDistrict(defaultValue.district)
      }
    }
  }, [defaultValue])

  return (
    <DialogAreaFilter
      defaultProvinceValue={defaultProvince}
      defaultDistrictValue={defaultDistrict}
      onSelected={_handleAreaSelected} 
    />
  )
}

