import usePosts from "../../hooks/usePosts.hook";
import { PostHeader } from "../../components/post-header/post-header.component";
import { PostBody } from "../../components/post-body/post-body-component";
import { PostsContainer } from "./posts.styles";

export default function Posts() {
  const { posts, isLoading } = usePosts();

  return (
    <PostsContainer>
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
    </PostsContainer>
  );
}
