import { useReducer } from "react";
import { postsReducer, intialState } from "../reducers/posts.reducer";
import { Links, Post } from "../types";
import { GLOBAL } from "../consts";

export const usePostsReducer = () => {
  const [{ fetchUrl, isLoading, posts }, dispatch] = useReducer(
    postsReducer,
    intialState
  );

  const getPosts = async () => {
    if (fetchUrl === null) return;

    dispatch({ type: "posts/SET_IS_LOADING", payload: { isLoading: true } });
    fetch(fetchUrl, { credentials: "include" })
      .then((response) => response.json())
      .then((data) => {
        const fetchedPosts = data.data as Post[];
        const links = data.links as Links;
        const newPosts = [...posts, ...fetchedPosts];
        dispatch({
          type: "posts/SET_POSTS",
          payload: { posts: newPosts, fetchUrl: links.next },
        });
      })
      .finally(() => {
        dispatch({
          type: "posts/SET_IS_LOADING",
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error("Error fetching posts", error);
      });
  };

  const createPost = async (formData: FormData) => {
    dispatch({ type: "posts/SET_IS_LOADING", payload: { isLoading: true } });
    fetch(`${GLOBAL.API_URL}/users/94b660e2-e0f7-4419-8eee-3033ba6010c1/post`, {
      method: "POST",
      body: formData,
      credentials: "include",
    })
      .then((data) => data.json())
      .then((response) => {
        const newPost = response as Post;
        const newPosts = [newPost, ...posts];
        dispatch({
          type: "posts/SET_POSTS",
          payload: { posts: newPosts, fetchUrl: intialState.fetchUrl },
        });
      })
      .finally(() => {
        dispatch({
          type: "posts/SET_IS_LOADING",
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error("Error creating post", error);
      });
  };

  const editPost = async (uuid: string, formData: FormData) => {
    fetch(
      `${GLOBAL.API_URL}/users/94b660e2-e0f7-4419-8eee-3033ba6010c1/post/${uuid}`,
      {
        method: "PATCH",
        body: formData,
        credentials: "include",
      }
    )
      .then((data) => data.json())
      .then((response) => {
        const updatedPost = response[0] as Post;
        const newPosts = posts.map((post) => {
          if (post.uuid === updatedPost.uuid) {
            return {
              ...post,
              name: updatedPost.name,
              content: updatedPost.content,
            };
          } else {
            return post;
          }
        });
        dispatch({
          type: "posts/SET_POSTS",
          payload: { posts: newPosts, fetchUrl: fetchUrl },
        });
      })
      .catch((error) => {
        console.error("Error updating post", error);
      });
  };

  const deletePost = async (uuid: string) => {
    dispatch({ type: "posts/SET_IS_LOADING", payload: { isLoading: true } });
    fetch(
      `${GLOBAL.API_URL}/users/94b660e2-e0f7-4419-8eee-3033ba6010c1/post/${uuid}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
      .then(() => {
        const newPosts = posts.filter((post) => post.uuid !== uuid);
        dispatch({
          type: "posts/SET_POSTS",
          payload: { posts: newPosts, fetchUrl: intialState.fetchUrl },
        });
      })
      .finally(() => {
        dispatch({
          type: "posts/SET_IS_LOADING",
          payload: { isLoading: false },
        });
      })
      .catch((error) => {
        console.error("Error deleting post", error);
      });
  };

  return { createPost, getPosts, deletePost, editPost, isLoading, posts };
};
