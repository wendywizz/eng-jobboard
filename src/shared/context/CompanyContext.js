import React, { useContext, useEffect, useState } from "react"
import { getCompanyByOwner } from "Shared/states/company/CompanyDatasource"
import { useAuth } from "./AuthContext"

const CompanyContext = React.createContext()

export function useCompany() {
  return useContext(CompanyContext)
}

export function CompanyProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [companyId, setCompanyId] = useState()
  const {authUser} = useAuth()

  async function getData(id) {
    const { data } = await getCompanyByOwner(id)
    if (data) {
      setCompanyId(data.id)
      setLoaded(true)
    }
  }

  useEffect(() => {
    if (!loaded && authUser) {
      const ownerId = authUser.localId
      getData(ownerId)
    }
  }, [authUser, loaded])

  const value = {
    companyId
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}