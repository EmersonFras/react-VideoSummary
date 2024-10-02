import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse } from '@fortawesome/free-solid-svg-icons'
import { useNavigate, useLocation } from "react-router-dom"

const DashHeader = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()
  
  const onGoHomeClicked = () => navigate('/dash')

  let goHomeButton = <div className="dash-header__button"></div>
  if (pathname !== '/dash') {
      goHomeButton = (
          <button 
          className="dash-header__button icon-button" 
          title="Home"
          onClick={onGoHomeClicked} 
          >
              <FontAwesomeIcon icon={faHouse} />
          </button>
      )   
  }

  const content = (
    <header className="dash-header">
        <div className="dash-header__container">
          {goHomeButton}  
            <Link to="/dash" className="dash-header__title">
                <h1 className="dash-header__title">Videos</h1>
            </Link>
            <nav className="dash-header__nav">
                {/* {add nav buttons later} */}
            </nav>
        </div>
    </header>
  )

  return content
}

export default DashHeader