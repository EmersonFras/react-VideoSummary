
import { useGetVideosQuery } from './videosApiSlice'
import Video from './Video'
import { useParams } from 'react-router-dom'

const VideosList = () => {

  const { userId } = useParams()

  const {
    data: videos,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetVideosQuery(userId)

  let content

  if (isLoading) content = <p>Loading...</p>

  if(isError) {
    content = <p className="errmsg">{error?.data?.message}</p>
  }


  if (isSuccess) {
    const { ids } = videos
    
    const tableContent = ids?.length ? ids.map(videoId => <Video key={videoId} videoId={videoId} />) : null

    content = (
      <table className="table table--videos">
        <thead className="table__thead">
          <tr>
            <th scope="col" className="table__thvideo__status">Username</th>
            <th scope="col" className="table__thvideo__created">Created</th>
            <th scope="col" className="table__thvideo__updated">Updated</th>
            <th scope="col" className="table__thvideo__title">Title</th>
            <th scope="col" className="table__thvideo__edit">Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
    )

  }

  return content
}

export default VideosList