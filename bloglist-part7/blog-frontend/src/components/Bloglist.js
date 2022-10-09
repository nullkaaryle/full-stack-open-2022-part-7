import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Blog from './Blog'

import {
  addLikeToBlog,
  initializeBlogs,
  deleteBlog
} from '../reducers/blogReducer'

const Bloglist = ({ user, notify }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  const blogs = useSelector(({ blogs }) => {
    return blogs
  })

  const byLikesAndTitles = (a, b) =>
    b.likes - a.likes || a.title.localeCompare(b.title)

  const sortedBlogs = [...blogs].sort(byLikesAndTitles)

  const likeBlog = async (id) => {
    const blog = blogs.find((b) => b.id === id)

    const likedBlog = {
      ...blog,
      likes: (blog.likes || 0) + 1,
      user: blog.user.id
    }

    dispatch(addLikeToBlog(likedBlog)).then(() => {
      notify(`you liked '${likedBlog.title}' by ${likedBlog.author}`)
    })
  }

  const removeBlog = (id) => {
    const toRemove = blogs.find((b) => b.id === id)

    const ok = window.confirm(
      `remove '${toRemove.title}' by ${toRemove.author}?`
    )

    if (!ok) {
      return
    }

    dispatch(deleteBlog(id)).then(() => {
      notify('blog was succesfully removed')
    })
  }

  return (
    <div>
      <div id="blogs">
        {sortedBlogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={likeBlog}
            removeBlog={removeBlog}
            user={user}
          />
        ))}
      </div>
    </div>
  )
}

export default Bloglist
