export const GLOBAL = {
  API_URL: import.meta.env.VITE_API_URL,
};

export const POSTS_ACTION_TYPES = {
  SET_POSTS: "posts/SET_POSTS",
  SET_IS_LOADING: "posts/SET_IS_LOADING",
  SET_FETCH_URL: "posts/SET_FETCH_URL",
} as const;

export const COMMENTS_ACTION_TYPES = {
  SET_COMMENTS: "comments/SET_COMMENTS",
  SET_IS_LOADING: "comments/SET_IS_LOADING",
  SET_FETCH_URL: "comments/SET_FETCH_URL",
} as const;
