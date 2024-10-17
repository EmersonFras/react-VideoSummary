import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Public from './components/Public'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import VideosList from './features/videos/VideosList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import EditVideo from './features/videos/EditVideo'
import NewVideo from './features/videos/NewVideoForm'
import Prefetch from './features/auth/Prefetch'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Public />} />
        <Route path="login" element={<Login />} /> 
        
        <Route element={<Prefetch />}>
          <Route path="dash" element={<DashLayout />}>
          
            <Route index element={<Welcome />} />

            
            <Route path="users">
              <Route index element={<UsersList />} />
              <Route path=":id" element={<EditUser />} />
              <Route path="new" element={<NewUserForm />} />
            </Route>

            <Route path="videos">
              <Route path=":userId" element={<VideosList />} />
              <Route path=":id" element={<EditVideo />} />
              <Route path="new" element={<NewVideo />} />
            </Route>
          </Route>



        </Route>{/* End DashLayout */}
      </Route>{/* End Layout */}
    </Routes>
  )
}

export default App;
