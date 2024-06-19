import { useState } from "react";
import { PostAdd } from "../post-add/post-add.component";
import usePosts from "../../hooks/usePosts.hook";
import { PostHeaderContainer, PostTitle } from "./post-header.styles";

export function PostHeader() {
  const [showAddPost, setShowAddPost] = useState(false);
  const { isLoading } = usePosts();

  const handleClickAddPost = () => {
    setShowAddPost((prev) => !prev);
  };

  return (
    <PostHeaderContainer>
      <PostTitle>Posts</PostTitle>
      {!isLoading && <button onClick={handleClickAddPost}>Add Post</button>}
      {showAddPost && <PostAdd setShowAddPost={setShowAddPost} />}
    </PostHeaderContainer>
  );
}
