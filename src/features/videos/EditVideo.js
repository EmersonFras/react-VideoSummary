import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from './videosApiSlice'
import EditVideoForm from './EditVideoForm'


const EditVideo = () => {
    const { id, videoId } = useParams()
    const video = useSelector((state) => {
        console.log(state)
        return selectVideoById(id)(state)(videoId)
    });

    const content = video ? <EditVideoForm video={video} /> : <p>Loading...</p>

    return content
}

export default EditVideo