import { useEffect, useRef, useState } from 'react';
import './Form.css';

function Form({ setPosts, editingMode, setEditingMode, targetPost }) {
  const titleRef = useRef();
  const bodyRef = useRef();
  const [postAdding, setPostAdding] = useState(false);
  const [submitButtonText, setSubmitButtonText] = useState('Add post');

  useEffect(() => {
    if (editingMode) {
      setSubmitButtonText('Edit post');
      titleRef.current.value = targetPost.title;
      bodyRef.current.value = targetPost.body;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editingMode, targetPost])

  function handleEditPost(e) {
    e.preventDefault();

    if (titleRef.current.value.trim()) {
      setPostAdding(true);
      setSubmitButtonText('Editing...');

      fetch(`https://jsonplaceholder.typicode.com/posts/${targetPost.uniqueId || targetPost.id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          title: titleRef.current.value,
          body: bodyRef.current.value,
          uniqueId: targetPost.uniqueId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then(patchedPost => {
          setPosts(posts => {
            let patchedPostIndex = posts.findIndex(post => post === targetPost);
            return [
              ...posts.slice(0, patchedPostIndex),
              patchedPost,
              ...posts.slice(patchedPostIndex + 1)
            ]
          })
        })
        .then(() => {
          setEditingMode(false);
          setPostAdding(false);
          setSubmitButtonText('Add post');
          e.target.reset();
          document.querySelectorAll('.post').forEach(btn => btn.classList.remove('post--active'));
        })
    }
  }

  function handleAddPost(e) {
    e.preventDefault();

    if (titleRef.current.value.trim()) {
      setPostAdding(true);
      setSubmitButtonText('Adding...');

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title: titleRef.current.value,
          body: bodyRef.current.value,
          uniqueId: Math.floor(Math.random() * 100) + 100
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(newPost => setPosts(posts => (
          [
            newPost,
            ...posts
          ]
        )))
        .then(() => {
          setPostAdding(false);
          setSubmitButtonText('Add post');
          e.target.reset();
        });
    }
  }

  return (
    <form onSubmit={editingMode ? handleEditPost : handleAddPost} className="form" action="#" method="POST">
      <input ref={titleRef} className="form__input" placeholder="Post title" type="text" minLength="3" required />
      <textarea ref={bodyRef} className="form__input textarea" placeholder="Post description" minLength="5" required />
      <button className="form__btn" type="submit" disabled={postAdding}>{submitButtonText}</button>
    </form>
  )
}

export default Form;