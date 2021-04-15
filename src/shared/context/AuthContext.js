import React, { useContext, useState, useEffect } from "react"
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user"
import { createApplicant, createEmployer, getUserByCode } from "Shared/states/user/UserDatasource"
import { getCompanyByOwner } from "Shared/states/company/CompanyDatasource"
import { auth } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [authUser, setAuthUser] = useState()
  const [authCompany, setAuthCompany] = useState()
  const [authType, setAuthType] = useState()

  async function signupWithEmail(email, password, userType, additional) {
    let success = false, message = "Create user failed", error = null

    await auth.createUserWithEmailAndPassword(email, password)
      .then(res => {
        // Create user on local database
        const uid = res.user.uid
        switch (userType) {
          // Create new Applicant
          case APPLICANT_TYPE:
            const { studentCode, personNo } = additional
            createApplicant(uid, email, studentCode, personNo)
            break;
          // Create new Employer
          case EMPLOYER_TYPE:
            createEmployer(uid, email)
            break
          default:
            break
        }
        success = true
        message = "Create user successed"
      })
      .catch(e => {
        error = e.message
      })

    return {
      success,
      message,
      error
    }
  }

  async function settingSession(code, fbUser) {
    let rSuccess = false, rMessage = null

    const { data, message, error } = await getUserByCode(code)
    if (data) {
      const authUser = {
        localId: data.id,
        userType: data.type,
        ...fbUser
      }
      setAuthType(data.type)
      setAuthUser(authUser)

      // If logged in user is employer get company id
      if (data.type === EMPLOYER_TYPE) {
        const cData = await getCompanyByOwner(data.id)

        if (cData) {
          setAuthCompany(cData.data)
        }
      }

      rSuccess = true
    } else {
      if (error) {
        rMessage = error
      } else {
        rMessage = message
      }
      signout()
    }

    return {
      success: rSuccess,
      message: rMessage
    }
  }

  async function signin(email, password) {
    let rSuccess = false, rMessage = "Sign in failed"

    const fbUser = await signinFirebase(email, password)
    const code = fbUser.uid

    if (code) {
      const { success, message } = settingSession(code, fbUser)
      rSuccess = success
      rMessage = message
    }

    return {
      success: rSuccess,
      message: rMessage
    }
  }

  async function signinFirebase(email, password) {
    return await auth.signInWithEmailAndPassword(email, password)
      .then(res => res.user)
      .catch(e => {
        console.log(e.message)
      })
  }

  function signout() {
    setAuthUser(null)
    setAuthType(null)

    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return authUser.updateEmail(email)
  }

  function updatePassword(password) {
    return authUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setAuthUser(user)
    })

    return unsubscribe
  }, [])

  const value = {
    authUser,
    authCompany,
    authType,
    signin,
    signupWithEmail,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
