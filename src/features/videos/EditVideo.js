import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectVideoById } from './videosSlice'
import EditVideoForm from './EditVideoForm'


const EditVideo = () => {
    const { id } = useParams()
    const video = useSelector(state => selectVideoById(state, id))

    content = video ? <EditVideoForm video={video} /> : <p>Loading...</p>

    return content
}

export default EditVideo