import { store } from '../../app/store'
import { videosApiSlice } from '../videos/videosApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'

const Prefetch = () => {
  const { id } = useParams()

  useEffect(() => {
    const videos = store.dispatch(videosApiSlice.endpoints.getVideos.initiate(id))
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
        console.log('unsubscribing')
        videos.unsubscribe()
        users.unsubscribe()
    }
  }, [id])

  return <Outlet />
}

export default Prefetch