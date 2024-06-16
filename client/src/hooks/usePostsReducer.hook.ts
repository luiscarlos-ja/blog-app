import { useReducer } from "react";
import { postsReducer, intialState } from "../reducers/posts.reducer";
import { Links, Post } from "../types";

export const usePostsReducer = () => {
  const [{ fetchUrl, isLoading, posts }, dispatch] = useReducer(
    postsReducer,
    intialState
  );

  const getPosts = async () => {
    if (fetchUrl === null) return;

    dispatch({ type: "posts/SET_IS_LOADING", payload: { isLoading: true } });
    fetch(fetchUrl)
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data as Post[];
        const links = data.links as Links;
        dispatch({
          type: "posts/SET_POSTS",
          payload: { posts, fetchUrl: links.next },
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

  return { getPosts, isLoading, posts };
};
