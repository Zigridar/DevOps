import React from 'react'
import {BrowserRouter} from 'react-router-dom'
import {useRouts} from './routs'
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {SnackbarProvider} from "notistack"

const App = () => {

    /** user session utils **/
    const { token, login, logout, userId, headers } = useAuth()

    /** is user authenticated now? **/
    const isAuthenticated = !!token

    /** create route switcher **/
    const routes = useRouts(isAuthenticated, logout)
      return (
          <AuthContext.Provider value={{
              token: token,
              login: login,
              logout: logout,
              headers: headers,
              userId: userId,
              isAuthenticated: isAuthenticated
          }}>
              <SnackbarProvider maxSnack={5}>
                  <BrowserRouter>
                      {routes}
                  </BrowserRouter>
              </SnackbarProvider>
          </AuthContext.Provider>
      )
}

export default App
