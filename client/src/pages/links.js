import React from 'react';
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/loader'

const LinksPage = () => {
  const [ links, setLinks ] = React.useState([])
  const { request, loading } = useHttp()
  const { token } = React.useContext(AuthContext)

  const fetchLinks = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link`, 'GET', null, { Authorization: `Bearer ${token}`})
      setLinks(fetched)
    } catch (e) {}
  }, [ token, request ])

  React.useEffect(() => { fetchLinks() }, [ fetchLinks ])

  if (loading) return <Loader />

  return (
  <>
    <ul>
      {links.map(l => <li><a href={l.to}>{l.from}</a></li>)}
    </ul>
    <pre>{JSON.stringify(links, null, 2)}</pre>
  </>
  )
}
export default LinksPage