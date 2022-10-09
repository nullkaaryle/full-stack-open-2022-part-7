import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { initializeUsers } from '../reducers/usersReducer'

const Userlist = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(({ users }) => {
    return users
  })

  const countBlogs = (user) => {
    return user.blogs.length
  }

  return (
    <div>
      <h2>USERS</h2>

      <table>
        <tbody>
          <tr>
            <td></td>
            <td>
              <b>blogs created</b>
            </td>
          </tr>

          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{countBlogs(user)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Userlist
