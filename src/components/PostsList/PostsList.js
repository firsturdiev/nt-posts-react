import './PostsList.css';
import Post from '../Post/Post';

function PostsList({ data, handlePostClick }) {
  return (
    <ul className="posts" onClick={handlePostClick}>
      {
        data.map(post => (
          <Post
            title={post.title}
            body={post.body}
            id={post.uniqueId || post.id}
            key={post.uniqueId || post.id}
          />
        ))
      }
    </ul>
  )
}

export default PostsList;