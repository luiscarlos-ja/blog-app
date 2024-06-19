import usePosts from "../../hooks/usePosts.hook";
import { PostHeader } from "../../components/post-header/post-header.component";
import { PostBody } from "../../components/post-body/post-body-component";
import {
  PostList,
  PostListContent,
  PostListItem,
  PostLoading,
  PostsContainer,
} from "./posts.styles";

export default function Posts() {
  const { posts, isLoading } = usePosts();

  return (
    <PostsContainer>
      <PostHeader />
      {isLoading ? (
        <PostLoading>Loading...</PostLoading>
      ) : (
        <PostListContent>
          <PostList>
            {posts.map((post) => (
              <PostListItem key={post.uuid}>
                <PostBody post={post} />
              </PostListItem>
            ))}
          </PostList>
        </PostListContent>
      )}
    </PostsContainer>
  );
}
