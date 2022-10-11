import Blog from './Blog'

const Bloglist = ({ blogs }) => {
  const byLikesAndTitles = (a, b) =>
    b.likes - a.likes || a.title.localeCompare(b.title)

  const sortedBlogs = [...blogs].sort(byLikesAndTitles)

  return (
    <div>
      <div id="blogs">
        {sortedBlogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  )
}

export default Bloglist
