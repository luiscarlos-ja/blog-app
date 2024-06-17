import { COMMENTS_ACTION_TYPES } from "../consts";
import { Comment } from "../types";

export interface CommentReducerState {
  comments: Comment[];
  isLoading: boolean;
  fetchUrl: string | null;
}

export const intialState: CommentReducerState = {
  comments: [],
  isLoading: false,
  fetchUrl: null,
};

export type Action =
  | {
      type: typeof COMMENTS_ACTION_TYPES.SET_COMMENTS;
      payload: { comments: Comment[]; fetchUrl: string | null };
    }
  | {
      type: typeof COMMENTS_ACTION_TYPES.SET_IS_LOADING;
      payload: { isLoading: boolean };
    }
  | {
      type: typeof COMMENTS_ACTION_TYPES.SET_FETCH_URL;
      payload: { fetchUrl: string | null };
    };

export function commentsReducer(state = intialState, action: Action) {
  if (action.type === "comments/SET_COMMENTS") {
    const { comments, fetchUrl } = action.payload;
    return { ...state, fetchUrl, comments: comments };
  } else if (action.type === "comments/SET_IS_LOADING") {
    const { isLoading } = action.payload;
    return { ...state, isLoading };
  } else if (action.type === "comments/SET_FETCH_URL") {
    const { fetchUrl } = action.payload;
    return { ...state, fetchUrl };
  } else {
    return state;
  }
}
