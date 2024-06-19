import { useState } from "react";
import {
  PostCommentsAddButton,
  PostCommentsAddContainer,
  PostCommentsAddForm,
  PostCommentsAddSubmitButton,
  PostCommentsAddTextarea,
} from "./post-comments.styles";

export function PostCommentsAdd({
  createPostComment,
}: {
  createPostComment: (formData: FormData) => Promise<void>;
}) {
  const [showForm, setShowForm] = useState(false);
  const handleAddPostComment = async () => {
    setShowForm((prev) => !prev);
  };

  const handleSubmitCreateCommentPost = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    await createPostComment(formData);
    setShowForm(false);
  };

  return (
    <PostCommentsAddContainer>
      <PostCommentsAddButton onClick={handleAddPostComment}>
        Add Comment
      </PostCommentsAddButton>
      {showForm && (
        <PostCommentsAddForm onSubmit={handleSubmitCreateCommentPost}>
          <PostCommentsAddTextarea
            rows={6}
            name="content"
            placeholder="New Comment"
          />
          <PostCommentsAddSubmitButton type="submit">
            Save
          </PostCommentsAddSubmitButton>
        </PostCommentsAddForm>
      )}
    </PostCommentsAddContainer>
  );
}
