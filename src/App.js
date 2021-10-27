import { useEffect, useState } from "react";
import PostsList from "./components/PostsList/PostsList";
import Form from "./components/Form/Form";

function App() {
  const [posts, setPosts] = useState([]);
  const [postsLoading, setPostsLoading] = useState(true);
  const [editingMode, setEditingMode] = useState(false);
  const [targetPost, setTargetPost] = useState();

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(data => setPosts(data.slice(0, 3)))
      .then(() => setPostsLoading(false));
  }, []);

  function handlePostClick(e) {
    if (e.target.matches('.post__btn')) {
      setEditingMode(true);
      setTargetPost(() => posts.find(post => post.uniqueId === +e.target.dataset.id || post.id === +e.target.dataset.id));
      document.querySelectorAll('.post').forEach(btn => btn.classList.remove('post--active'));
      e.target.closest('.post').classList.add('post--active');
    }
  }

  return (
    <div className="row">
      {postsLoading ? <strong>Posts are loading...</strong> : <PostsList handlePostClick={handlePostClick} data={posts} />}
      <Form setPosts={setPosts} editingMode={editingMode} setEditingMode={setEditingMode} targetPost={targetPost} />
    </div>
  )
}

export default App;
