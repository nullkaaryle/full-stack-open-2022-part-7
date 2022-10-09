import Bloglist from './Bloglist'
import NewBlog from './NewBlog'

const Blogview = ({ notify, user }) => {
  return (
    <div>
      <h2>BLOGS</h2>
      <NewBlog notify={notify} />
      <Bloglist user={user} notify={notify} />
    </div>
  )
}

export default Blogview
