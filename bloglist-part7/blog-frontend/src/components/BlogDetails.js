import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const BlogButtons = ({ blog, likeBlog, removeBlog, commentBlog, own }) => {
  const navigate = useNavigate()
  const [comment, setComment] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    commentBlog({ id: blog.id, comment })
    setComment('')
  }
  return (
    <div>
      <div>
        <button onClick={() => likeBlog(blog.id)}>like this blog</button>
      </div>
      <div>
        {own && (
          <button onClick={() => navigate('/') || removeBlog(blog.id)}>
            remove this blog
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            value={comment}
            onChange={({ target }) => setComment(target.value)}
            id="comment"
            placeholder="your comment of the blog"
          />
        </div>
        <button id="create-comment" type="submit">
          add comment
        </button>
      </form>
    </div>
  )
}

const BlogDetails = ({ blogs, likeBlog, removeBlog, commentBlog, user }) => {
  const id = useParams().id
  const blog = blogs.find((n) => n.id === id)
  const addedBy = blog.user && blog.user.name ? blog.user.name : 'anonymous'
  const own = blog.user && user.username === blog.user.username

  if (!blog) {
    return null
  }

  return (
    <div>
      <h3>{blog.title}</h3>
      <p>
        <b>blog author:</b> {blog.author}
      </p>
      <div>
        <b> blog url:</b>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <p>
        blog has <b>{blog.likes}</b> likes
      </p>
      <p>
        blog was added by: <b>{addedBy}</b>
      </p>
      <p>
        blog comments:
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment}>
              <b> {comment} </b>
            </li>
          ))}
        </ul>
      </p>
      <BlogButtons
        blog={blog}
        likeBlog={likeBlog}
        removeBlog={removeBlog}
        commentBlog={commentBlog}
        own={own}
      />
    </div>
  )
}

export default BlogDetails
