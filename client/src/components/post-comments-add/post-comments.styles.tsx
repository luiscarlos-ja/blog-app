import styled from "styled-components";

export const PostCommentsAddContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

export const PostCommentsAddButton = styled.button`
  margin-top: 16px;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  margin: 12px;
`;

export const PostCommentsAddForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 16px;
`;

export const PostCommentsAddTextarea = styled.textarea`
  padding: 8px;
  margin-bottom: 8px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  width: 90%;
`;

export const PostCommentsAddSubmitButton = styled.button`
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
  border: #ced4da 0.5px solid;
  cursor: pointer;
  width: 92px;
`;
