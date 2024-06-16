import usePosts from "../../hooks/usePosts.hook";
import { PostHeader } from "../../components/post-header/post-header.component";
import { PostBody } from "../../components/post-body/post-body-component";

export default function Posts() {
  const { posts, isLoading } = usePosts();

  return (
    <section>
      <PostHeader />
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <ul>
            {posts.map((post) => (
              <li key={post.uuid}>
                <PostBody post={post} />
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
