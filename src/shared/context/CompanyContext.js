import React, { useContext, useEffect, useState } from "react"
import { getCompanyByOwner } from "Shared/states/company/CompanyDatasource"
import { useAuth } from "./AuthContext"

const CompanyContext = React.createContext()

export function useCompany() {
  return useContext(CompanyContext)
}

export function CompanyProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [companyId, setCompanyId] = useState()
  const {authUser} = useAuth()

  async function getData(id) {
    const { data } = await getCompanyByOwner(id)
    if (data) {
      setCompanyId(data.id)
      setReady(true)
    }
  }

  useEffect(() => {    
    if (!ready && authUser) {            
      const ownerId = authUser.id
      getData(ownerId)
    }
  }, [authUser, ready])

  const values = {
    companyId
  }

  return (
    <CompanyContext.Provider value={values}>
      {children}
    </CompanyContext.Provider>
  )
}