import React from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http'
import { toast } from 'react-toastify'

const AuthPage = () => {
  const auth = React.useContext(AuthContext)
  const { loading, error, request, clearError } = useHttp()
  const [ credentials, setCredentials ] = React.useState({ email: '', password: '' })

  React.useEffect(() => {
    toast(error)
    clearError()
  }, [error, clearError])
  const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value })
  const handleSignUp = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...credentials })
      toast(data.message)
    } catch (e) {}
  }
  const handleSignIn = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...credentials })
      auth.login(data.token, data.userId)
      toast(data.message)
    } catch (e) {}
  }
  return (
    <div>
      <input id="email" placeholder="email" type="text" name="email" onChange={handleChange}/>
      <input id="password" placeholder="password" type="password" name="password"onChange={handleChange} />
      <button onClick={handleSignIn} disabled={loading}>Sign In</button>
      <button onClick={handleSignUp} disabled={loading}>Sign Up</button>
    </div>
  )
}
export default AuthPage;
