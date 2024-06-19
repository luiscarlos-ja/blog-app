import styled from "styled-components";

export const PostCommentsBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PostCommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-top: 8px;
`;

export const PostCommentHeaderTitle = styled.h3`
  margin: 0;
  font-weight: 600;
`;

export const PostCommentContentDate = styled.small`
  margin: 0;
  color: #6c757d;
  font-size: 12px;
  font-weight: 400;
`;

export const PostCommentContent = styled.p`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export const PostCommentFooter = styled.div`
  display: flex;
  justify-content: end;
  gap: 8px;
  width: 100%;
`;

export const PostCommentButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border: #ced4da 0.5px solid;
  border-radius: 4px;
  cursor: pointer;
`;

export const PostCommentsEditTextarea = styled.textarea`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 90%;
`;
