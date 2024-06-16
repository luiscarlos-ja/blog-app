import usePosts from "../../hooks/usePosts.hook";

export default function Posts() {
  const { posts, loading } = usePosts();

  return (
    <section>
      <h1>Posts</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.uuid}>
              <div>
                <h2>{post.name}</h2>
                <small>@{post.user.username}</small>
              </div>
              <small>
                created at {new Date(post.createdAt).toLocaleDateString()}
              </small>
              <p>{post.content}</p>
              <div>
                <button>Edit</button>
                <button>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
