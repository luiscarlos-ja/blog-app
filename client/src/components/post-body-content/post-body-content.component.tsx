import { useState } from "react";
import { Post } from "../../types";
import usePosts from "../../hooks/usePosts.hook";
import useAuth from "../../hooks/useAuth.hook";
import {
  PostBodyContentContainer,
  PostButton,
  PostCreatedAt,
  PostCreatedBy,
  PostFooter,
  PostInfo,
  PostInput,
  PostName,
  PostSubFooter,
  PostTextArea,
} from "./post-body-content.styles";

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
  const { authUser } = useAuth();

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
      <PostBodyContentContainer>
        <PostInfo>
          {showEditPost ? (
            <PostInput
              type="text"
              name="name"
              placeholder="Name"
              value={editedPost.name}
              onChange={handleChangeName}
            />
          ) : (
            <PostName>{post.name}</PostName>
          )}
          <PostCreatedBy>@{post.user.username}</PostCreatedBy>
        </PostInfo>
        <PostCreatedAt>
          {new Date(post.createdAt).toLocaleString()}
        </PostCreatedAt>
        {showEditPost ? (
          <PostTextArea
            name="content"
            placeholder="Content"
            value={editedPost.content}
            onChange={handleChangeContent}
          />
        ) : (
          <p>{post.content}</p>
        )}
      </PostBodyContentContainer>
      <PostFooter>
        <PostButton onClick={handleToggleShowComments}>Comments</PostButton>
        <PostSubFooter>
          {authUser &&
            authUser.uuid === post.user.uuid &&
            (showEditPost ? (
              <>
                <PostButton onClick={handleClickEditPost}>Cancel</PostButton>
                <PostButton onClick={handleClickSaveEditPost}>Save</PostButton>
              </>
            ) : (
              <>
                <PostButton onClick={handleClickEditPost}>Edit</PostButton>
                <PostButton onClick={handleClickDeletePost(post.uuid)}>
                  Delete
                </PostButton>
              </>
            ))}
        </PostSubFooter>
      </PostFooter>
    </>
  );
}
