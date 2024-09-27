import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <div>
            <h1>Public</h1>
            <p>This is a public page</p>
            <Link to="/login">Login</Link>
        </div>
    )

    return content
}

export default Public