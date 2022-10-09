import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import Userlist from './Userlist'
import Blogview from './Blogview'
import { logoutUser } from '../reducers/userReducer'

const Blogs = ({ user, notify, notification }) => {
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(logoutUser())
    notify('good bye!')
  }

  const showLoggedUser = () => (
    <div>
      {user.name} logged in
      <button onClick={logout}>logout</button>
    </div>
  )

  const padding = {
    padding: 5
  }

  return (
    <Router>
      <div>
        <Link style={padding} to="/">
          BLOGS
        </Link>
        <Link style={padding} to="/users">
          USERS
        </Link>
      </div>

      <div> {showLoggedUser()}</div>

      <Routes>
        <Route
          path="/"
          element={
            <Blogview notify={notify} notification={notification} user={user} />
          }
        />
        <Route path="/users" element={<Userlist />} />
      </Routes>
    </Router>
  )
}

export default Blogs
