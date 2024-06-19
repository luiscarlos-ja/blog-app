import styled from "styled-components";

export const PostCommentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PostCommentsLoading = styled.p`
  margin-top: 16px;
  color: #007bff;
`;

export const PostCommentsList = styled.ul`
  width: 100%;
  padding: 0;
  margin: 0;
`;

export const PostCommentsListItem = styled.li`
  list-style: none;
  margin-top: 16px;
  margin-bottom: 24px;
  margin-left: 32px;
  border: 1px solid #ced4da;
  border-radius: 10px;
  padding: 0 16px 16px 16px;
  background-color: #fff;
`;
