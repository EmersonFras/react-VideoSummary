import { Link } from 'react-router-dom'

const Welcome = () => {
    
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date)

    const content = (
        <section className="welcome">
            <p>{today}</p>

            <h1>Weclome!</h1>

            <p><Link to="/dash/videos">View Videos</Link></p>
            <p><Link to="/dash/videos/new">Add Video</Link></p>
            <p><Link to="/dash/users">View User Settings</Link></p>
            <p><Link to="/dash/users/new">Add User</Link></p>

        </section>
    )

    return content
}

export default Welcome