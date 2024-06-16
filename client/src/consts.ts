export const GLOBAL = {
  API_URL: import.meta.env.VITE_API_URL,
};

export const POSTS_ACTION_TYPES = {
  SET_POSTS: "posts/SET_POSTS",
  SET_IS_LOADING: "posts/SET_IS_LOADING",
  SET_FETCH_URL: "posts/SET_FETCH_URL",
} as const;
