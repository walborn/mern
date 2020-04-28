import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'
import { useRoutes } from './routes'
import { ToastContainer } from 'react-toastify'
import { AuthContext } from './context/AuthContext'
import { useAuth } from './hooks/auth'
import Nav from './components/nav'
import Loader from './components/loader'
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  const { login, logout, token, userId, ready } = useAuth()
  const isAuthenticated = !!token
  const routes = useRoutes(isAuthenticated)
  if (!ready) return <Loader />
  return (
    <AuthContext.Provider value={{
      login, logout, token, userId, isAuthenticated 
    }}>
      <Router>
        {isAuthenticated && <Nav />}
        <ToastContainer />
        {routes}
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
