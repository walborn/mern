import React from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http'
import { AuthContext } from '../context/AuthContext'


const CreatePage = () => {
  const history = useHistory()
  const auth = React.useContext(AuthContext)
  const { request } = useHttp()
  const [ link, setLink ] = React.useState(null)
  const handleKeyPress = async (e) => {
    if (e.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate',
          'POST',
          { from: link },
          { Authorization: `Bearer ${auth.token}`},
        )
        console.log(data)
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  }
  return (
    <div>
      <label htmlFor="link">Введите ссылку</label>
      <input
        id="link"
        type="text"
        placeholder="insert link"
        value={link}
        onChange={e => setLink(e.target.value)}
        onKeyPress={handleKeyPress}
      />
    </div>
  )
}

export default CreatePage
