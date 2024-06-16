import { GLOBAL, POSTS_ACTION_TYPES } from "../consts";
import { Post } from "../types";

export interface PostsState {
  posts: Post[];
  isLoading: boolean;
  fetchUrl: string | null;
}

export const intialState: PostsState = {
  posts: [],
  isLoading: false,
  fetchUrl: `${GLOBAL.API_URL}/posts`,
};

type Action =
  | {
      type: typeof POSTS_ACTION_TYPES.SET_POSTS;
      payload: { posts: Post[]; fetchUrl: string | null };
    }
  | {
      type: typeof POSTS_ACTION_TYPES.SET_IS_LOADING;
      payload: { isLoading: boolean };
    };

export function postsReducer(state = intialState, action: Action) {
  if (action.type === "posts/SET_POSTS") {
    const { posts, fetchUrl } = action.payload;
    return { ...state, fetchUrl, posts: [...state.posts, ...posts] };
  } else if (action.type === "posts/SET_IS_LOADING") {
    const { isLoading } = action.payload;
    return { ...state, isLoading };
  } else {
    return state;
  }
}
