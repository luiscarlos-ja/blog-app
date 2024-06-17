import { Comment, Links, Post } from "../types";
import { GLOBAL } from "../consts";
import { commentsReducer, intialState } from "../reducers/comments.reducer";
import { useReducer } from "react";

export const useComments = ({ post }: { post: Post }) => {
  const [{ fetchUrl, isLoading, comments }, dispatch] = useReducer(
    commentsReducer,
    {
      ...intialState,
      fetchUrl: `${GLOBAL.API_URL}/posts/${post.uuid}/comment`,
    }
  );
  const getPostComments = async (): Promise<void> => {
    if (fetchUrl === null) return;

    dispatch({ type: "comments/SET_IS_LOADING", payload: { isLoading: true } });
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        const fetchedComments = data.data as Comment[];
        const links = data.links as Links;
        const newComments = [...comments, ...fetchedComments];
        dispatch({
          type: "comments/SET_COMMENTS",
          payload: { comments: newComments, fetchUrl: links.next },
        });
      })
      .finally(() => {
        dispatch({
          type: "comments/SET_IS_LOADING",
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error("Error fetching comments", error);
      });
  };

  const createPostComment = async (formData: FormData): Promise<void> => {
    fetch(`${GLOBAL.API_URL}/posts/${post.uuid}/comment`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then((response) => {
        const newComment = response as Comment;
        const newComments = [newComment, ...comments];
        dispatch({
          type: "comments/SET_COMMENTS",
          payload: { comments: newComments, fetchUrl: intialState.fetchUrl },
        });
      })
      .catch((error) => {
        console.error("Error creating comment", error);
      });
  };

  const editPostComment = async (
    commentId: string,
    formData: FormData
  ): Promise<void> => {
    fetch(`${GLOBAL.API_URL}/posts/${post.uuid}/comment/${commentId}`, {
      method: "PATCH",
      body: formData,
    })
      .then((data) => data.json())
      .then((response) => {
        const updatedComment = response[0] as Comment;
        const newComments = comments.map((comment) => {
          if (comment.uuid === updatedComment.uuid) {
            return { ...comment, content: updatedComment.content };
          } else {
            return comment;
          }
        });
        dispatch({
          type: "comments/SET_COMMENTS",
          payload: { comments: newComments, fetchUrl: fetchUrl },
        });
      })
      .catch((error) => {
        console.error("Error updating comment", error);
      });
  };

  const deletePostComment = async (commentId: string) => {
    fetch(`${GLOBAL.API_URL}/posts/${post.uuid}/comment/${commentId}`, {
      method: "DELETE",
    })
      .then(() => {
        const newComments = comments.filter(
          (comment) => comment.uuid !== commentId
        );
        dispatch({
          type: "comments/SET_COMMENTS",
          payload: { comments: newComments, fetchUrl: intialState.fetchUrl },
        });
      })
      .catch((error) => {
        console.error("Error deleting comment", error);
      });
  };

  return {
    fetchUrl,
    isLoading,
    comments,
    getPostComments,
    createPostComment,
    editPostComment,
    deletePostComment,
  };
};
