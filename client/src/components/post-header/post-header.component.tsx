import { useState } from "react";
import { PostAdd } from "../post-add/post-add.component";
import usePosts from "../../hooks/usePosts.hook";
import {
  AddPostButton,
  PostHeaderContainer,
  PostTitle,
  PostHeader as PostHeaderStyles,
} from "./post-header.styles";

export function PostHeader() {
  const [showAddPost, setShowAddPost] = useState(false);
  const { isLoading } = usePosts();

  const handleClickAddPost = () => {
    setShowAddPost((prev) => !prev);
  };

  return (
    <PostHeaderContainer>
      <PostHeaderStyles>
        <PostTitle>Posts</PostTitle>
        {!isLoading && (
          <AddPostButton onClick={handleClickAddPost}>Add Post</AddPostButton>
        )}
      </PostHeaderStyles>
      {showAddPost && <PostAdd setShowAddPost={setShowAddPost} />}
    </PostHeaderContainer>
  );
}
