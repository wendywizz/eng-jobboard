import React, { useState, useEffect, useContext, createContext } from "react";
import { sendPost } from "Shared/utils/request";

const authContext = createContext();

// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function AuthProvider({ children }) {
  const auth = useAuthProvider();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};

const ACCESS_TOKEN_KEY = "access_token"

// Get and Set AccessToken
function setAccessToken(value) {
  return localStorage.setItem(ACCESS_TOKEN_KEY, value)
}

/*function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}*/

function removeAccessToken() {
  return localStorage.removeItem(ACCESS_TOKEN_KEY)
}

// Provider hook that creates auth object and handles state
export default function useAuthProvider() {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const signIn = async(email, password) => {
    const uri = "http://localhost:3333/api/authen/signin"
    const bodyData = {
      email,
      password
    }
    const { status, message, accessToken, result } = await sendPost(uri, bodyData)
    if (status) {
      setAccessToken(accessToken)
      setUser(result)
      setIsAuthenticated(true)
    }
    return {
      status,
      message
    }
  };

  const signOut = () => {
    return removeAccessToken()
  };

  const signUpWithEmail = async(email, password, studentCode, cardNo) => {
    return await createUser(email, password, studentCode, cardNo)    
  };

  const signUpWithFaebook = async() => {
    createUser()
  }
  
  const signUpWithGoogle = async() => {
    createUser()
  }

  async function createUser(email, password, studentCode, cardNo) {    
    const uri = "http://localhost:3333/api/register/applicant/email"
    const bodyData = {
      email,
      password,
      student_code: studentCode,
      person_id: cardNo
    }
    return await sendPost(uri, bodyData)
  }

  const identifyStudent = async(studentCode, cardNo) => {
    const uri = "http://localhost:3333/api/register/identify-student"
    const bodyData = {
      std_code: studentCode,
      card_no: cardNo
    }
    return await sendPost(uri, bodyData);
  }

  const sendPasswordResetEmail = (email) => {
    
  };

  const confirmPasswordReset = (code, password) => {
   
  };

  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    /*const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });*/

    // Cleanup subscription on unmount
    //return () => unsubscribe();
    console.log('active')
  }, []);
  
  // Return the user object and auth methods
  return {
    user,
    isAuthenticated,
    signIn,
    signOut,
    signUpWithEmail,
    signUpWithFaebook,
    signUpWithGoogle,
    identifyStudent,
    sendPasswordResetEmail,
    confirmPasswordReset
  };
}