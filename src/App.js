import React, { useState, useEffect } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './routes-nav/Navigation'
import Routes from './routes-nav/Routes'
import UserContext from './auth/UserContext'
import JoblyApi from './api/api'
import useLocalStorage from './hooks/useLocalStorage'
import jwt from "jsonwebtoken"
import LoadingSpinner from './common/LoadingSpinner'

export const TOKEN_STORAGE_ID = 'jobly-token'

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false)
  const [appIds, setAppIds] = useState(new Set([]))
  const [currUser, setCurrUser] = useState(null)

  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID)

  useEffect(function loadUserInfo() {
    async function getCurrUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token)
          JoblyApi.token = token
          let currUser = await JoblyApi.getCurrentUser(username)

          setCurrUser(currUser)
          setAppIds(new Set(currUser.applications))
        }
        catch (err) {
          setCurrUser(null);
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false)
    getCurrUser()
  }, [token])

  function logout() {
    setCurrUser(null)
    setToken(null)
  }

  async function signup(signupData) {
    try {
      let token = await JoblyApi.signup(signupData)
      setToken(token)
      return { success: true }
    }
    catch (err) {
      return { success: false, err }
    }
  }

  async function login(loginData) {
    try {
      let token = await JoblyApi.login(loginData)
      setToken(token)
      return { success: true }
    }
    catch (err) {
      return { success: false, err }
    }
  }

  function hasAppliedToJob(id) {
    return appIds.has(id)
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return
    JoblyApi.applyToJob(currUser.username, id)
    setAppIds(new Set([...appIds, id]))
  }

  if (!infoLoaded) return <LoadingSpinner />

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ currUser, setCurrUser, hasAppliedToJob, applyToJob }}>
        <div className="App">
          <Navigation logout={logout} />
          <Routes login={login} signup={signup} />
        </div>
      </UserContext.Provider>
    </BrowserRouter>
  )
}

export default App