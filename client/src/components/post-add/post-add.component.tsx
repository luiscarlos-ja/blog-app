import usePosts from "../../hooks/usePosts.hook";

export function PostAdd({
  setShowAddPost,
}: {
  setShowAddPost: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { createPost } = usePosts();

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    await createPost(formData);
    setShowAddPost(false);
  };

  return (
    <form onSubmit={handleCreatePost}>
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="content" placeholder="Content" />
      <button type="submit">Create Post</button>
    </form>
  );
}
