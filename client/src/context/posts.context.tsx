import { createContext, useEffect, useState } from "react";
import { Post, PostContext } from "../types";
import { CONFIG } from "../config";

export const PostsContext = createContext<PostContext | undefined>(undefined);

export const PostsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`${CONFIG.API_URL}/posts`)
      .then((response) => response.json())
      .then((data) => {
        const posts = data.data as Post[];
        setPosts(posts);
        setLoading(false);
      });
  }, []);

  return (
    <PostsContext.Provider value={{ posts, setPosts, loading, setLoading }}>
      {children}
    </PostsContext.Provider>
  );
};
