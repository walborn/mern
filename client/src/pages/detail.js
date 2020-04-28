import React from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useHttp } from '../hooks/http'
import { AuthContext } from '../context/AuthContext'
import Loader from '../components/loader'

const DetailPage = () => {
  // const history = useHistory()
  const auth = React.useContext(AuthContext)
  const { request, loading } = useHttp()
  const [ link, setLink ] = React.useState(null)
  const linkId = useParams().id

  const getLink = React.useCallback(async () => {
    try {
      const fetched = await request(`/api/link/${linkId}`, 'GET', null, { Authorization: `Bearer ${auth.token}`})
      setLink(fetched)
    } catch (e) {}
  }, [ auth.token, request, linkId ])

  React.useEffect(() => { getLink() }, [ getLink ])
  
  if (loading) return <Loader />
  
  return <pre>{JSON.stringify(link, null, 2)}</pre>
}

export default DetailPage
