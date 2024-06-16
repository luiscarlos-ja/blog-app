import { useState } from "react";
import { PostAdd } from "../post-add/post-add.component";
import usePosts from "../../hooks/usePosts.hook";

export function PostHeader() {
  const [showAddPost, setShowAddPost] = useState(false);
  const { isLoading } = usePosts();

  const handleClickAddPost = () => {
    setShowAddPost((prev) => !prev);
  };

  return (
    <div>
      <h1>Posts</h1>
      {!isLoading && <button onClick={handleClickAddPost}>Add Post</button>}
      {showAddPost && <PostAdd />}
    </div>
  );
}
