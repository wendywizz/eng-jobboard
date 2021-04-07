import React, { useContext, useState, useEffect } from "react"
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user"
import { createApplicant, createEmployer, getUserType } from "Shared/states/user/UserDatasource"
import { auth } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [authType, setAuthType] = useState()
  const [loading, setLoading] = useState(true)

  async function signupWithEmail(email, password, userType, additional) {
    let success = false, message = "Create user failed", error = null

    await auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        // Create user on local database
        const uid = data.user.uid
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

  async function login(email, password) {
    let success = false, message = "Create user failed", error = null

    await auth.signInWithEmailAndPassword(email, password)
      .then(() => {
        success = true
        message = "Sign in success"
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

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    async function fetchAuthType(code) {
      const { data } = await getUserType(code)

      if (data) {
        setAuthType(data.user_type)
      }
    }

    const unsubscribe = auth.onAuthStateChanged(user => {      
      if (!authType && user) {
        fetchAuthType(user.uid)
      }
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
    authType,
    login,
    signupWithEmail,
    logout,
    resetPassword,
    updateEmail,
    updatePassword
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
