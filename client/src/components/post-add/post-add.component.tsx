import usePosts from "../../hooks/usePosts.hook";
import {
  AddPostButton,
  AddPostContainer,
  AddPostHeader,
  AddPostInput,
  AddPostTextArea,
} from "./post-add.styled";

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
    <>
      <AddPostHeader>Enter Post data</AddPostHeader>
      <AddPostContainer onSubmit={handleCreatePost}>
        <AddPostInput type="text" name="name" placeholder="Name" />
        <AddPostTextArea rows={6} name="content" placeholder="Content" />
        <AddPostButton type="submit">Create Post</AddPostButton>
      </AddPostContainer>
    </>
  );
}
