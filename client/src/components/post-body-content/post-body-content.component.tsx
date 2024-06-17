import { useState } from "react";
import { Post } from "../../types";
import usePosts from "../../hooks/usePosts.hook";

export function PostBodyContent({
  post,
  setShowComments,
}: {
  post: Post;
  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showEditPost, setShowEditPost] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const [editedPost, setEditedPost] = useState<Post>(post);
  const { deletePost, editPost } = usePosts();

  if (isloading) {
    return <p>Loading...</p>;
  }

  const handleToggleShowComments = () => {
    setShowComments((prev) => !prev);
  };

  const handleClickDeletePost = (uuid: string) => () => {
    deletePost(uuid);
  };

  const handleClickEditPost = () => {
    setShowEditPost((prev) => !prev);
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedPost({ ...editedPost, name: event.target.value });
  };

  const handleChangeContent = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setEditedPost({ ...editedPost, content: event.target.value });
  };

  const handleClickSaveEditPost = async () => {
    const { name, content } = editedPost;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("content", content);
    setIsLoading(true);
    await editPost(post.uuid, formData)
      .then(() => {
        setIsLoading(false);
      })
      .finally(() => {
        setShowEditPost(false);
      });
  };

  return (
    <>
      <div>
        {showEditPost ? (
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={editedPost.name}
            onChange={handleChangeName}
          />
        ) : (
          <h2>{post.name}</h2>
        )}
        <small>@{post.user.username}</small>
        <small>
          created at {new Date(post.createdAt).toLocaleDateString()}
        </small>
        {showEditPost ? (
          <textarea
            name="content"
            placeholder="Content"
            value={editedPost.content}
            onChange={handleChangeContent}
          />
        ) : (
          <p>{post.content}</p>
        )}
      </div>
      <div>
        {showEditPost ? (
          <>
            <button onClick={handleClickEditPost}>Cancel</button>
            <button onClick={handleClickSaveEditPost}>Save</button>
          </>
        ) : (
          <>
            <button onClick={handleToggleShowComments}>Comments</button>
            <button onClick={handleClickEditPost}>Edit</button>
            <button onClick={handleClickDeletePost(post.uuid)}>Delete</button>
          </>
        )}
      </div>
    </>
  );
}
