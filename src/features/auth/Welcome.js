import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const Welcome = () => {
    const { id } = useParams()
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
            <p>{today}</p>

            <h1>Weclome!</h1>

            <p><Link to={`/dash/${id}/videos?userId=${id}`}>View Videos</Link></p>
            <p><Link to={`/dash/${id}/videos/new`}>Add Video</Link></p>
            <p><Link to={`/dash/${id}/users`}>View User Settings</Link></p>
            <p><Link to={`/dash/${id}/users/new`}>Add User</Link></p>

        </section>
    )

    return content
}

export default Welcome