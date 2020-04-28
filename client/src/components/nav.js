import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export default () => {
  const history = useHistory()
  const auth = React.useContext(AuthContext)

  const handleLogout = () => {
    auth.logout()
    history.push('/')
  }
  return (
    <ul>
      <li><NavLink to="/create">Create link</NavLink></li>
      <li><NavLink to="/links">Links</NavLink></li>
      <li onClick={handleLogout}>Exit</li>
    </ul>
  )
}