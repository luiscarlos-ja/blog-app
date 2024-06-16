import usePosts from "../../hooks/usePosts.hook";

export function PostAdd() {
  const { createPost } = usePosts();

  const handleCreatePost = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    createPost(formData);
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
