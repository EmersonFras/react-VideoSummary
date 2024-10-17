import { store } from '../../app/store'
import { videosApiSlice } from '../videos/videosApiSlice'
import { usersApiSlice } from '../users/usersApiSlice'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const Prefetch = () => {
  useEffect(() => {
    const videos = store.dispatch(videosApiSlice.endpoints.getVideos.initiate())
    const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())

    return () => {
        console.log('unsubscribing')
        videos.unsubscribe()
        users.unsubscribe()
    }
  }, [])

  return <Outlet />
}

export default Prefetch