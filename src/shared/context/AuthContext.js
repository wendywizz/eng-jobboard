import React, { useContext, useState, useEffect } from "react"
import { createApplicant, createEmployer } from "Shared/states/user/UserDatasource"
import { auth } from "../../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  async function signupWithEmail(email, password, userType, additional) {
    let success = false, message = "Create user failed", error = null

    await auth.createUserWithEmailAndPassword(email, password)
      .then(data => {
        const uid = data.user.uid

        switch (userType) {          
          // Create new Applicant
          case 1:
            const { studentCode, personNo } = additional
            createApplicant(uid, email, studentCode, personNo)
            break;
          // Create new Employer
          case 2:
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

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
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
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const value = {
    currentUser,
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
