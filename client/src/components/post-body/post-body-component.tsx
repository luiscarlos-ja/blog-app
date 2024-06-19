import { useState } from "react";
import { Post } from "../../types";
import { PostBodyContent } from "../post-body-content/post-body-content.component";
import { PostComments } from "../post-comments/post-comments.components";

export function PostBody({ post }: { post: Post }) {
  const [showComments, setShowComments] = useState(false);
  return (
    <>
      <PostBodyContent post={post} setShowComments={setShowComments} />
      {showComments && <PostComments post={post} />}
    </>
  );
}
