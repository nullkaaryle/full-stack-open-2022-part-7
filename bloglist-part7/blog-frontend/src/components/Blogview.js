import Bloglist from './Bloglist'
import NewBlog from './NewBlog'

const Blogview = ({ blogs, notify }) => {
  return (
    <div>
      <h2>BLOGS</h2>
      <NewBlog notify={notify} />
      <Bloglist blogs={blogs} />
    </div>
  )
}

export default Blogview
