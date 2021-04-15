import React, { useContext, useEffect, useState } from "react"
import { getCompanyByOwner } from "Shared/states/company/CompanyDatasource"
import { useAuth } from "./AuthContext"

const CompanyContext = React.createContext()

export function useCompany() {
  return useContext(CompanyContext)
}

export function CompanyProvider({ children }) {
  const [loaded, setLoaded] = useState(false)
  const [companyID, setCompanyID] = useState()
  const {authUser} = useAuth()

  async function getData(id) {
    const { data } = await getCompanyByOwner(id)
    if (data) {
      setCompanyID(data.id)
      setLoaded(true)
    }
  }

  useEffect(() => {
    if (!loaded && authUser) {
      const ownerID = authUser.localID
      getData(ownerID)
    }
  }, [authUser, loaded])

  const value = {
    companyID
  }

  return (
    <CompanyContext.Provider value={value}>
      {children}
    </CompanyContext.Provider>
  )
}