import { useState } from "react";

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
    <section>
      <button onClick={handleAddPostComment}>Add Comment</button>
      {showForm && (
        <form onSubmit={handleSubmitCreateCommentPost}>
          <textarea name="content" />
          <button type="submit">Add Comment</button>
        </form>
      )}
    </section>
  );
}
