import './Post.css';

function Post({title, body, id}) {
  return (
    <li className={"posts__item post"}>
      <h3 className="post__title">{title}</h3>
      <p className="post__body">{body}</p>
      <button className="post__btn" type="button" data-id={id}></button>
    </li>
  )
}

export default Post;