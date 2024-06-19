import { useEffect } from "react";
import { Post } from "../../types";
import { useComments } from "../../hooks/useComments.hook";
import { PostCommentsBody } from "../post-comments-body/post-comments-body.component";
import { PostCommentsAdd } from "../post-comments-add/post-comments-add.component";
import {
  PostCommentsContainer,
  PostCommentsList,
  PostCommentsListItem,
  PostCommentsLoading,
} from "./post-comments.styles";

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
    return <PostCommentsLoading>Loading comments...</PostCommentsLoading>;
  }

  return (
    <PostCommentsContainer>
      <PostCommentsAdd createPostComment={createPostComment} />
      <PostCommentsList>
        {comments.map((comment) => (
          <PostCommentsListItem key={comment.uuid}>
            <PostCommentsBody
              comment={comment}
              editPostComment={editPostComment}
              deletePostComment={deletePostComment}
            />
          </PostCommentsListItem>
        ))}
      </PostCommentsList>
    </PostCommentsContainer>
  );
}
