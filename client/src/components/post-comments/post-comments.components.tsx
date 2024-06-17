import { useEffect } from "react";
import { Post } from "../../types";
import { useComments } from "../../hooks/useComments.hook";
import { PostCommentsBody } from "../post-comments-body/post-comments-body.component";
import { PostCommentsAdd } from "../post-comments-add/post-comments-add.component";

export function PostComments({ post }: { post: Post }) {
  const {
    comments,
    isLoading,
    getPostComments,
    createPostComment,
    deletePostComment,
    editPostComment,
  } = useComments({ post });

  useEffect(() => {
    getPostComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <p>Loading comments...</p>;
  }

  return (
    <section>
      <PostCommentsAdd createPostComment={createPostComment} />
      <ul>
        {comments.map((comment) => (
          <li key={comment.uuid}>
            <PostCommentsBody
              comment={comment}
              editPostComment={editPostComment}
              deletePostComment={deletePostComment}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
