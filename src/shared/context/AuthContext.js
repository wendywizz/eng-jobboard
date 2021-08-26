import { apiEndpoint } from "Frontend/configs/uri";
import React, { useEffect, useContext, useState } from "react";
import { APPLICANT_TYPE, EMPLOYER_TYPE } from "Shared/constants/user";
import {
  createApplicant,
  createEmployer,
} from "Shared/states/user/UserDatasource";
import { sendGet, sendPost } from "Shared/utils/request";

const AuthContext = React.createContext();
const TOKEN_KEY_NAME = 'token'

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [authUser, setAuthUser] = useState();
  const [authType, setAuthType] = useState();
  const [ready, setReady] = useState(false)

  async function signupWithEmail(email, password, userType, additional) {
    let success = false,
      message = "Create user failed",
      error = null;

    switch (userType) {
      // Create new Applicant
      case APPLICANT_TYPE:
        const { studentCode, personNo } = additional;
        await createApplicant(email, password, studentCode, personNo);
        break;
      // Create new Employer
      case EMPLOYER_TYPE:
        await createEmployer(email, password);
        break;
      default:
        break;
    }

    return {
      success,
      message,
      error,
    };
  }

  async function signin(email, password) {
    return await signinWithJWT(email, password)
      .then((res) => res.json())
      .then((result) => {
        const { success, data, token, message } = result;
        
        if (result.success) {
          setAccessToken(token)
          createSession(data);
        }
        return { success, message };
      });
  }

  async function signinWithJWT(email, password) {
    const uri = `${apiEndpoint}authen/signin`
    const bodyData = { email, password }

    return await sendPost(uri, bodyData)
  }

  function createSession(data) {
    if (data) {
      setAuthType(data.type);
      setAuthUser(data);
      setIsAuthenticated(true)
      setReady(true)
    }
  }

  async function signout() {    
    clearAccessToken()

    setAuthUser(null)
    setAuthType(null)
    setIsAuthenticated(false)
  }

  useEffect(() => {
    async function verifyToken() {
      const token = getAccessToken()    
      const HEADERS = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + process.env.AUTHORIZE_TOKEN,
        "x-access-token": token,
        "mode": "cors",
      };
      await sendGet(`${apiEndpoint}authen/user-info`, null, HEADERS )
        .then((res) => res.json())
        .then(result => {
          if (result.success) {
            createSession(result.data);
          }
        })
    }    
    verifyToken()

    return () => {
      setAuthUser(null)
      setAuthType(null)
      setIsAuthenticated(false)
      setReady(false)
    }
  }, []);

  function setAccessToken(token) {
    localStorage.setItem(TOKEN_KEY_NAME, token);
  }

  function getAccessToken() {
    return localStorage.getItem(TOKEN_KEY_NAME)
  }

  function clearAccessToken() {    
    localStorage.removeItem(TOKEN_KEY_NAME)
  }

  const values = {
    isAuthenticated,
    authUser,
    authType,
    ready,
    signupWithEmail,
    signin,        
    signout
  }

  return (
    <AuthContext.Provider value={values}>
      {children}
    </AuthContext.Provider>
  )
}
