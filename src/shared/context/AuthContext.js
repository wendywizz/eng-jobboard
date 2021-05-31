import React, { useContext, useState, useEffect } from "react"
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user"
import { createApplicant, createEmployer } from "Shared/states/user/UserDatasource"
import { getUserByCode } from "Shared/states/user/UserDatasource"
import { auth } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [ready, setReady] = useState(false)
  const [authUser, setAuthUser] = useState()
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

  async function createSession(fbUser) {
    const { data } = await getUserByCode(fbUser.uid)

    if (data) {
      const user = {
        localId: data.id,
        ...fbUser
      }
      setAuthUser(user)
      setAuthType(data.type)
    }
  }

  async function signin(email, password) {
    let rSuccess = false, rMessage = "Sign in failed"

    const fbUser = await signinFirebase(email, password)
    if (fbUser) {
      await createSession(fbUser)

      rSuccess = true
      rMessage = "Sign in success"
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
    async function setSession(fbUser) {
      await createSession(fbUser)
    }
    const unsubscribe = auth.onAuthStateChanged(user => {   
      if (user) {   
        setSession(user)
      }
    })

    return unsubscribe
  }, [])

  const values = {
    authUser,
    authType,
    signin,
    signupWithEmail,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
