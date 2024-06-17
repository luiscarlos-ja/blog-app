import { useState } from "react";
import { Comment } from "../../types";

export function PostCommentsBody({
  comment,
  editPostComment,
  deletePostComment,
}: {
  comment: Comment;
  editPostComment: (postUuid: string, formData: FormData) => Promise<void>;
  deletePostComment: (commentUuid: string) => void;
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(comment);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  const handleToggleEditPostComment = () => {
    setIsEditing((prev) => !prev);
  };

  const handleChangeCommentEdit = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedComment({ ...editedComment, content: event.target.value });
  };

  const handleDeletePostComment = (commentUuid: string) => async () => {
    await deletePostComment(commentUuid);
  };

  const handleClickSaveEditComment = async () => {
    const { content } = editedComment;
    const formData = new FormData();
    formData.append("content", content);
    setIsLoading(true);
    await editPostComment(comment.uuid, formData)
      .then(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setIsEditing(false);
      });
  };

  return (
    <>
      <div>
        <h3>{comment.user.username}</h3>
        <small>{new Date(comment.createdAt).toLocaleString()}</small>
      </div>
      {isEditing ? (
        <textarea
          name="content"
          value={editedComment.content}
          onChange={handleChangeCommentEdit}
        />
      ) : (
        <p>{comment.content}</p>
      )}
      <div>
        {isEditing ? (
          <>
            <button onClick={handleToggleEditPostComment}>Cancel</button>
            <button onClick={handleClickSaveEditComment}>Save</button>
          </>
        ) : (
          <>
            <button onClick={handleToggleEditPostComment}>Edit</button>
            <button onClick={handleDeletePostComment(comment.uuid)}>
              Delete
            </button>
          </>
        )}
      </div>
    </>
  );
}
