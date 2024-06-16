import { createContext, useEffect } from "react";
import { PostReducer } from "../types";
import { usePostsReducer } from "../hooks/usePostsReducer.hook";

export const PostsContext = createContext<PostReducer | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const { posts, isLoading, getPosts, createPost, deletePost, editPost } =
    usePostsReducer();

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <PostsContext.Provider
      value={{ posts, isLoading, getPosts, createPost, deletePost, editPost }}
    >
      {children}
    </PostsContext.Provider>
  );
};
