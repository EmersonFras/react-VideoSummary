import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from "react-router-dom"

import { useSelector } from "react-redux"
import { selectVideoById } from "./videosApiSlice"


const Video = ({ videoId }) => {
    const video = useSelector(state => selectVideoById(state, videoId));

    console.log(video)
    const navigate = useNavigate()

    if (video) {
        const created = new Date(video.createdAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })
        const updated = new Date(video.updatedAt).toLocaleString('en-US', { day: 'numeric', month: 'long' })

        const handleEdit = () => navigate(`/dash/videos/${videoId}`)

        return (
            <tr className="table__row">
                <td className="table__cell video__owner">{video.owner}</td>
                <td className="table__cell video__created">{created}</td>
                <td className="table__cell video__updated">{updated}</td>
                <td className="table__cell video__title">{video.title}</td>

                <td className={`table__cell`}>
                    <button className="icon-button table__button" onClick={handleEdit}>
                        <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                </td>
            </tr>
        )
    } else return null

}

export default Video